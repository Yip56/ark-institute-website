// Ark Music Studio logo mark — sailboat + treble clef combination
// TODO: Replace this SVG placeholder with the actual brand logo asset when available
export default function ArkLogo({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Ark Music Studio logo"
    >
      {/* Sailboat hull */}
      <path
        d="M6 26 Q18 30 30 26 L28 23 H8 Z"
        fill="#D4A853"
      />
      {/* Main sail */}
      <path
        d="M18 4 L8 23 L28 23 Z"
        fill="none"
        stroke="#D4A853"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Treble clef mast */}
      <path
        d="M18 4 L18 23"
        stroke="#D4A853"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Decorative note flag */}
      <circle cx="18" cy="6" r="1.5" fill="#D4A853" />
      <path
        d="M18 6 Q24 9 22 13 Q20 17 18 14"
        fill="none"
        stroke="#D4A853"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}
