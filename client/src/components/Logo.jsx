export default function Logo({ className = 'size-10' }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="round"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 4l17 10v20L24 44 7 34V14z" />
      <path d="M24 15l8 4.6v9.2L24 33.4l-8-4.6v-9.2z" />
      <path d="M24 24l8-4.6M24 24l-8-4.6M24 24v9.4" />
    </svg>
  )
}