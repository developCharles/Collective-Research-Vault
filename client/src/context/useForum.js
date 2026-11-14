import { useContext } from 'react'
import { ForumContext } from './forumContext'

export default function useForum() {
  const value = useContext(ForumContext)
  if (!value) throw new Error('useForum must be used inside ForumProvider')
  return value
}