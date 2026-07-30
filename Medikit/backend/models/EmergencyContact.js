import mongoose from 'mongoose'

const emergencyContactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 100 },
  phone: { type: String, required: true, trim: true, maxlength: 30 },
  relation: { type: String, trim: true, maxlength: 100, default: '' }
}, { timestamps: true })

export default mongoose.model('EmergencyContact', emergencyContactSchema)
