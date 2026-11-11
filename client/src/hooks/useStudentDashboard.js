import { useEffect, useState } from 'react';
import { getMyPapers } from '../services/paperService';
import { fetchNotifications } from '../services/notificationService';

// Loads papers + notifications independently, so a failing notifications
// endpoint never blanks the papers grid (and vice-versa).
export function useStudentDashboard() {
  const [papers, setPapers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [p, n] = await Promise.allSettled([getMyPapers(), fetchNotifications()]);
      if (cancelled) return;
      if (p.status === 'fulfilled') setPapers(p.value);
      else setError(p.reason?.response?.data?.message || 'Could not load your research.');
      if (n.status === 'fulfilled') setNotifications(n.value);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  return { papers, notifications, loading, error };
}
