// Mock data matching the UI design. Enable with VITE_USE_MOCKS=true in client/.env
const ago = (ms) => new Date(Date.now() - ms).toISOString();
const MIN = 60_000, HR = 3_600_000, DAY = 86_400_000;

export const mockPapers = [
  { id: 1, title: 'Sustainable Architecture: Passive Cooling in Tropics', status: 'approved',
    updatedAt: '2024-06-15T00:00:00Z', rating: 4.8, feedbackCount: 0 },
  { id: 2, title: 'Acoustic Architecture: Sound Attenuation in Open-Plan Educational Facilities Using Bio-Based Materials',
    status: 'under_review', updatedAt: ago(3 * HR), rating: null, feedbackCount: 0 },
  { id: 3, title: 'Analysis of Microplastic Concentration in Urban Watersheds', status: 'needs_revision',
    updatedAt: ago(34 * MIN), rating: null, feedbackCount: 3 },
];

export const mockNotifications = [
  { id: 1, type: 'new_comment', message: '**Prof. Miller** left a comment on your proposal.', createdAt: ago(2 * HR) },
  { id: 2, type: 'status_change', message: 'Paper "Sustainable Architecture" was approved for the archive.', createdAt: ago(1 * DAY) },
  { id: 3, type: 'system', message: 'Action required: Missing citations in "Urban Watersheds".', createdAt: ago(2 * DAY) },
];
