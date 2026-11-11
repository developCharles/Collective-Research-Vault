import { getNotifications } from './api'; // already defined in api.js -> GET /notifications

const unwrap = (res) => {
  const d = res?.data;
  return Array.isArray(d) ? d : d?.notifications ?? d?.data ?? [];
};

// type: status_change | new_comment | assignment | system
export function normalizeNotification(row) {
  return {
    id: row.id,
    type: row.type,
    message: row.message ?? row.title ?? '',
    createdAt: row.created_at,
    isRead: Boolean(row.is_read),
  };
}

export async function fetchNotifications() {
  const res = await getNotifications();
  return unwrap(res).map(normalizeNotification);
}
