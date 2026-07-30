import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { env } from './config/env.js'
import { errorHandler, notFound } from './middleware/errors.js'
import authRoutes from './routes/authRoutes.js'
import emergencyRoutes from './routes/emergencyRoutes.js'
import medicineRoutes from './routes/medicineRoutes.js'
import prescriptionRoutes from './routes/prescriptionRoutes.js'
import reminderRoutes from './routes/reminderRoutes.js'

const app = express()
app.use(cors({ origin: env.clientOrigin.split(',').map((origin) => origin.trim()), methods: ['GET', 'POST', 'PUT', 'DELETE'], allowedHeaders: ['Content-Type', 'Authorization'] }))
app.use(express.json({ limit: '1mb' }))
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'))

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))
app.use('/api/auth', authRoutes)
app.use('/api/medicines', medicineRoutes)
app.use('/api/reminders', reminderRoutes)
app.use('/api/emergency', emergencyRoutes)
app.use('/api/prescriptions', prescriptionRoutes)
app.use(notFound)
app.use(errorHandler)

export default app
