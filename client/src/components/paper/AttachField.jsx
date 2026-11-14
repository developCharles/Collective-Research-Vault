import { useRef, useState } from 'react'
import { CloseIcon, PaperclipIcon } from '../dashboard/icons'

export default function AttachField({ label, accept, onChange }) {
  const inputRef = useRef(null)
  const [name, setName] = useState('')

  const handleChange = (e) => {
    const file = e.target.files?.[0] ?? null
    setName(file ? file.name : '')
    onChange(file)
  }

  const clear = () => {
    if (inputRef.current) inputRef.current.value = ''
    setName('')
    onChange(null)
  }

  return (
    <div className="relative">
      <label className="flex h-11 cursor-pointer items-center justify-between gap-3 rounded-lg border border-field-line bg-field px-3 text-sm focus-within:border-gold/60 focus-within:ring-2 focus-within:ring-gold/20 sm:h-12 sm:px-4">
        <span className={`min-w-0 truncate ${name ? 'pr-8 text-white/90' : 'text-field-ink'}`}>
          {name || label}
        </span>
        {!name && <PaperclipIcon className="size-5 shrink-0 text-white/75" />}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="sr-only"
        />
      </label>
      {name && (
        <button
          type="button"
          onClick={clear}
          aria-label={`Remove ${label.toLowerCase()}`}
          className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-md text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <CloseIcon className="size-4" />
        </button>
      )}
    </div>
  )
}