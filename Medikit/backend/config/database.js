import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongoServer

export async function connectDatabase(uri) {
  if (uri) {
    await mongoose.connect(uri)
    return
  }

  // Fallback to an in-memory MongoDB for development when no URI provided
  mongoServer = await MongoMemoryServer.create()
  const memUri = mongoServer.getUri()
  await mongoose.connect(memUri)
}

export async function disconnectDatabase() {
  if (mongoose.connection.readyState !== 0) await mongoose.disconnect()
  if (mongoServer) await mongoServer.stop()
}
