import { glass, STATUS_STYLES } from './constants';
import { StarIcon, DotsIcon } from './icons';
import { timeAgo, monthYear } from '../../utils/formatDate';

function StatusPill({ status }) {
  const s = STATUS_STYLES[status] ?? { label: status, cls: 'bg-white/10 text-white/70 border-white/20' };
  return (
    <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${s.cls}`}>
      {s.label}
    </span>
  );
}

// Footer varies by state: rating (approved), feedback count (needs revision), nothing otherwise.
function Footer({ paper, onMenu }) {
  let left = null;
  if (paper.rating != null) {
    left = (
      <span className="flex items-center gap-1 text-xs font-semibold text-[#F5B829]">
        <StarIcon /> {paper.rating} Rating
      </span>
    );
  } else if (paper.status === 'needs_revision' && paper.feedbackCount > 0) {
    left = <span className="text-xs text-[#F5B829]">{paper.feedbackCount} feedback notes</span>;
  }
  return (
    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
      <div>{left}</div>
      <button type="button" onClick={onMenu} aria-label="More actions" className="text-white/50 hover:text-white">
        <DotsIcon />
      </button>
    </div>
  );
}

export default function PaperCard({ paper, onOpen, onMenu }) {
  const isDone = paper.status === 'approved' || paper.status === 'published';
  const meta = isDone ? `Published ${monthYear(paper.updatedAt)}` : `Updated ${timeAgo(paper.updatedAt)}`;

  return (
    <article
      onClick={() => onOpen?.(paper)}
      className={`${glass} p-5 cursor-pointer transition hover:-translate-y-0.5 hover:bg-white/[0.1]`}
    >
      <div className="flex items-center justify-between gap-3">
        <StatusPill status={paper.status} />
        <span className="text-[11px] text-white/50">{meta}</span>
      </div>
      <h3 className="mt-4 text-[17px] font-semibold leading-snug">{paper.title}</h3>
      <Footer paper={paper} onMenu={(e) => { e.stopPropagation(); onMenu?.(paper); }} />
    </article>
  );
}
