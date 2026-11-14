import { AlertIcon, CheckIcon, CommentTextIcon } from '../dashboard/icons'

const STYLES = {
  new_comment: { Icon: CommentTextIcon, cls: 'bg-info/20 text-info-ink' },
  status_change: { Icon: CheckIcon, cls: 'bg-success/20 text-success-ink' },
  assignment: { Icon: CheckIcon, cls: 'bg-success/20 text-success-ink' },
  system: { Icon: AlertIcon, cls: 'bg-warn/20 text-warn-ink' },
}

export default function NotificationIcon({ type }) {
  const { Icon, cls } = STYLES[type] ?? STYLES.system
  return (
    <span className={`grid size-8 shrink-0 place-items-center rounded-full ${cls}`}>
      <Icon className="size-4" />
    </span>
  )
}