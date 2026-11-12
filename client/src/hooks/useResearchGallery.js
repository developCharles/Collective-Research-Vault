import { useMemo, useState } from 'react'
import { galleryPapers, PAPER_TYPES } from '../services/galleryData'

export function useResearchGallery() {
  const [query, setQuery] = useState('')
  const [draftTypes, setDraftTypes] = useState([])
  const [appliedTypes, setAppliedTypes] = useState([])

  const toggleType = (type) =>
    setDraftTypes((current) =>
      current.includes(type) ? current.filter((t) => t !== type) : [...current, type]
    )

  const applyFilters = () => setAppliedTypes(draftTypes)

  const papers = useMemo(() => {
    const q = query.trim().toLowerCase()
    return galleryPapers.filter((p) => {
      const matchesType = appliedTypes.length === 0 || appliedTypes.includes(p.type)
      const matchesQuery =
        !q || p.title.toLowerCase().includes(q) || p.authors.toLowerCase().includes(q)
      return matchesType && matchesQuery
    })
  }, [query, appliedTypes])

  return {
    query,
    setQuery,
    types: PAPER_TYPES,
    draftTypes,
    toggleType,
    applyFilters,
    papers,
  }
}