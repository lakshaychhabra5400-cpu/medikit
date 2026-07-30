import { Router } from 'express'
import { body } from 'express-validator'
import { validate } from '../middleware/validate.js'
import { starterMedicines } from '../data/starterMedicines.js'

const router = Router()

const normalize = (value) => value?.toString().trim().toLowerCase() || ''

function findMedicineByText(text, fileName) {
  const source = `${normalize(text)} ${normalize(fileName)}`
  const scores = starterMedicines.map((medicine) => {
    const name = normalize(medicine.name)
    const tokens = name.split(/\s+/)
    const score = tokens.reduce((sum, token) => sum + (source.includes(token) ? 1 : 0), 0)
    return { medicine, score }
  })
  const best = scores.sort((a, b) => b.score - a.score)[0]
  if (best?.score >= 1) return best.medicine
  const fallback = starterMedicines.find((medicine) => source.includes(normalize(medicine.category)))
  return fallback || null
}

function buildResult(medicine) {
  if (!medicine) {
    return {
      medicineName: 'Unknown medicine',
      uses: 'No clear medicine name was detected from the uploaded file. Please enter the medicine name or try a clearer prescription image/document.',
      instructions: 'Use the extracted text or upload a clearer picture/document to improve recognition.'
    }
  }

  const description = medicine.description || medicine.usefulness || 'This medicine is used according to your doctor’s advice.'
  return {
    medicineName: medicine.name,
    uses: description,
    instructions: `This medicine is typically prescribed as: ${medicine.dosage || 'follow your doctor’s advice'}. Use it only as directed by your healthcare provider.`
  }
}

router.post(
  '/scan',
  [
    body('fileName').optional().trim().isLength({ max: 250 }),
    body('fileType').optional().trim().isLength({ max: 100 }),
    body('fileText').optional().trim().isLength({ max: 5000 })
  ],
  validate,
  async (req, res, next) => {
    try {
      const medicine = findMedicineByText(req.body.fileText, req.body.fileName)
      res.json(buildResult(medicine))
    } catch (error) {
      next(error)
    }
  }
)

export default router
