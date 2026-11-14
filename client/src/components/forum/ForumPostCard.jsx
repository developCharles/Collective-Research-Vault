import { useState } from 'react'
import { glass } from '../dashboard/constants'
import { CommentIcon, HeartIcon, PaperclipIcon } from '../dashboard/icons'
import Avatar from '../paper/Avatar'
import LinkifiedText from './LinkifiedText'
import { longDate } from '../../utils/formatDate'

export default function ForumPostCard({ post, onLike, onReply }) {
  const [draft, setDraft] = useState('')

  const submitReply = (e) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    onReply(post.id, text)
    setDraft('')
  }

  return (
    <article className={`${glass} p-4 font-display sm:p-6`}>
      <div className="flex items-start justify-between gap-3">
        <span className="min-w-0 truncate pt-2 text-sm text-white/50">{post.authorName}</span>
        <Avatar name={post.authorName} size="md" />
      </div>

      <p className="mt-3 wrap-break-word whitespace-pre-line text-sm font-medium leading-relaxed">
        <LinkifiedText text={post.text} />
      </p>

      {post.attachments?.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {post.attachments.map((name) => (
            <li
              key={name}
              className="flex max-w-full items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70"
            >
              <PaperclipIcon className="size-3.5 shrink-0" />
              <span className="truncate">{name}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex items-center justify-between gap-3 border-b border-white/10 pb-4">
        <span className="text-xs text-white/40">{longDate(post.createdAt)}</span>
        <button
          type="button"
          onClick={() => onLike(post.id)}
          aria-pressed={post.liked}
          aria-label={post.liked ? 'Unlike' : 'Like'}
          className={`grid size-10 place-items-center rounded-full border transition ${
            post.liked
              ? 'border-gold bg-gold/15 text-gold'
              : 'border-white/30 bg-white/5 text-white/80 hover:bg-white/10'
          }`}
        >
          <HeartIcon className={`size-5 ${post.liked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {post.replies.length > 0 && (
        <ul className="mt-4 space-y-2">
          {post.replies.map((reply) => (
            <li key={reply.id} className="flex items-center gap-3">
              <Avatar name={reply.authorName} size="md" />
              <p className="min-w-0 wrap-break-word text-xs font-semibold">{reply.text}</p>
            </li>
          ))}
        </ul>
      )}

      <form
        onSubmit={submitReply}
        className="mt-3 flex h-11 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 transition focus-within:border-gold/60 focus-within:ring-2 focus-within:ring-gold/20"
      >
        <CommentIcon className="size-5 shrink-0 text-white/70" />
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={500}
          placeholder="Reply…"
          aria-label={`Reply to ${post.authorName}`}
          className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/60"
        />
      </form>
    </article>
  )
}