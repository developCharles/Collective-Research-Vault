import { glass, STATUS_STYLES } from '../dashboard/constants'
import { ClockIcon } from '../dashboard/icons'
import SectionHeading from './SectionHeading'
import { fullDate } from '../../utils/formatDate'

function VersionBadge({ status }) {
  const s = status
    ? STATUS_STYLES[status] ?? { label: status, cls: 'bg-white/10 text-white/70 border-white/20' }
    : { label: 'Previous version', cls: 'bg-white/10 text-white/60 border-white/20' }
  return (
    <span className={`block w-full rounded-full border py-1.5 text-center text-sm font-medium ${s.cls}`}>
      {s.label}
    </span>
  )
}

export default function VersionHistory({ versions, currentStatus }) {
  return (
    <section aria-labelledby="versions-heading">
      <div id="versions-heading">
        <SectionHeading icon={ClockIcon} title="Version History" />
      </div>

      {versions.length === 0 ? (
        <p className="text-sm text-white/50">No versions uploaded yet.</p>
      ) : (
        <ul className="space-y-3">
          {versions.map((v, index) => (
            <li key={v.number} className={`${glass} flex flex-col gap-3 p-4`}>
              <VersionBadge status={index === 0 ? currentStatus : null} />
              <div className="flex items-center justify-between gap-3">
                <span className="text-lg font-bold">v{v.number}</span>
                <span className="text-xs text-white/40">{fullDate(v.uploadedAt)}</span>
              </div>
              <p className="truncate border-t border-white/10 pt-3 text-sm text-white/60">
                {v.fileName}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}