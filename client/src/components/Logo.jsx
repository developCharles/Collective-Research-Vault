export default function Logo({ className = 'size-10' }) {
  return (
    <svg
      viewBox="-230 -265 460 530"
      fill="none"
      stroke="currentColor"
      strokeWidth="31"
      strokeLinejoin="miter"
      strokeMiterlimit="4"
      className={className}
      aria-hidden="true"
    >
      <path d="M0 -244 L211 -122 V122 L0 244 L-211 122 V-122 Z" />
      <path d="M0 -244 V-114 M-211 122 L-102 63 M211 122 L102 63" />
      <path d="M0 -114 L102 -55 V63 L0 122 L-102 63 V-55 Z" />
      <path d="M0 4 L-102 -55 M0 4 L102 -55 M0 4 V122" />
    </svg>
  )
}