import dotenv from 'dotenv'

dotenv.config()

// In development, allow starting without an external MongoDB by using an in-memory server.
const required = ['JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET']

export function validateEnvironment() {
  const missing = required.filter((key) => !process.env[key])
  if (missing.length) throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
}

export const env = {
  port: Number(process.env.PORT || 5000),
  // mongoUri may be undefined in development; database module will fallback to an in-memory server
  mongoUri: process.env.MONGODB_URI || undefined,
  accessSecret: process.env.JWT_ACCESS_SECRET,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173'
}
