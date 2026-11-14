import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon } from '../dashboard/icons'

const FOCUSABLE = 'button:not([disabled]), textarea, input:not([disabled])'

export default function ModalShell({ title, icon: Icon, onClose, children }) {
  const titleId = useId()
  const dialogRef = useRef(null)

  useEffect(() => {
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.querySelector('input, textarea')?.focus()

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

  return createPortal(
    <div
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto p-4 font-display text-white backdrop-blur-xl"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-[34rem] rounded-2xl border border-white/10 bg-modal p-4 shadow-2xl shadow-black/30"
      >
        <div className="flex items-center justify-between gap-3">
          <h2
            id={titleId}
            className="flex min-w-0 items-center gap-3 px-1 text-base font-medium text-white/75"
          >
            <Icon className="size-5 shrink-0" />
            <span className="truncate">{title}</span>
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
        {children}
      </div>
    </div>,
    document.body
  )
}