import { avatarTone, initials } from '../../utils/avatarColors'

const SIZES = {
  xs: 'size-5 text-[0.5rem]',
  sm: 'size-8 text-xs',
  md: 'size-10 text-base',
}

export default function Avatar({ name, size = 'sm' }) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full font-bold ${SIZES[size]} ${avatarTone(name)}`}
    >
      {initials(name)}
    </span>
  )
}