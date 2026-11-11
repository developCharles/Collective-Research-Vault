import api from './api'; // baseURL = VITE_API_URL (already includes /api, like getNotifications in api.js)

// Tolerant unwrap: handles [..], { data: [..] }, { papers: [..] }.
const unwrap = (res, key) => {
  const d = res?.data;
  if (Array.isArray(d)) return d;
  return d?.[key] ?? d?.data ?? [];
};

// Map a DB/API row to the shape the dashboard UI uses.
// NOTE: the API returns created_at (not submitted_at) – see audit P1.
export function normalizePaper(row) {
  return {
    id: row.id ?? row.submission_id,
    title: row.title,
    status: row.status,
    updatedAt: row.updated_at ?? row.created_at,
    rating: row.rating ?? null,                       // optional – only shown if present
    feedbackCount: row.feedback_count ?? row.comment_count ?? 0, // optional
  };
}

// GET /api/papers/my  (student-only)
export async function getMyPapers() {
  const res = await api.get('/papers/my');
  return unwrap(res, 'papers').map(normalizePaper);
}
