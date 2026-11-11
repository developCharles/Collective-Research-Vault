const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.join(__dirname, '.env'), quiet: true })

const { testConnection, end } = require('./config/db')

const app = express()

// CLIENT_URL accepts a comma-separated list, e.g.
//   CLIENT_URL=https://core-v.netlify.app,http://localhost:5173
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim().replace(/\/+$/, ''))
  .filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    // Requests without an Origin header (curl, health checks, same-origin) pass.
    if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    return callback(null, false)
  },
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Audit middleware to expose req.audit and correlation/request ids
app.use(require('./middleware/auditMiddleware'))

app.use('/api/coordinator/groups',      require('./routes/coordinator.routes'))
app.use('/api/coordinator/submissions', require('./routes/coordinatorSubmission.routes'))
app.use('/api/coordinator/panel',       require('./routes/coordinatorSubmission.routes'))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/faculty', require('./routes/faculty.routes'))
app.use('/api/papers', require('./routes/paper.routes'))
app.use('/api/reviews', require('./routes/review.routes'))
app.use('/api/admin', require('./routes/admin.routes'))
app.use('/api/notifications', require('./routes/notification.routes'))

app.get('/api', (req, res ) => {
    res.json({ message: 'CORE V API is running' })
})

app.get('/api/health', async (_req, res) => {
  try {
    await testConnection()
    res.json({ status: 'ok', database: 'connected' })
  } catch (err) {
    console.error('Health check failed:', err.message)
    res.status(503).json({ status: 'error', database: 'disconnected' })
  }
})

const PORT = process.env.PORT || 5000

const start = async () => {
  try {
    await testConnection()
    console.log('Connected to PostgreSQL')
  } catch (err) {
    console.error('Database connection failed:', err.message)
    console.error('Check DATABASE_URL in server/.env (see SUPABASE_SETUP.md)')
    process.exit(1)
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

const shutdown = async () => {
  await end()
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

start()
