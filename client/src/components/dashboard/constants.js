export const ROUTES = {
  home: '/student',
  forum: '/student/forum',
  group: '/student/group',
  archive: '/student/archive',
  upload: '/student/upload',
  history: '/student/history',
  paper: (id) => `/student/paper/${id}`,
}

export const glass =
  'bg-panel border border-white/10 backdrop-blur-sm rounded-2xl shadow-lg shadow-black/20'

export const STATUS_STYLES = {
  approved: { label: 'Approved', cls: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' },
  published: { label: 'Published', cls: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' },
  submitted: { label: 'Ongoing', cls: 'bg-sky-500/20 text-sky-300 border-sky-400/30' },
  under_review: { label: 'Ongoing', cls: 'bg-sky-500/20 text-sky-300 border-sky-400/30' },
  needs_revision: { label: 'Needs Revision', cls: 'bg-amber-500/20 text-amber-300 border-amber-400/30' },
  for_revision: { label: 'Needs Revision', cls: 'bg-amber-500/20 text-amber-300 border-amber-400/30' },
  rejected: { label: 'Rejected', cls: 'bg-rose-500/20 text-rose-300 border-rose-400/30' },
}