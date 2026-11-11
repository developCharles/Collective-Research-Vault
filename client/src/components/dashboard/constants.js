// Single place for routes + shared Tailwind class strings used by the dashboard.
// Matches the /student/* routes in App.jsx. group/archive have no pages yet (shown as 'Soon').

export const ROUTES = {
  home: '/student',
  group: '/student/group',
  archive: '/student/archive',
  upload: '/student/upload',
  history: '/student/history',
  paper: (id) => `/student/paper/${id}`,
};

// Frosted navy card surface used by sidebar, paper cards and notifications.
export const glass =
  'bg-white/[0.07] border border-white/10 backdrop-blur-sm rounded-2xl shadow-lg shadow-black/20';

// DB status (submissions.status) -> badge label + colors.
// Statuses: submitted, under_review, needs_revision, approved, rejected, published
export const STATUS_STYLES = {
  approved:       { label: 'Approved',       cls: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' },
  published:      { label: 'Published',      cls: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' },
  submitted:      { label: 'Ongoing',        cls: 'bg-sky-500/20 text-sky-300 border-sky-400/30' },
  under_review:   { label: 'Ongoing',        cls: 'bg-sky-500/20 text-sky-300 border-sky-400/30' },
  needs_revision: { label: 'Needs Revision', cls: 'bg-amber-500/20 text-amber-300 border-amber-400/30' },
  rejected:       { label: 'Rejected',       cls: 'bg-rose-500/20 text-rose-300 border-rose-400/30' },
};
