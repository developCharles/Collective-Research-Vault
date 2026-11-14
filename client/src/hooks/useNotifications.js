import { useEffect, useMemo, useState } from 'react'
import {
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from '../services/notificationService'

const newestFirst = (a, b) => new Date(b.createdAt) - new Date(a.createdAt)

export function useNotifications() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionError, setActionError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const data = await fetchNotifications()
        if (!cancelled) setItems(data)
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || 'Could not load your notifications.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const unread = useMemo(() => items.filter((n) => !n.isRead).sort(newestFirst), [items])
  const past = useMemo(() => items.filter((n) => n.isRead).sort(newestFirst), [items])

  const setRead = (ids, isRead) =>
    setItems((list) => list.map((n) => (ids.has(n.id) ? { ...n, isRead } : n)))

  const markRead = async (id) => {
    const ids = new Set([id])
    setActionError(null)
    setRead(ids, true)
    try {
      await markNotificationRead(id)
    } catch {
      setRead(ids, false)
      setActionError('Could not update that notification. Please try again.')
    }
  }

  const markAllRead = async () => {
    const ids = new Set(unread.map((n) => n.id))
    if (ids.size === 0) return
    setActionError(null)
    setRead(ids, true)
    try {
      await markAllNotificationsRead()
    } catch {
      setRead(ids, false)
      setActionError('Could not mark all as seen. Please try again.')
    }
  }

  return { unread, past, loading, error, actionError, markRead, markAllRead }
}