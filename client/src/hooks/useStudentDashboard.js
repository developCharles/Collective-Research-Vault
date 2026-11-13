import { useEffect, useState } from 'react'
import { getMyPapers } from '../services/paperService'
import { fetchNotifications } from '../services/notificationService'

export function useStudentDashboard() {
  const [papers, setPapers] = useState([])
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      const [p, n] = await Promise.allSettled([getMyPapers(), fetchNotifications()])
      if (cancelled) return
      if (p.status === 'fulfilled') setPapers(p.value)
      else setError(p.reason?.response?.data?.message || 'Could not load your research. Check that the API address is set.')
      if (n.status === 'fulfilled') setNotifications(n.value)
      setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { papers, notifications, loading, error }
}