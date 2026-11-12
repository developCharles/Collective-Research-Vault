import { PlusIcon } from './icons'

export default function StartDraftCard({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-40 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/25 p-4 text-sm font-semibold text-white/60 transition hover:border-gold/60 hover:text-gold sm:min-h-48"
    >
      <span className="grid size-11 place-items-center rounded-full bg-white/10">
        <PlusIcon className="size-5" />
      </span>
      Start New Draft
    </button>
  )
}