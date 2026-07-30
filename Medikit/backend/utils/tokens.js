import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex')

export function createAccessToken(user) {
  return jwt.sign({ sub: user._id.toString(), email: user.email }, env.accessSecret, { expiresIn: env.accessExpiresIn })
}

export function createRefreshToken(user) {
  return jwt.sign({ sub: user._id.toString(), jti: crypto.randomUUID() }, env.refreshSecret, { expiresIn: env.refreshExpiresIn })
}

export function issueTokens(user) {
  const accessToken = createAccessToken(user)
  const refreshToken = createRefreshToken(user)
  const { exp } = jwt.decode(refreshToken)
  return { accessToken, refreshToken, expiresAt: new Date(exp * 1000) }
}
