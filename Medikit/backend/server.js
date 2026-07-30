import app from './app.js'
import { connectDatabase } from './config/database.js'
import { env, validateEnvironment } from './config/env.js'

validateEnvironment()
connectDatabase(env.mongoUri)
  .then(() => app.listen(env.port, () => console.log(`Medkit API listening on port ${env.port}`)))
  .catch((error) => { console.error('Database connection failed:', error.message); process.exit(1) })
