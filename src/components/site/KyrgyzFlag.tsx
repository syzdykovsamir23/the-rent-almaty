/**
 * Flag of Kyrgyzstan, drawn rather than pulled from an emoji font: flag emoji
 * do not render on Windows, and this line is the one that has to be legible.
 * Red field, forty-rayed sun, and the tunduk inside it.
 */
const RAYS = Array.from({ length: 40 }, (_, i) => (i * 360) / 40);

export function KyrgyzFlag({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 30 20"
      className={className}
      role="img"
      aria-label="Kyrgyzstan"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect width="30" height="20" fill="#E8112D" />

      <g transform="translate(15 10)">
        {RAYS.map((angle) => (
          <line
            key={angle}
            x1="0"
            y1="-4.6"
            x2="0"
            y2="-6.8"
            stroke="#FFEF00"
            strokeWidth="0.5"
            strokeLinecap="round"
            transform={`rotate(${angle})`}
          />
        ))}
        <circle r="4.6" fill="#FFEF00" />
        {/* Tunduk: two crossing pairs of arcs, as seen from below. */}
        <g fill="none" stroke="#E8112D" strokeWidth="0.55" strokeLinecap="round">
          <path d="M-2.9 -1.3A3.2 3.2 0 0 0 2.9 -1.3" />
          <path d="M-2.9 1.3A3.2 3.2 0 0 1 2.9 1.3" />
          <path d="M-1.3 -2.9A3.2 3.2 0 0 1 -1.3 2.9" />
          <path d="M1.3 -2.9A3.2 3.2 0 0 0 1.3 2.9" />
        </g>
      </g>
    </svg>
  );
}
