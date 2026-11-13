import { glass } from './constants'
import { DotsIcon } from './icons'
import StatusPill from './StatusPill'
import { timeAgo, monthYear } from '../../utils/formatDate'

export default function PaperCard({ paper, onOpen, onMenu }) {
  const isDone = paper.status === 'approved' || paper.status === 'published'
  const meta = isDone
    ? `Published ${monthYear(paper.updatedAt)}`
    : `Updated ${timeAgo(paper.updatedAt)}`

  return (
    <article
      onClick={() => onOpen?.(paper)}
      className={`${glass} cursor-pointer p-4 transition hover:-translate-y-0.5 hover:bg-white/10 sm:p-5`}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <StatusPill status={paper.status} />
        <span className="text-xs text-white/50">{meta}</span>
      </div>

      <h3 className="mt-4 wrap-break-word text-base font-semibold leading-snug sm:text-lg">
        {paper.title}
      </h3>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
        <span className="min-w-0 truncate text-xs text-white/60">{paper.groupName}</span>
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