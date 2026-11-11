import api from './api'

export function normalizePaper(row) {
  return {
    id: row.paper_id,
    title: row.title,
    status: row.status,
    groupName: row.group_name,
    updatedAt: row.uploaded_at ?? row.created_at,
  }
}

export async function getMyPapers() {
  const res = await api.get('/papers/my')
  const rows = Array.isArray(res.data) ? res.data : []
  return rows.map(normalizePaper)
}