const URL_PATTERN = /(https?:\/\/[^\s]+)/g

export default function LinkifiedText({ text = '' }) {
  return text.split(URL_PATTERN).map((part, i) =>
    i % 2 === 1 ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all text-gold underline underline-offset-2 hover:text-gold-light"
      >
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}