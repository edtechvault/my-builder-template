import { useEffect, useRef, useState } from 'react';

type Props = {
  /** end value to count to */
  to: number;
  /** start value (default 0) */
  from?: number;
  /** animation duration in ms (default 1200) */
  durationMs?: number;
  /** decimals to show (default 0) */
  decimals?: number;
  /** number locale, e.g., 'en-US' (default browser) */
  locale?: string;
  /** string shown before the number */
  prefix?: string;
  /** string shown after the number */
  suffix?: string;
  /** start counting when visible (default true) */
  startOnView?: boolean;
};

export default function CountUpText({
  to,
  from = 0,
  durationMs = 1200,
  decimals = 0,
  locale,
  prefix = '',
  suffix = '',
  startOnView = true,
}: Props) {
  const [val, setVal] = useState(from);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !startOnView) {
      setVal(to);
      setDone(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const start = () => {
      let raf = 0;
      const t0 = performance.now();
      const animate = (t: number) => {
        const p = Math.min(1, (t - t0) / durationMs);
        const current = from + (to - from) * p;
        setVal(current);
        if (p < 1) raf = requestAnimationFrame(animate);
        else {
          setVal(to);
          setDone(true);
        }
      };
      raf = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(raf);
    };

    let cleanup: (() => void) | undefined;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio >= 0.3 && !done) {
          cleanup = start() || undefined;
          io.disconnect();
        }
      });
    }, { threshold: [0, 0.3, 1] });

    io.observe(el);
    return () => {
      io.disconnect();
      if (cleanup) cleanup();
    };
  }, [from, to, durationMs, startOnView, done]);

  const formatted = (() => {
    const n = Number(val.toFixed(decimals));
    return locale ? n.toLocaleString(locale) : n.toLocaleString();
  })();

  return (
    <span
      ref={ref}
      className="font-bold text-primary"
      aria-label={`${prefix}${to}${suffix}`}
    >
      {prefix}{formatted}{suffix}
    </span>
  );
}
