/**
 * Backwards-compatible wrapper around server/scripts/db-setup.js.
 *
 * Recommended usage (from the server directory):
 *   npm run db:setup -- --force --seed
 *
 * This script is destructive: it drops and recreates every CORE-V table.
 */

require('../server/scripts/db-setup')
