const Svg = ({ children, className = 'size-4', strokeWidth = 1.8 }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
)

export const HomeIcon = (p) => (
  <Svg {...p}>
    <path d="M3 11l9-8 9 8" />
    <path d="M5 10v10h14V10" />
    <path d="M10 20v-5h4v5" />
  </Svg>
)

export const UsersIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="7" r="2.6" />
    <path d="M7.5 18c0-2.6 2-4.2 4.5-4.2s4.5 1.6 4.5 4.2z" />
    <circle cx="5" cy="10" r="2" />
    <path d="M1.8 17.5c0-1.8 1.4-3 3.2-3" />
    <circle cx="19" cy="10" r="2" />
    <path d="M22.2 17.5c0-1.8-1.4-3-3.2-3" />
  </Svg>
)

export const BookIcon = (p) => (
  <Svg {...p}>
    <path d="M2.5 5h6.5a3 3 0 013 3v12a2.5 2.5 0 00-2.5-2.5H2.5z" />
    <path d="M21.5 5H15a3 3 0 00-3 3v12a2.5 2.5 0 012.5-2.5h7z" />
  </Svg>
)

export const SearchIcon = (p) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-4-4" />
  </Svg>
)

export const ClockIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Svg>
)

export const DocIcon = (p) => (
  <Svg {...p}>
    <path d="M6 3h9l4 4v14H6z" />
    <path d="M15 3v4h4" />
  </Svg>
)

export const PlusIcon = (p) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
)

export const DotsIcon = ({ className = 'size-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <circle cx="5" cy="12" r="1.6" />
    <circle cx="12" cy="12" r="1.6" />
    <circle cx="19" cy="12" r="1.6" />
  </svg>
)

export const CommentIcon = (p) => (
  <Svg {...p}>
    <path d="M4 5h16v11H9l-5 4z" />
  </Svg>
)

export const CheckIcon = (p) => (
  <Svg {...p}>
    <path d="M5 12l5 5 9-10" />
  </Svg>
)

export const AlertIcon = (p) => (
  <Svg {...p}>
    <path d="M12 3l10 18H2z" />
    <path d="M12 10v4M12 17.5v.01" />
  </Svg>
)

export const StarIcon = ({ className = 'size-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5L9 8.9z" />
  </svg>
)

export const MenuIcon = (p) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
)

export const CloseIcon = (p) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Svg>
)

export const ExternalLinkIcon = (p) => (
  <Svg {...p}>
    <path d="M10 6H6a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-4M14 4h6v6M20 4l-9 9" />
  </Svg>
)

export const HeartIcon = (p) => (
  <Svg {...p}>
    <path d="M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z" />
  </Svg>
)

export const ChatIcon = (p) => (
  <Svg {...p}>
    <path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.5A8 8 0 1121 12z" />
  </Svg>
)

export const BellIcon = (p) => (
  <Svg {...p}>
    <path d="M6 9a6 6 0 0112 0c0 5 2 6.5 2 6.5H4S6 14 6 9z" />
    <path d="M10 19a2 2 0 004 0" />
  </Svg>
)

export const CommentTextIcon = (p) => (
  <Svg {...p}>
    <path d="M4 5h16v11H9l-5 4z" />
    <path d="M8 9h8M8 12.5h5" />
  </Svg>
)

export const PaperclipIcon = (p) => (
  <Svg {...p}>
    <path d="M21 11.5l-8.8 8.8a5.5 5.5 0 01-7.8-7.8l8.8-8.8a3.7 3.7 0 015.2 5.2l-8.8 8.8a1.8 1.8 0 01-2.6-2.6l8-8" />
  </Svg>
)

export const CommentPlusIcon = (p) => (
  <Svg {...p}>
    <path d="M4 5h16v11H9l-5 4z" />
    <path d="M12 7.5v5M9.5 10h5" />
  </Svg>
)

export const UploadCloudIcon = (p) => (
  <Svg {...p}>
    <path d="M7 18a4.5 4.5 0 01-.6-8.96A6 6 0 0117.7 7.6 4.7 4.7 0 0117.5 18" />
    <path d="M12 21v-8M8.8 15.8L12 12.6l3.2 3.2" />
  </Svg>
)

export const ChevronDownIcon = (p) => (
  <Svg {...p}>
    <path d="M6 9l6 6 6-6" />
  </Svg>
)