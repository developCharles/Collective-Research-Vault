import { glass } from '../dashboard/constants'
import { CommentIcon, HeartIcon, PlusIcon } from '../dashboard/icons'
import Avatar from './Avatar'
import SectionHeading from './SectionHeading'

function ForumPostCard({ post }) {
  return (
    <article className={`${glass} flex flex-col gap-3 p-4 sm:p-5`}>
      <div className="flex items-center justify-between gap-3">
        <span className="min-w-0 truncate text-xs text-white/40">{post.authorName}</span>
        <Avatar name={post.authorName} size="xs" />
      </div>

      <p className="wrap-break-word text-sm font-medium leading-snug">{post.text}</p>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          aria-label="Like"
          className="grid size-10 place-items-center rounded-full border border-white/20 bg-white/5 text-white/80 transition hover:bg-white/10"
        >
          <HeartIcon className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Reply"
          className="grid size-10 place-items-center rounded-full border border-white/20 bg-white/5 text-white/80 transition hover:bg-white/10"
        >
          <CommentIcon className="size-5" />
        </button>
      </div>

      {post.replies.map((reply) => (
        <div
          key={reply.id}
          className="flex items-center gap-3 border-t border-white/10 pt-3"
        >
          <Avatar name={reply.authorName} size="md" />
          <p className="min-w-0 wrap-break-word text-xs font-semibold">{reply.text}</p>
        </div>
      ))}
    </article>
  )
}

export default function ForumSection({ posts, onAddPost }) {
  return (
    <section aria-labelledby="forum-heading">
      <div id="forum-heading">
        <SectionHeading icon={CommentIcon} title="Forum" />
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,16rem),1fr))] items-stretch gap-4 sm:gap-5">
        {posts.map((post) => (
          <ForumPostCard key={post.id} post={post} />
        ))}
        <button
          type="button"
          onClick={onAddPost}
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