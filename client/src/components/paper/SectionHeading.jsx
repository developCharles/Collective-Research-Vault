export default function SectionHeading({ icon: Icon, title }) {
  return (
    <h2 className="mb-4 flex items-center gap-2 font-display text-base font-medium text-white/70">
      <Icon className="size-5" />
      {title}
    </h2>
  )
}