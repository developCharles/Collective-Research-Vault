import { glass } from '../dashboard/constants'
import { UsersIcon } from '../dashboard/icons'
import Avatar from './Avatar'
import SectionHeading from './SectionHeading'

export default function AuthorsCard({ authors }) {
  return (
    <section aria-labelledby="authors-heading">
      <div id="authors-heading">
        <SectionHeading icon={UsersIcon} title="Authors" />
      </div>

      <div className={`${glass} p-4`}>
        {authors.length === 0 ? (
          <p className="text-sm text-white/50">No authors listed.</p>
        ) : (
          <ul className="space-y-3">
            {authors.map((name) => (
              <li key={name} className="flex items-center gap-3">
                <Avatar name={name} size="md" />
                <span className="min-w-0 wrap-break-word text-sm font-semibold">{name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}