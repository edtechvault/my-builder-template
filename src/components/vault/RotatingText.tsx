import { useEffect, useRef, useState } from 'react';

type Props = {
  words: string[];
  intervalMs?: number; // default 2000
  /** 'fade' | 'slide' */
  effect?: 'fade' | 'slide';
};

export default function RotatingText({ words, intervalMs = 2000, effect = 'fade' }: Props) {
  const [i, setI] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || words.length <= 1) return;
    timer.current = window.setInterval(() => setI((v) => (v + 1) % words.length), intervalMs);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [words.length, intervalMs]);

  return (
    <span className="inline-block">
      <span
        className={`inline-block ${effect === 'slide' ? 'transition-transform duration-500 will-change-transform' : 'transition-opacity duration-500'} `}
        style={effect === 'slide'
          ? { transform: 'translateY(0)' }
          : { opacity: 1 }}
        aria-live="off"
      >
        {words[i] ?? ''}
      </span>
    </span>
  );
}
