import { glass } from '../dashboard/constants'
import { DotsIcon } from '../dashboard/icons'
import StatusPill from '../dashboard/StatusPill'
import { timeAgo } from '../../utils/formatDate'

export default function PaperSummaryCard({ paper, onMenu }) {
  return (
    <article className={`${glass} flex flex-col p-4 sm:p-6`}>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <StatusPill status={paper.status} />
        <span className="text-xs text-white/40">Updated {timeAgo(paper.updatedAt)}</span>
      </div>

      <h1 className="wrap-break-word py-6 text-center font-display text-lg font-medium sm:py-8 sm:text-xl">
        {paper.title}
      </h1>

      <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4">
        <span className="text-xs text-gold">ID-{paper.id}</span>
        <button
          type="button"
          aria-label="More actions"
          onClick={onMenu}
          className="-m-2 p-2 text-white/60 hover:text-white"
        >
          <DotsIcon className="size-5" />
        </button>
      </div>
    </article>
  )
}