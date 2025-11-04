import { useEffect, useRef, useState } from 'react';
import { track } from '@/analytics/ga';

type Props = {
  /** Starting value */
  value?: number;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Step size for inc/dec */
  step?: number;
  /** Prefix/Suffix text (e.g., "+", "%") */
  prefix?: string;
  suffix?: string;
  /** Animate count up on mount */
  animateOnMount?: boolean;
  /** Duration (ms) for mount animation */
  durationMs?: number;
  /** Label for screen readers */
  ariaLabel?: string;
  /** GA location label (e.g. 'counter') */
  location?: string;
  onChange?: (v: number) => void;
};

export default function Counter({
  value = 0,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  step = 1,
  prefix = '',
  suffix = '',
  animateOnMount = true,
  durationMs = 800,
  ariaLabel = 'Counter',
  location = 'counter',
  onChange,
}: Props) {
  const [val, setVal] = useState(value);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!animateOnMount) return;
    const start = performance.now();
    const startVal = 0;
    const endVal = value;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      const next = Math.round(startVal + (endVal - startVal) * eased);
      setVal(next);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, []); // eslint-disable-line

  function clamp(n: number) { return Math.max(min, Math.min(max, n)); }
  function setAndEmit(n: number, action: 'increment'|'decrement') {
    const c = clamp(n);
    setVal(c);
    onChange?.(c);
    track('cta_clicked', { button_location: location, action, value: c });
  }

  return (
    <div role="group" aria-label={ariaLabel} className="inline-flex items-center gap-3">
      <button
        type="button"
        className="btn btn-outline min-h-[44px] min-w-[44px]"
        aria-label="Decrease value"
        onClick={() => setAndEmit(val - step, 'decrement')}
      >−</button>
      <output
        aria-live="polite"
        className="px-4 py-2 rounded-xl bg-base-200 text-base-content text-2xl font-bold min-h-[44px] min-w-[44px] text-center"
      >
        {prefix}{val}{suffix}
      </output>
      <button
        type="button"
        className="btn btn-primary min-h-[44px] min-w-[44px]"
        aria-label="Increase value"
        onClick={() => setAndEmit(val + step, 'increment')}
      >+</button>
    </div>
  );
}
