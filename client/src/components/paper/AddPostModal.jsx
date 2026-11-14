import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon, CommentPlusIcon } from '../dashboard/icons'
import AttachField from './AttachField'

const FOCUSABLE = 'button:not([disabled]), textarea, input'

export default function AddPostModal({ firstName, onClose, onSubmit }) {
  const titleId = useId()
  const dialogRef = useRef(null)
  const textRef = useRef(null)
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)
  const [video, setVideo] = useState(null)

  useEffect(() => {
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    textRef.current?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const items = [...dialogRef.current.querySelectorAll(FOCUSABLE)]
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [onClose])

  const canPost = text.trim().length > 0

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!canPost) return
    onSubmit({ text: text.trim(), file, video })
  }

  return createPortal(
    <div
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto p-4 font-display text-white backdrop-blur-xl"
    >
      <form
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onSubmit={handleSubmit}
        className="w-full max-w-[34rem] rounded-2xl border border-white/10 bg-modal p-4 shadow-2xl shadow-black/30"
      >
        <div className="flex items-center justify-between gap-3">
          <h2
            id={titleId}
            className="flex min-w-0 items-center gap-3 px-1 text-base font-medium text-white/75"
          >
            <CommentPlusIcon className="size-5 shrink-0" />
            <span className="truncate">Add New Post</span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex shrink-0 items-center gap-2 rounded-full border border-danger bg-danger/15 px-4 py-1.5 text-sm text-danger-ink transition hover:bg-danger/25"
          >
            <CloseIcon className="size-3.5 text-danger" strokeWidth={2.4} />
            Close
          </button>
        </div>

        <textarea
          ref={textRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={2000}
          placeholder={`What’s on your mind, ${firstName}?`}
          aria-label="Post content"
          className="mt-2 h-40 w-full resize-none rounded-lg border border-field-line bg-field p-3 text-sm text-white outline-none placeholder:text-field-ink focus:border-gold/60 focus:ring-2 focus:ring-gold/20 sm:h-44 sm:p-4"
        />

        <div className="mt-2 grid grid-cols-2 gap-2">
          <AttachField label="Attach File" onChange={setFile} />
          <AttachField label="Attach Video" accept="video/*" onChange={setVideo} />
        </div>

        <button
          type="submit"
          disabled={!canPost}
          className="mt-5 h-12 w-full rounded-xl bg-linear-to-br/srgb from-gold to-gold-soft text-base font-semibold text-ink transition enabled:hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Post
        </button>
      </form>
    </div>,
    document.body
  )
}