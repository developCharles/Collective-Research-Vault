import { getNotifications } from './api'

export function normalizeNotification(row) {
  return {
    id: row.notification_id,
    type: row.type,
    message: row.message,
    createdAt: row.created_at,
    isRead: Boolean(row.is_read),
  }
}

export async function fetchNotifications() {
  const res = await getNotifications()
  const rows = Array.isArray(res.data?.data) ? res.data.data : []
  return rows.map(normalizeNotification)
}