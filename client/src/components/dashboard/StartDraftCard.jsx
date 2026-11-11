import { PlusIcon } from './icons';

export default function StartDraftCard({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/25 text-sm font-semibold text-white/60 transition hover:border-[#F5B829]/60 hover:text-[#F5B829]"
    >
      <span className="grid h-11 w-11 place-items-center rounded-full bg-white/10">
        <PlusIcon className="h-5 w-5" />
      </span>
      Start New Draft
    </button>
  );
}
