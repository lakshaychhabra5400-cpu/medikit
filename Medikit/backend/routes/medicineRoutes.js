import { Router } from 'express'
import { body, param } from 'express-validator'
import Medicine from '../models/Medicine.js'
import { requireAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'

const router = Router()
const fields = [body('name').optional().trim().isLength({ min: 1, max: 150 }), body('category').optional().trim().isLength({ max: 100 }), body('price').optional().isFloat({ min: 0 }), body('dosage').optional().trim().isLength({ max: 200 }), body('usefulness').optional().trim().isLength({ max: 500 }), body('description').optional().trim().isLength({ max: 2000 }), body('image').optional().trim().isURL().withMessage('Image must be a valid URL.')]

router.use(requireAuth)
router.get('/', async (req, res, next) => { try { res.json({ medicines: await Medicine.find({ userId: req.user._id }).sort({ createdAt: -1 }) }) } catch (error) { next(error) } })
router.post('/', [body('name').trim().isLength({ min: 1, max: 150 }).withMessage('Medicine name is required.'), ...fields], validate, async (req, res, next) => { try { const medicine = await Medicine.create({ ...req.body, userId: req.user._id }); res.status(201).json({ medicine }) } catch (error) { next(error) } })
router.get('/:id', param('id').isMongoId(), validate, async (req, res, next) => { try { const medicine = await Medicine.findOne({ _id: req.params.id, userId: req.user._id }); if (!medicine) return res.status(404).json({ message: 'Medicine not found.' }); res.json({ medicine }) } catch (error) { next(error) } })
router.put('/:id', [param('id').isMongoId(), ...fields], validate, async (req, res, next) => { try { const medicine = await Medicine.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, req.body, { new: true, runValidators: true }); if (!medicine) return res.status(404).json({ message: 'Medicine not found.' }); res.json({ medicine }) } catch (error) { next(error) } })
router.delete('/:id', param('id').isMongoId(), validate, async (req, res, next) => { try { const medicine = await Medicine.findOneAndDelete({ _id: req.params.id, userId: req.user._id }); if (!medicine) return res.status(404).json({ message: 'Medicine not found.' }); res.status(204).send() } catch (error) { next(error) } })

export default router
