import { glass } from '../dashboard/constants'
import { DotsIcon, StarIcon } from '../dashboard/icons'
import { monthYear } from '../../utils/formatDate'

export default function GalleryCard({ paper, onOpen, onMenu }) {
  return (
    <article
      onClick={onOpen ? () => onOpen(paper) : undefined}
      className={`${glass} p-4 sm:p-5 ${onOpen ? 'cursor-pointer transition hover:-translate-y-0.5 hover:bg-white/10' : ''}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-white/50">
        <span>{paper.authors}</span>
        <span>Published {monthYear(paper.publishedAt)}</span>
      </div>

      <h3 className="mt-3 wrap-break-word text-base font-semibold leading-snug sm:text-lg">
        {paper.title}
      </h3>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
        {paper.rating != null ? (
          <span className="flex items-center gap-1 text-xs font-semibold text-gold">
            <StarIcon /> {paper.rating} Rating
          </span>
        ) : (
          <span />
        )}
        <button
          type="button"
          aria-label="More actions"
          onClick={(e) => {
            e.stopPropagation()
            onMenu?.(paper)
          }}
          className="-m-2 shrink-0 p-2 text-white/50 hover:text-white"
        >
          <DotsIcon />
        </button>
      </div>
    </article>
  )
}