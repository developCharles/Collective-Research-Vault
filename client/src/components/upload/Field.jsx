export const inputCls =
  'h-12 w-full rounded-lg border bg-white/5 px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-gold/60 focus:ring-2 focus:ring-gold/20'

export default function Field({ label, error, children }) {
  return (
    <div className="min-w-0">
      <label className="block">
        <span className="block text-sm font-bold uppercase tracking-wide text-gold">{label}</span>
        <span className="mt-3 block">{children}</span>
      </label>
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-danger-ink">
          {error}
        </p>
      )}
    </div>
  )
}