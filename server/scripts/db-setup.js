/**
 * Applies database/schema.sql (and optionally database/seed.sql) to the
 * database configured by server/.env.
 *
 * Usage (from the server directory):
 *   npm run db:setup -- --force
 *   npm run db:setup -- --force --seed
 *
 * WARNING: schema.sql drops and recreates every CORE-V table.
 */

const fs = require('fs')
const path = require('path')
const { pool, end } = require('../config/db')

const args = new Set(process.argv.slice(2))
const force = args.has('--force')
const seed = args.has('--seed')
const databaseDir = path.join(__dirname, '..', '..', 'database')

const run = async () => {
  if (!process.env.DATABASE_URL && !process.env.DB_HOST) {
    throw new Error('No database configured. Set DATABASE_URL in server/.env.')
  }

  if (/YOUR_PROJECT_REF|YOUR_PASSWORD|YOUR_REGION/.test(process.env.DATABASE_URL || '')) {
    throw new Error('DATABASE_URL still contains placeholders. Paste your Supabase connection string into server/.env.')
  }

  if (!force) {
    console.error('This will DROP and recreate all CORE-V tables in the target database.')
    console.error('Re-run with --force to continue, and add --seed to load demo data:')
    console.error('  npm run db:setup -- --force --seed')
    process.exitCode = 1
    return
  }

  const schemaSql = fs.readFileSync(path.join(databaseDir, 'schema.sql'), 'utf8')
  const seedSql = fs.readFileSync(path.join(databaseDir, 'seed.sql'), 'utf8')

  console.log('Applying database/schema.sql ...')
  await pool.query(schemaSql)
  console.log('Schema applied.')

  if (seed) {
    console.log('Applying database/seed.sql ...')
    await pool.query(seedSql)
    console.log('Seed data loaded.')
  }

  const { rows } = await pool.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name
  `)

  console.log(`Tables (${rows.length}): ${rows.map((row) => row.table_name).join(', ')}`)
  console.log('Database setup complete.')
}

run()
  .catch((err) => {
    console.error('Database setup failed:', err.message)
    process.exitCode = 1
  })
  .finally(() => end())
