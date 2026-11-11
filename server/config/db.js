const { Pool } = require('pg')
const dotenv = require('dotenv')
const path = require('path')

// Always load server/.env, regardless of the directory the process starts in.
dotenv.config({ path: path.join(__dirname, '..', '.env'), quiet: true })

const connectionString = process.env.DATABASE_URL
const isSupabase = /supabase\.(co|com)/i.test(connectionString || '')
const rawSsl = String(process.env.DB_SSL || '').toLowerCase()
const sslEnabled = rawSsl
  ? ['true', '1', 'require'].includes(rawSsl)
  : isSupabase

const sslConfig = sslEnabled ? { rejectUnauthorized: false } : undefined

const sharedConfig = {
  ssl: sslConfig,
  max: Number(process.env.DB_POOL_MAX || 10),
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
}

const poolConfig = connectionString
  ? {
      connectionString,
      ...sharedConfig,
    }
  : {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      ...sharedConfig,
    }

const pool = new Pool(poolConfig)

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL pool error:', err.message)
})

const convertPlaceholders = (sql, params = []) => {
  if (!params || params.length === 0) return { sql, params }
  let index = 0
  return {
    sql: sql.replace(/\?/g, () => `$${++index}`),
    params,
  }
}

const enrichRows = (result) => {
  const rows = result.rows || []
  rows.insertId = null
  if (result.command === 'INSERT' && rows.length > 0) {
    const firstRow = rows[0]
    rows.insertId = firstRow.user_id || firstRow.group_id || firstRow.comment_id || firstRow.review_id || firstRow.submission_id || firstRow.notification_id || null
  }
  rows.affectedRows = result.rowCount
  return rows
}

const query = async (sql, params = []) => {
  const { sql: convertedSql, params: convertedParams } = convertPlaceholders(sql, params)
  const result = await pool.query(convertedSql, convertedParams)
  return [enrichRows(result), result.fields]
}

const getConnection = async () => {
  const client = await pool.connect()
  const nativeQuery = client.query.bind(client)

  client.query = async (sql, params = []) => {
    const { sql: convertedSql, params: convertedParams } = convertPlaceholders(sql, params)
    const result = await nativeQuery(convertedSql, convertedParams)
    return [enrichRows(result), result.fields]
  }

  client.beginTransaction = async () => await nativeQuery('BEGIN')
  client.commit = async () => await nativeQuery('COMMIT')
  client.rollback = async () => await nativeQuery('ROLLBACK')

  return client
}

const testConnection = async () => {
  const result = await pool.query('SELECT 1 AS ok')
  return result.rows[0]?.ok === 1
}

module.exports = {
  query,
  getConnection,
  testConnection,
  pool,
  end: pool.end.bind(pool),
}
