import { useEffect, useMemo, useState } from 'react'
import { getPaperDetail } from '../services/paperService'

export function usePaperDetail(paperId) {
  const [paper, setPaper] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [noteStates, setNoteStates] = useState({})

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const data = await getPaperDetail(paperId)
        if (!cancelled) setPaper(data)
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || 'Could not load this paper.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [paperId])

  const notes = useMemo(
    () =>
      (paper?.notes ?? [])
        .filter((n) => noteStates[n.id] !== 'dismissed')
        .map((n) => ({ ...n, resolved: noteStates[n.id] === 'resolved' })),
    [paper, noteStates]
  )

  const dismissNote = (id) => setNoteStates((s) => ({ ...s, [id]: 'dismissed' }))
  const toggleResolved = (id) =>
    setNoteStates((s) => ({ ...s, [id]: s[id] === 'resolved' ? undefined : 'resolved' }))

  return { paper, notes, loading, error, dismissNote, toggleResolved }
}