import mongoose from 'mongoose'

const refreshSessionSchema = new mongoose.Schema({
  tokenHash: { type: String, required: true },
  expiresAt: { type: Date, required: true }
}, { _id: false })

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true, select: false },
  refreshSessions: { type: [refreshSessionSchema], default: [] }
}, { timestamps: true })

userSchema.methods.toSafeObject = function toSafeObject() {
  return { id: this._id.toString(), name: this.name, email: this.email, createdAt: this.createdAt }
}

export default mongoose.model('User', userSchema)
