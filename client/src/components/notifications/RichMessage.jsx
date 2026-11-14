const TOKEN = /(\*\*[^*]+\*\*|"[^"]+")/g

export default function RichMessage({ text = '' }) {
  return text.split(TOKEN).map((part, i) => {
    if (part.startsWith('**')) {
      return (
        <strong key={i} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith('"')) {
      return (
        <strong key={i} className="font-bold text-white">
          {part}
        </strong>
      )
    }
    return <span key={i}>{part}</span>
  })
}