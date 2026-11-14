import { Link } from 'react-router-dom'
import useForum from '../../context/useForum'
import { glass, ROUTES } from '../dashboard/constants'
import { CommentIcon, HeartIcon, PaperclipIcon, PlusIcon } from '../dashboard/icons'
import Avatar from './Avatar'
import LinkifiedText from '../forum/LinkifiedText'
import SectionHeading from './SectionHeading'

const PREVIEW_COUNT = 3

function ForumPostCard({ post, onLike }) {
  return (
    <article className={`${glass} flex flex-col gap-3 p-4 sm:p-5`}>
      <div className="flex items-center justify-between gap-3">
        <span className="min-w-0 truncate text-xs text-white/40">{post.authorName}</span>
        <Avatar name={post.authorName} size="xs" />
      </div>

      <p className="wrap-break-word whitespace-pre-line text-sm font-medium leading-snug">
        <LinkifiedText text={post.text} />
      </p>

      {post.attachments?.length > 0 && (
        <ul className="flex flex-wrap gap-2">
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

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => onLike(post.id)}
          aria-pressed={post.liked}
          aria-label={post.liked ? 'Unlike' : 'Like'}
          className={`grid size-10 place-items-center rounded-full border transition ${
            post.liked
              ? 'border-gold bg-gold/15 text-gold'
              : 'border-white/20 bg-white/5 text-white/80 hover:bg-white/10'
          }`}
        >
          <HeartIcon className={`size-5 ${post.liked ? 'fill-current' : ''}`} />
        </button>
        <Link
          to={ROUTES.forum}
          aria-label="Reply in Forum"
          className="grid size-10 place-items-center rounded-full border border-white/20 bg-white/5 text-white/80 transition hover:bg-white/10"
        >
          <CommentIcon className="size-5" />
        </Link>
      </div>

      {post.replies.map((reply) => (
        <div key={reply.id} className="flex items-center gap-3 border-t border-white/10 pt-3">
          <Avatar name={reply.authorName} size="md" />
          <p className="min-w-0 wrap-break-word text-xs font-semibold">{reply.text}</p>
        </div>
      ))}
    </article>
  )
}

export default function ForumSection() {
  const { posts, toggleLike, openComposer } = useForum()

  return (
    <section aria-labelledby="forum-heading">
      <div id="forum-heading" className="flex items-start justify-between gap-3">
        <SectionHeading icon={CommentIcon} title="Forum" />
        <Link
          to={ROUTES.forum}
          className="text-xs font-semibold text-gold transition hover:text-gold-light"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,16rem),1fr))] items-stretch gap-4 sm:gap-5">
        {posts.slice(0, PREVIEW_COUNT).map((post) => (
          <ForumPostCard key={post.id} post={post} onLike={toggleLike} />
        ))}
        <button
          type="button"
          onClick={openComposer}
          className="flex min-h-40 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/20 bg-white/5 p-4 text-base font-semibold text-white/60 transition hover:border-gold/60 hover:text-gold"
        >
          <span className="grid size-12 place-items-center rounded-full bg-white/5">
            <PlusIcon className="size-6" />
          </span>
          Add new post
        </button>
      </div>
    </section>
  )
}