type Props = {
  text: string;
  /** speed in seconds (default 2.5) */
  speedS?: number;
  /** pause shimmer on hover (default true) */
  pauseOnHover?: boolean;
};

export default function ShinyText({ text, speedS = 2.5, pauseOnHover = true }: Props) {
  const grad = `
    linear-gradient(
      90deg,
      hsl(var(--p) / 0.25) 0%,
      hsl(var(--a) / 1) 50%,
      hsl(var(--p) / 0.25) 100%
    )
  `;
  return (
    <span
      className={`bg-clip-text text-transparent font-extrabold tracking-tight ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
      style={{
        backgroundImage: grad,
        backgroundSize: '200% 100%',
        animation: `shimmer ${speedS}s linear infinite`,
      }}
    >
      {text}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @media (prefers-reduced-motion: reduce) {
          span { animation: none !important; }
        }
      `}</style>
    </span>
  );
}
