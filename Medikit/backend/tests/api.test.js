import bcrypt from 'bcrypt'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'

process.env.JWT_ACCESS_SECRET = 'test-access-secret'
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret'
process.env.JWT_ACCESS_EXPIRES_IN = '15m'
process.env.JWT_REFRESH_EXPIRES_IN = '1h'

const { default: app } = await import('../app.js')
const { connectDatabase, disconnectDatabase } = await import('../config/database.js')
const { default: User } = await import('../models/User.js')

let mongo
const register = (email = 'user@example.com') => request(app).post('/api/auth/register').send({ name: 'Test User', email, password: 'password123' })
const authHeader = (token) => ({ Authorization: `Bearer ${token}` })

beforeAll(async () => { mongo = await MongoMemoryServer.create(); await connectDatabase(mongo.getUri()) })
afterEach(async () => { await mongoose.connection.db.dropDatabase() })
afterAll(async () => { await disconnectDatabase(); await mongo.stop() })

test('health endpoint responds', async () => {
  await request(app).get('/api/health').expect(200, { status: 'ok' })
})

test('registration hashes the password, creates starters, and returns tokens', async () => {
  const response = await register().expect(201)
  expect(response.body.user.email).toBe('user@example.com')
  expect(response.body.accessToken).toBeTruthy()
  expect(response.body.refreshToken).toBeTruthy()
  const user = await User.findOne({ email: 'user@example.com' }).select('+password')
  expect(await bcrypt.compare('password123', user.password)).toBe(true)
  const medicines = await request(app).get('/api/medicines').set(authHeader(response.body.accessToken)).expect(200)
  expect(medicines.body.medicines).toHaveLength(3)
})

test('validation and unauthenticated access return safe errors', async () => {
  await request(app).post('/api/auth/register').send({ name: '', email: 'invalid', password: 'short' }).expect(422)
  await request(app).get('/api/medicines').expect(401)
})

test('refresh rotates tokens and logout revokes the refresh session', async () => {
  const registered = await register()
  const original = registered.body.refreshToken
  const refreshed = await request(app).post('/api/auth/refresh').send({ refreshToken: original }).expect(200)
  expect(refreshed.body.refreshToken).not.toBe(original)
  await request(app).post('/api/auth/refresh').send({ refreshToken: original }).expect(401)
  await request(app).post('/api/auth/logout').send({ refreshToken: refreshed.body.refreshToken }).expect(204)
  await request(app).post('/api/auth/refresh').send({ refreshToken: refreshed.body.refreshToken }).expect(401)
})

test('medicine, reminder, and emergency resources are private to the owner', async () => {
  const first = await register('first@example.com')
  const second = await register('second@example.com')
  const token = first.body.accessToken
  const medicine = await request(app).post('/api/medicines').set(authHeader(token)).send({ name: 'My Medicine', price: 50 }).expect(201)
  await request(app).get(`/api/medicines/${medicine.body.medicine._id}`).set(authHeader(second.body.accessToken)).expect(404)
  const reminder = await request(app).post('/api/reminders').set(authHeader(token)).send({ medicineName: 'My Medicine', medicineId: medicine.body.medicine._id, time: '09:30', repeat: 'daily' }).expect(201)
  await request(app).delete(`/api/reminders/${reminder.body.reminder._id}`).set(authHeader(second.body.accessToken)).expect(404)
  const contact = await request(app).post('/api/emergency').set(authHeader(token)).send({ name: 'Alex', phone: '9999999999', relation: 'Friend' }).expect(201)
  await request(app).delete(`/api/emergency/${contact.body.contact._id}`).set(authHeader(second.body.accessToken)).expect(404)
})

test('a reminder cannot reference another users medicine', async () => {
  const first = await register('first@example.com')
  const second = await register('second@example.com')
  const medicine = await request(app).get('/api/medicines').set(authHeader(first.body.accessToken)).expect(200)
  await request(app).post('/api/reminders').set(authHeader(second.body.accessToken)).send({ medicineName: 'Not mine', medicineId: medicine.body.medicines[0]._id, time: '12:00' }).expect(422)
})
