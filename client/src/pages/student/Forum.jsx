import { useMemo, useState } from 'react'
import useForum from '../../context/useForum'
import ForumPostCard from '../../components/forum/ForumPostCard'
import NotificationsPreview from '../../components/forum/NotificationsPreview'
import { PlusIcon, SearchIcon } from '../../components/dashboard/icons'

export default function Forum() {
  const { posts, addReply, toggleLike, openComposer } = useForum()
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return posts
    return posts.filter(
      (p) => p.text.toLowerCase().includes(q) || p.authorName.toLowerCase().includes(q)
    )
  }, [posts, query])

  return (
    <div className="grid gap-x-8 gap-y-6 font-display xl:grid-cols-[minmax(0,1fr)_minmax(18rem,20rem)]">
      <div className="flex items-center justify-between gap-3 xl:self-center">
        <h1 className="text-3xl font-bold">Forums</h1>
        <button
          type="button"
          onClick={openComposer}
          className="flex items-center gap-2 rounded-full border border-gold/60 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold transition hover:bg-gold/20 lg:hidden"
        >
          <PlusIcon className="size-4" />
          Add New Post
        </button>
      </div>

      <label className="flex h-11 items-center gap-3 rounded-full border border-white/25 bg-white/5 px-4 transition focus-within:border-gold/60 focus-within:ring-2 focus-within:ring-gold/20 xl:self-center">
        <SearchIcon className="size-4 shrink-0 text-white/60" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Looking for posts?"
          aria-label="Search posts"
          className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/70"
        />
      </label>

      <div className="min-w-0 space-y-4">
        {visible.map((post) => (
          <ForumPostCard key={post.id} post={post} onLike={toggleLike} onReply={addReply} />
        ))}
        {visible.length === 0 && (
          <p className="rounded-2xl border border-dashed border-white/20 p-8 text-center text-sm text-white/60">
            {query.trim() ? 'No posts match your search.' : 'No posts yet. Start the conversation!'}
          </p>
        )}
      </div>

      <div className="min-w-0 xl:self-start">
        <NotificationsPreview />
      </div>
    </div>
  )
}