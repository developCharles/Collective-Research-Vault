import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GalleryNavbar from '../../components/gallery/GalleryNavbar'
import GalleryCard from '../../components/gallery/GalleryCard'
import { SearchIcon } from '../../components/dashboard/icons'
import { fetchGalleryPapers, normalizeGalleryPaper } from '../../services/galleryService'

const FEATURED_COUNT = 3

export default function Landing() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    let cancelled = false
    fetchGalleryPapers({ featured: 'true' })
      .then((rows) => {
        if (!cancelled) setFeatured(rows.map(normalizeGalleryPaper).slice(0, FEATURED_COUNT))
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  const submit = (e) => {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/gallery?q=${encodeURIComponent(q)}` : '/gallery')
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-navy-900 to-navy-500 font-display text-white">
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-8">
        <GalleryNavbar />

        <section className="pb-4 pt-8 sm:pt-14">
          <h1 className="m-0 max-w-3xl text-[2rem] font-semibold leading-tight sm:text-5xl">
            The vault for our students’ research
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Read titles, abstracts and citations of finished theses and capstone projects. No account needed.
          </p>
          <form onSubmit={submit} className="relative mt-6 max-w-2xl sm:mt-8">
            <SearchIcon className="pointer-events-none absolute left-4 top-3.5 size-5 text-white/75 sm:left-5 sm:top-4" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search title, author or keyword"
              placeholder="Search title, author or keyword"
              className="h-12 w-full rounded-full border-[0.094rem] border-white/40 bg-field/35 pl-12 pr-5 text-[0.9375rem] text-white placeholder:text-white/65 sm:h-13 sm:pl-13 sm:text-base"
            />
          </form>
          <Link
            to="/gallery"
            className="belt-pulse group mt-5 inline-flex items-center gap-4 rounded-xl bg-linear-to-br/srgb from-gold to-gold-soft py-2 pl-6 pr-2 font-semibold text-ink shadow-lg shadow-amber-500/30 transition hover:-translate-y-0.5 hover:brightness-105 focus:outline-none focus:ring-4 focus:ring-gold/40"
          >
            Browse the gallery
            <span className="flex size-10 items-center justify-center rounded-full bg-navy-900 text-gold">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </span>
          </Link>
        </section>

        {featured.length > 0 && (
          <section aria-labelledby="landing-featured" className="mt-10 sm:mt-14">
            <h2 id="landing-featured" className="mb-4 mt-0 text-[1.375rem] font-semibold">Featured research</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {featured.map((p) => (
                <GalleryCard key={p.id} paper={p} featured />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}