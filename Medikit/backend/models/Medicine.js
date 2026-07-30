import mongoose from 'mongoose'

const medicineSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 150 },
  category: { type: String, trim: true, maxlength: 100, default: 'Other' },
  price: { type: Number, min: 0, default: 0 },
  dosage: { type: String, trim: true, maxlength: 200, default: '' },
  usefulness: { type: String, trim: true, maxlength: 500, default: '' },
  description: { type: String, trim: true, maxlength: 2000, default: '' },
  image: { type: String, trim: true, maxlength: 1000, default: '' }
}, { timestamps: true })

export default mongoose.model('Medicine', medicineSchema)
