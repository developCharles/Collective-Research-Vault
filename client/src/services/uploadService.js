import api from './api'

export const FILE_FIELD = 'file'
export const MAX_FILE_MB = 20
export const ACCEPTED_EXTENSIONS = ['pdf', 'doc', 'docx']

export async function getMyGroups() {
  const res = await api.get('/papers/my-groups')
  return Array.isArray(res.data?.data) ? res.data.data : []
}

export async function uploadPaper({ title, authors, program, year, groupId, file }) {
  const body = new FormData()
  body.append('title', title)
  body.append('authors', authors)
  body.append('program', program)
  body.append('year', year)
  body.append('group_id', groupId)
  body.append(FILE_FIELD, file)
  const res = await api.post('/papers/upload', body)
  return res.data
}