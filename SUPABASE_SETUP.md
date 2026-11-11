# Connecting CORE-V to Supabase

This project talks to Supabase through its **Postgres connection string** using `pg`. It does **not** use the Supabase JavaScript client, and the frontend never connects to the database directly. All database access stays behind the Express API.

## 1. Get the connection string

In the Supabase dashboard:

1. Open your project.
2. Click **Connect** (top of the project page).
3. Under **Connection string**, choose **Session pooler**.
   - Use the session pooler (port `5432`) for a long-running Express server.
   - The direct connection often requires IPv6, which some hosts (including Render) do not support.
   - The transaction pooler (port `6543`) also works, but session pooling is simpler for this app.
4. Copy the URI. It looks like:

```
postgresql://postgres.YOUR_PROJECT_REF:YOUR_PASSWORD@aws-0-YOUR_REGION.pooler.supabase.com:5432/postgres
```

5. Replace `YOUR_PROJECT_REF`, `YOUR_REGION`, and `YOUR_PASSWORD` with the values from your project.
   - If the password contains `@`, `#`, `/`, `:`, or other URL-reserved characters, URL-encode them. For example, `@` becomes `%40`.
   - If you no longer have the password, reset it in **Project Settings → Database**.

> Do not paste the connection string into chat, source code, or a commit. Put it only in `server/.env`.

## 2. Configure server/.env

`server/.env` already exists with a generated `JWT_SECRET`. Open it and replace the placeholder `DATABASE_URL` values:

```dotenv
DATABASE_URL=postgresql://postgres.YOUR_PROJECT_REF:YOUR_PASSWORD@aws-0-YOUR_REGION.pooler.supabase.com:5432/postgres
DB_SSL=true
DB_POOL_MAX=10

JWT_SECRET=...already-generated...
PORT=5000
CLIENT_URL=http://localhost:5173
```

`server/.env` is ignored by Git. `server/.env.example` is the committed template.

### Notes

- `DB_SSL=true` is already the default when the URL contains `supabase.co`/`supabase.com`. Keep it for Supabase.
- `DB_POOL_MAX=10` is a safe starting point. Lower it if you use the transaction pooler or hit connection limits.
- The server loads `server/.env` explicitly, so it works whether you run from the repo root or from `server/`.

## 3. Verify the connection

```bash
cd server
npm install
npm run db:check
```

Expected output:

```
Target: aws-0-<region>.pooler.supabase.com:5432/postgres
Database: postgres
User: postgres.<project-ref>
Version: PostgreSQL ...
Tables (0): (none)
Connection OK.
```

If the connection fails, see **Troubleshooting** below.

## 4. Create the schema and demo data

> **Warning:** `database/schema.sql` drops and recreates every CORE-V table. Only run this against a new/empty Supabase project, or when you intend to reset it.

```bash
cd server
npm run db:setup -- --force --seed
```

Without `--seed`, only the schema is created. With `--seed`, the demo users, groups, papers, reviews, and notifications are inserted.

Expected result: 10 tables, including `users`, `submissions`, `document_versions`, `reviews`, `audit_logs`.

### Seeded login accounts

All seeded users use the password `Password123!`:

| Role | Email |
|---|---|
| Student | `student1@corev.test` |
| Faculty | `faculty@corev.test` |
| Coordinator | `coordinator@corev.test` |
| System admin | `sysadmin@corev.test` |

## 5. Start the server

```bash
cd server
npm run dev
```

On startup it now verifies the database connection before listening:

```
Connected to PostgreSQL
Server running on http://localhost:5000
```

Health check:

```bash
curl http://localhost:5000/api/health
# {"status":"ok","database":"connected"}
```

If the database is unreachable, the server exits with a clear error instead of running in a broken state.

## 6. Frontend

The React app does not need Supabase credentials. It continues to call the Express API. For local development, create `client/.env`:

```dotenv
VITE_API_URL=http://localhost:5000
```

Then:

```bash
cd client
npm install
npm run dev
```

## Troubleshooting

### `password authentication failed`

- Re-check the password in `DATABASE_URL`.
- If it contains special characters, URL-encode it.
- Reset the database password in Supabase if needed.

### `getaddrinfo ENOTFOUND` or connection timeout

- Make sure you copied the **Session pooler** host, not the direct `db.<ref>.supabase.co` host.
- Check that the project is not paused (free-tier projects pause after inactivity).
- Confirm your network allows outbound PostgreSQL connections on port 5432.

### `self signed certificate` / SSL errors

- Keep `DB_SSL=true`.
- The app uses `ssl: { rejectUnauthorized: false }` for Supabase's managed certificate chain. For stricter production verification, add the Supabase CA certificate and set `rejectUnauthorized: true`.

### `too many connections`

- Lower `DB_POOL_MAX` (for example to `5`).
- Prefer the session pooler over many direct connections.

### `relation "users" does not exist`

- Run the schema setup: `npm run db:setup -- --force --seed`.

### The app cannot find `server/.env`

- The server loads `server/.env` explicitly. Confirm the file is at `server/.env`, not at the repo root.

## Supabase security notes

- The backend connects as the `postgres` role, which bypasses Row Level Security. That is fine for this architecture because the browser never gets database credentials.
- **Never** put the Supabase `service_role` key or database password in the React app or in `VITE_*` variables.
- If you later use the Supabase JS client directly from the browser, you will need to design RLS policies and use the `anon` key.
- Keep `server/.env` out of Git. Rotate `JWT_SECRET` and the database password if either is ever exposed.

## What changed in the repo

| File | Change |
|---|---|
| `server/config/db.js` | Loads `server/.env` explicitly; auto-enables SSL for Supabase; adds pool timeouts and `testConnection()` |
| `server/index.js` | Removed startup credential logging; verifies the DB before listening; added `GET /api/health` |
| `server/scripts/db-check.js` | New connection check script |
| `server/scripts/db-setup.js` | New Postgres schema/seed runner |
| `database/setup.js` | Replaced the old MySQL setup with a wrapper around the Postgres runner |
| `server/package.json` | Added `db:check` and `db:setup` scripts |
| `server/.env.example` | New Supabase-oriented template |
| `.env.example` | Points to `server/.env` |

## Next step

Once `npm run db:check` succeeds, the database is connected. The next planned work is Phase 1 of the overhaul (migrations, audit/file fixes, permission engine). If you also want PDFs stored in **Supabase Storage** instead of the local `server/uploads` folder, that is a separate storage adapter and can be added next.
