import { glass } from '../dashboard/constants'
import { CheckIcon, CloseIcon, CommentIcon } from '../dashboard/icons'
import Avatar from './Avatar'
import SectionHeading from './SectionHeading'

function FeedbackNoteCard({ note, onDismiss, onResolve }) {
  return (
    <article
      className={`${glass} flex flex-col gap-3 p-4 transition-opacity sm:p-5 ${note.resolved ? 'opacity-60' : ''}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="min-w-0 truncate text-sm font-medium text-white/40">
          {note.authorName}
        </span>
        <Avatar name={note.authorName} size="xs" />
      </div>

      <p className="wrap-break-word text-sm font-medium leading-snug">{note.text}</p>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3">
        <button
          type="button"
          onClick={() => onDismiss(note.id)}
          className="flex items-center gap-2 rounded-full border border-rose-500 bg-rose-500/20 px-4 py-1.5 text-sm font-medium text-rose-100 transition hover:bg-rose-500/30"
        >
          <CloseIcon className="size-3" />
          Dismiss
        </button>
        <button
          type="button"
          onClick={() => onResolve(note.id)}
          aria-pressed={note.resolved}
          className="flex items-center gap-2 rounded-full border border-emerald-400 bg-emerald-500/20 px-4 py-1.5 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/30"
        >
          <CheckIcon className="size-3" />
          {note.resolved ? 'Resolved' : 'Resolve'}
        </button>
      </div>
    </article>
  )
}

export default function FeedbackNotes({ notes, onDismiss, onResolve }) {
  return (
    <section aria-labelledby="feedback-heading">
      <div id="feedback-heading">
        <SectionHeading icon={CommentIcon} title="Feedback Notes" />
      </div>

      {notes.length === 0 ? (
        <p className="text-sm text-white/50">No feedback notes yet.</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,16rem),1fr))] gap-4 sm:gap-5">
          {notes.map((note) => (
            <FeedbackNoteCard
              key={note.id}
              note={note}
              onDismiss={onDismiss}
              onResolve={onResolve}
            />
          ))}
        </div>
      )}
    </section>
  )
}   