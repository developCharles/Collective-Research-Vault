import { useCallback, useMemo, useState } from 'react'
import useAuth from './useAuth'
import { ForumContext } from './forumContext'
import { forumPlaceholderPosts } from '../services/forumPlaceholder'
import AddPostModal from '../components/paper/AddPostModal'

export default function ForumProvider({ children }) {
  const { user } = useAuth()
  const [posts, setPosts] = useState(forumPlaceholderPosts)
  const [composing, setComposing] = useState(false)

  const authorName = user?.name ?? user?.full_name ?? 'You'
  const firstName = authorName.split(' ')[0]

  const openComposer = useCallback(() => setComposing(true), [])
  const closeComposer = useCallback(() => setComposing(false), [])

  const addPost = useCallback(
    ({ text, file, video }) => {
      setPosts((list) => [
        {
          id: `local-${Date.now()}`,
          authorName,
          text,
          createdAt: new Date().toISOString(),
          attachments: [file?.name, video?.name].filter(Boolean),
          liked: false,
          replies: [],
        },
        ...list,
      ])
      setComposing(false)
    },
    [authorName]
  )

  const addReply = useCallback(
    (postId, text) => {
      setPosts((list) =>
        list.map((p) =>
          p.id === postId
            ? { ...p, replies: [...p.replies, { id: `local-${Date.now()}`, authorName, text }] }
            : p
        )
      )
    },
    [authorName]
  )

  const toggleLike = useCallback((postId) => {
    setPosts((list) => list.map((p) => (p.id === postId ? { ...p, liked: !p.liked } : p)))
  }, [])

  const value = useMemo(
    () => ({ posts, addReply, toggleLike, openComposer }),
    [posts, addReply, toggleLike, openComposer]
  )

  return (
    <ForumContext.Provider value={value}>
      {children}
      {composing && (
        <AddPostModal firstName={firstName} onClose={closeComposer} onSubmit={addPost} />
      )}
    </ForumContext.Provider>
  )
}