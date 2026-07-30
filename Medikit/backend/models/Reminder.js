import mongoose from 'mongoose'

const reminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', default: null },
  medicineName: { type: String, required: true, trim: true, maxlength: 150 },
  time: { type: String, required: true, match: /^([01]\d|2[0-3]):[0-5]\d$/ },
  date: { type: Date, default: null },
  repeat: { type: String, enum: ['none', 'daily', 'weekly'], default: 'none' },
  status: { type: String, enum: ['pending', 'taken'], default: 'pending' }
}, { timestamps: true })

export default mongoose.model('Reminder', reminderSchema)
