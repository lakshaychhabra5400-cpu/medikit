import { Router } from 'express'
import { body, param } from 'express-validator'
import Medicine from '../models/Medicine.js'
import Reminder from '../models/Reminder.js'
import { requireAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'

const router = Router()
const fields = [
  body('medicineName').optional().trim().isLength({ min: 1, max: 150 }),
  body('medicineId').optional({ nullable: true }).isMongoId(),
  body('time').optional().matches(/^([01]\d|2[0-3]):[0-5]\d$/).withMessage('Time must use HH:mm format.'),
  body('date').optional({ nullable: true }).isISO8601().toDate(),
  body('repeat').optional().isIn(['none', 'daily', 'weekly']),
  body('status').optional().isIn(['pending', 'taken'])
]

async function verifyMedicineOwnership(req, res, next) {
  if (!req.body.medicineId) return next()
  const medicine = await Medicine.exists({ _id: req.body.medicineId, userId: req.user._id })
  if (!medicine) return res.status(422).json({ message: 'The selected medicine does not belong to this user.' })
  next()
}

router.use(requireAuth)
router.get('/', async (req, res, next) => { try { res.json({ reminders: await Reminder.find({ userId: req.user._id }).sort({ date: 1, time: 1 }) }) } catch (error) { next(error) } })
router.post('/', [body('medicineName').trim().isLength({ min: 1, max: 150 }).withMessage('Medicine name is required.'), body('time').matches(/^([01]\d|2[0-3]):[0-5]\d$/).withMessage('Time must use HH:mm format.'), ...fields], validate, verifyMedicineOwnership, async (req, res, next) => { try { const reminder = await Reminder.create({ ...req.body, userId: req.user._id }); res.status(201).json({ reminder }) } catch (error) { next(error) } })
router.get('/:id', param('id').isMongoId(), validate, async (req, res, next) => { try { const reminder = await Reminder.findOne({ _id: req.params.id, userId: req.user._id }); if (!reminder) return res.status(404).json({ message: 'Reminder not found.' }); res.json({ reminder }) } catch (error) { next(error) } })
router.put('/:id', [param('id').isMongoId(), ...fields], validate, verifyMedicineOwnership, async (req, res, next) => { try { const reminder = await Reminder.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, req.body, { new: true, runValidators: true }); if (!reminder) return res.status(404).json({ message: 'Reminder not found.' }); res.json({ reminder }) } catch (error) { next(error) } })
router.delete('/:id', param('id').isMongoId(), validate, async (req, res, next) => { try { const reminder = await Reminder.findOneAndDelete({ _id: req.params.id, userId: req.user._id }); if (!reminder) return res.status(404).json({ message: 'Reminder not found.' }); res.status(204).send() } catch (error) { next(error) } })

export default router
