import { useResearchGallery } from '../hooks/useResearchGallery'
import GalleryNavbar from '../components/gallery/GalleryNavbar'
import FilterPanel from '../components/gallery/FilterPanel'
import GalleryCard from '../components/gallery/GalleryCard'

export default function ResearchGallery() {
  const g = useResearchGallery()

  return (
    <div className="min-h-dvh bg-linear-to-br from-navy-900 via-navy-700 to-navy-500 font-display text-white">
      <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <GalleryNavbar />

        <main className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start lg:gap-8">
          <FilterPanel
            query={g.query}
            onQueryChange={g.setQuery}
            types={g.types}
            selected={g.draftTypes}
            onToggle={g.toggleType}
            onApply={g.applyFilters}
          />

          <section aria-label="Research papers" className="min-w-0">
            {g.papers.length > 0 ? (
              <div className="columns-[16rem] gap-5">
                {g.papers.map((paper) => (
                  <div key={paper.id} className="mb-5 break-inside-avoid">
                    <GalleryCard paper={paper} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-10 text-center text-sm text-white/60">
                No research matches your search.
              </p>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}