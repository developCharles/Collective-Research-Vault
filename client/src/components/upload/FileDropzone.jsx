import { useRef, useState } from 'react'
import { CloseIcon, DocIcon, UploadCloudIcon } from '../dashboard/icons'
import { ACCEPTED_EXTENSIONS, MAX_FILE_MB } from '../../services/uploadService'

const formatSize = (bytes) =>
  bytes >= 1048576 ? `${(bytes / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`

export function validateFile(file) {
  if (!file) return 'Please attach your research file.'
  const ext = file.name.split('.').pop().toLowerCase()
  if (!ACCEPTED_EXTENSIONS.includes(ext)) return 'Only PDF, DOC or DOCX files are accepted.'
  if (file.size > MAX_FILE_MB * 1048576) return `File is larger than ${MAX_FILE_MB}MB.`
  return ''
}

export default function FileDropzone({ file, error, onChange }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  const pick = (list) => {
    const next = list?.[0]
    if (next) onChange(next)
  }

  const openPicker = () => inputRef.current?.click()

  const clear = (e) => {
    e.stopPropagation()
    if (inputRef.current) inputRef.current.value = ''
    onChange(null)
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label="Choose research file"
        onClick={openPicker}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            openPicker()
          }
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          pick(e.dataTransfer.files)
        }}
        className={`flex min-h-44 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center outline-none transition focus-visible:ring-2 focus-visible:ring-gold/40 ${
          dragging ? 'border-gold bg-gold/10' : error ? 'border-danger' : 'border-white/25 hover:border-white/40'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS.map((e) => `.${e}`).join(',')}
          onChange={(e) => pick(e.target.files)}
          className="sr-only"
          tabIndex={-1}
        />

        {file ? (
          <div className="flex max-w-full items-center gap-3 rounded-xl border border-white/15 bg-white/5 py-2 pl-4 pr-2">
            <DocIcon className="size-6 shrink-0 text-gold" />
            <div className="min-w-0 text-left">
              <p className="truncate text-sm font-medium">{file.name}</p>
              <p className="text-xs text-white/50">{formatSize(file.size)}</p>
            </div>
            <button
              type="button"
              onClick={clear}
              aria-label="Remove file"
              className="grid size-9 shrink-0 place-items-center rounded-lg text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <CloseIcon className="size-4" />
            </button>
          </div>
        ) : (
          <>
            <UploadCloudIcon className="size-10 text-white/50" strokeWidth={1.5} />
            <p className="mt-2 text-sm text-white">Click to browse or drag and drop file here</p>
            <p className="text-xs text-white/40">Maximum file size: {MAX_FILE_MB}MB</p>
          </>
        )}
      </div>
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-danger-ink">
          {error}
        </p>
      )}
    </div>
  )
}