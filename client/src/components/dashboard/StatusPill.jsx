import { STATUS_STYLES } from './constants'

export default function StatusPill({ status, className = '' }) {
  const s = STATUS_STYLES[status] ?? {
    label: status,
    cls: 'bg-white/10 text-white/70 border-white/20',
  }
  return (
    <span
      className={`shrink-0 rounded-full border px-3 py-1 text-[0.625rem] font-bold uppercase tracking-wider ${s.cls} ${className}`}
    >
      {s.label}
    </span>
  )
}