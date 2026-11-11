import { SearchIcon } from './icons';

export default function DashboardHeader({ firstName, query, onQueryChange, onUpload }) {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {firstName}</h1>
        <p className="mt-1 text-sm text-white/60">Here is what&apos;s happening with your research projects.</p>
      </div>

      <div className="flex items-center gap-3">
        <label className="relative">
          <span className="sr-only">Search your papers</span>
          <SearchIcon className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search your papers..."
            className="w-56 md:w-64 rounded-full bg-white/10 border border-white/15 py-2.5 pl-10 pr-4 text-sm placeholder:text-white/50 outline-none focus:border-[#F5B829]/60 focus:ring-2 focus:ring-[#F5B829]/20"
          />
        </label>
        <button
          type="button"
          onClick={onUpload}
          className="rounded-lg bg-[#F5B829] px-6 py-2.5 text-sm font-semibold text-[#1f2a5c] hover:bg-[#ffc83d] transition-colors"
        >
          Upload
        </button>
      </div>
    </header>
  );
}
