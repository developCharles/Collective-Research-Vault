import { glass } from '../dashboard/constants'
import { SearchIcon } from '../dashboard/icons'

export default function FilterPanel({ query, onQueryChange, types, selected, onToggle, onApply }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onApply()
      }}
      className={`${glass} p-4 sm:p-5 lg:sticky lg:top-6`}
    >
      <label className="relative block">
        <span className="sr-only">Search student or title</span>
        <SearchIcon className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/60" />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search student or title..."
          className="w-full rounded-full border border-white/30 bg-transparent py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-white/50 focus:border-gold/60 focus:ring-2 focus:ring-gold/20"
        />
      </label>

      <fieldset className="mt-6">
        <legend className="sr-only">Paper type</legend>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 lg:grid-cols-1">
          {types.map((type) => (
            <label key={type} className="flex cursor-pointer items-center gap-3 text-sm text-white/70">
              <input
                type="checkbox"
                checked={selected.includes(type)}
                onChange={() => onToggle(type)}
                className="size-4 shrink-0 cursor-pointer rounded accent-gold"
              />
              {type}
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        className="mt-6 w-full rounded-xl bg-gold py-3 text-base font-semibold text-ink transition-colors hover:bg-gold-light"
      >
        Filter Results
      </button>
    </form>
  )
}