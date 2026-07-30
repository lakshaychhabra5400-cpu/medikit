import bcrypt from 'bcrypt'
import { Router } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import Medicine from '../models/Medicine.js'
import User from '../models/User.js'
import { starterMedicines } from '../data/starterMedicines.js'
import { requireAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { env } from '../config/env.js'
import { hashToken, issueTokens } from '../utils/tokens.js'

const router = Router()
const credentials = [body('email').isEmail().withMessage('Enter a valid email address.').normalizeEmail(), body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters.')]

async function saveNewSession(user) {
  const tokens = issueTokens(user)
  user.refreshSessions = user.refreshSessions.filter((session) => session.expiresAt > new Date()).slice(-4)
  user.refreshSessions.push({ tokenHash: hashToken(tokens.refreshToken), expiresAt: tokens.expiresAt })
  await user.save()
  return tokens
}

router.post('/register', [body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Full name is required.'), ...credentials], validate, async (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase()
    if (await User.exists({ email })) return res.status(409).json({ message: 'An account with this email already exists.' })
    const user = await User.create({ name: req.body.name, email, password: await bcrypt.hash(req.body.password, 12) })
    await Medicine.insertMany(starterMedicines.map((medicine) => ({ ...medicine, userId: user._id })))
    const tokens = await saveNewSession(user)
    res.status(201).json({ user: user.toSafeObject(), ...tokens })
  } catch (error) { next(error) }
})

router.post('/login', credentials, validate, async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email.toLowerCase() }).select('+password')
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) return res.status(401).json({ message: 'Invalid email or password.' })
    const tokens = await saveNewSession(user)
    res.json({ user: user.toSafeObject(), ...tokens })
  } catch (error) { next(error) }
})

router.post('/refresh', body('refreshToken').isString().notEmpty().withMessage('Refresh token is required.'), validate, async (req, res, next) => {
  try {
    const payload = jwt.verify(req.body.refreshToken, env.refreshSecret)
    const user = await User.findById(payload.sub)
    const oldHash = hashToken(req.body.refreshToken)
    const session = user?.refreshSessions.find((item) => item.tokenHash === oldHash && item.expiresAt > new Date())
    if (!session) return res.status(401).json({ message: 'Refresh token is invalid or has been revoked.' })
    user.refreshSessions = user.refreshSessions.filter((item) => item.tokenHash !== oldHash && item.expiresAt > new Date())
    const tokens = await saveNewSession(user)
    res.json({ user: user.toSafeObject(), ...tokens })
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') return res.status(401).json({ message: 'Refresh token is invalid or expired.' })
    next(error)
  }
})

router.post('/logout', body('refreshToken').isString().notEmpty().withMessage('Refresh token is required.'), validate, async (req, res, next) => {
  try {
    const tokenHash = hashToken(req.body.refreshToken)
    await User.updateOne({ 'refreshSessions.tokenHash': tokenHash }, { $pull: { refreshSessions: { tokenHash } } })
    res.status(204).send()
  } catch (error) { next(error) }
})

router.get('/profile', requireAuth, (req, res) => res.json({ user: req.user.toSafeObject() }))

export default router
