import { SearchIcon } from './icons'

export default function DashboardHeader({ firstName, query, onQueryChange, onUpload }) {
  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0">
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Welcome back, {firstName}</h1>
        <p className="mt-1 text-sm text-white/60">
          Here is what&apos;s happening with your research projects.
        </p>
      </div>

      <div className="flex w-full items-center gap-3 lg:w-auto">
        <label className="relative min-w-0 flex-1 lg:w-64 lg:flex-none">
          <span className="sr-only">Search your papers</span>
          <SearchIcon className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/50" />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search your papers..."
            className="w-full rounded-full border border-white/15 bg-white/10 py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-white/50 focus:border-gold/60 focus:ring-2 focus:ring-gold/20"
          />
        </label>
        <button
          type="button"
          onClick={onUpload}
          className="shrink-0 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-light sm:px-6"
        >
          Upload
        </button>
      </div>
    </header>
  )
}