import { Router } from 'express'
import { body, param } from 'express-validator'
import EmergencyContact from '../models/EmergencyContact.js'
import { requireAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'

const router = Router()
router.use(requireAuth)
router.get('/', async (req, res, next) => { try { res.json({ contacts: await EmergencyContact.find({ userId: req.user._id }).sort({ createdAt: -1 }) }) } catch (error) { next(error) } })
router.post('/', [body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Contact name is required.'), body('phone').trim().isLength({ min: 3, max: 30 }).withMessage('A valid phone number is required.'), body('relation').optional().trim().isLength({ max: 100 })], validate, async (req, res, next) => { try { const contact = await EmergencyContact.create({ ...req.body, userId: req.user._id }); res.status(201).json({ contact }) } catch (error) { next(error) } })
router.delete('/:id', param('id').isMongoId(), validate, async (req, res, next) => { try { const contact = await EmergencyContact.findOneAndDelete({ _id: req.params.id, userId: req.user._id }); if (!contact) return res.status(404).json({ message: 'Emergency contact not found.' }); res.status(204).send() } catch (error) { next(error) } })

export default router
