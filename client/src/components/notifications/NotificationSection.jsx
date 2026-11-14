    import { glass } from '../dashboard/constants'

export default function NotificationSection({ id, icon: Icon, title, children }) {
  return (
    <section aria-labelledby={id}>
      <h2
        id={id}
        className="mb-4 flex items-center gap-2 font-display text-base font-medium text-white/70 sm:text-lg"
      >
        <Icon className="size-5" />
        {title}
      </h2>
      <div className={`${glass} p-4 sm:p-6`}>{children}</div>
    </section>
  )
}