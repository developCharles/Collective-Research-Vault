/**
 * Verifies the database connection configured in server/.env and prints a
 * short summary. Safe to run against production.
 *
 * Usage (from the server directory):
 *   npm run db:check
 */

const { pool, end } = require('../config/db')

const describeTarget = () => {
  if (process.env.DATABASE_URL) {
    try {
      const url = new URL(process.env.DATABASE_URL)
      return `${url.hostname}:${url.port || 5432}${url.pathname}`
    } catch {
      return 'DATABASE_URL (unparseable)'
    }
  }
  return `${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || ''}`
}

const run = async () => {
  if (/YOUR_PROJECT_REF|YOUR_PASSWORD|YOUR_REGION/.test(process.env.DATABASE_URL || '')) {
    throw new Error('DATABASE_URL still contains placeholders. Paste your Supabase connection string into server/.env.')
  }

  console.log('Target:', describeTarget())

  const { rows: infoRows } = await pool.query(`
    SELECT current_database() AS database,
           current_user AS "user",
           version() AS version
  `)
  const info = infoRows[0]

  console.log('Database:', info.database)
  console.log('User:', info.user)
  console.log('Version:', info.version.split(',')[0])

  const { rows: tables } = await pool.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name
  `)

  console.log(`Tables (${tables.length}): ${tables.map((row) => row.table_name).join(', ') || '(none)'}`)

  const hasUsers = tables.some((row) => row.table_name === 'users')
  if (hasUsers) {
    const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM users')
    console.log('Users:', rows[0].count)
  }

  console.log('Connection OK.')
}

run()
  .catch((err) => {
    console.error('Connection failed:', err.message)
    console.error('Check DATABASE_URL, DB_SSL, and your Supabase project status in server/.env.')
    process.exitCode = 1
  })
  .finally(() => end())
