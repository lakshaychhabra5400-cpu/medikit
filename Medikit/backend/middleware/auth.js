import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { env } from '../config/env.js'

export async function requireAuth(req, res, next) {
  const header = req.get('authorization')
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ message: 'Authorization token is required.' })
  try {
    const payload = jwt.verify(header.slice(7), env.accessSecret)
    const user = await User.findById(payload.sub)
    if (!user) return res.status(401).json({ message: 'Authentication is no longer valid.' })
    req.user = user
    next()
  } catch {
    res.status(401).json({ message: 'Invalid or expired access token.' })
  }
}
