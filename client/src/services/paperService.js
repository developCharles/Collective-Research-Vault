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
  if (!Array.isArray(res.data)) throw new Error('Unexpected response from the server.')
  return res.data.map(normalizePaper)
}

export function splitAuthors(value) {
  if (!value) return []
  const separator = value.includes(';') || value.includes('\n') ? /[;\n]/ : ','
  return value
    .split(separator)
    .map((name) => name.trim())
    .filter(Boolean)
}

export function normalizePaperDetail(d) {
  return {
    id: d.submission_id,
    title: d.title,
    status: d.status,
    abstract: d.abstract,
    keywords: d.keywords,
    program: d.program,
    schoolYear: d.school_year,
    groupName: d.group_name,
    createdAt: d.created_at,
    updatedAt: d.updated_at ?? d.created_at,
    authors: splitAuthors(d.authors),
    versions: (d.versions ?? []).map((v) => ({
      number: v.version_number,
      fileName: v.file_name,
      uploadedAt: v.uploaded_at,
    })),
    notes: (d.reviews ?? []).flatMap((r) =>
      (r.comments ?? []).map((c) => ({
        id: c.comment_id,
        authorName: c.author_name,
        text: c.comment_text,
        createdAt: c.created_at,
      }))
    ),
  }
}

export async function getPaperDetail(paperId) {
  const res = await api.get(`/papers/${paperId}`)
  return normalizePaperDetail(res.data)
}