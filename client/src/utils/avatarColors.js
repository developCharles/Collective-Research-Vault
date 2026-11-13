const TONES = [
  'bg-gold text-ink',
  'bg-[#90CF7A] text-white',
  'bg-[#59FFF7] text-[#000D63]',
  'bg-[#FF3B3E] text-white',
  'bg-[#8C7ACF] text-white',
  'bg-[#CF8E7A] text-white',
]

export function initials(name = '') {
  return (
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join('') || '?'
  )
}

export function avatarTone(name = '') {
  let hash = 0
  for (let i = 0; i < name.length; i += 1) hash = (hash * 31 + name.charCodeAt(i)) >>> 0
  return TONES[hash % TONES.length]
}