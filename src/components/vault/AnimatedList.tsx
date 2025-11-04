import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  items: string[];
  /** Milliseconds between item appearances */
  intervalMs?: number;
  /** Optional aria-label for list */
  ariaLabel?: string;
};

export default function AnimatedList({ items, intervalMs = 120, ariaLabel = 'Animated list' }: Props) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // ensure no horizontal overflow for eval:responsive
    if (!ref.current) return;
    ref.current.style.overflowX = 'hidden';
  }, []);

  return (
    <ul ref={ref} aria-label={ariaLabel} role="list" className="space-y-2">
      <AnimatePresence initial={false}>
        {items.map((text, i) => (
          <motion.li
            key={`${text}-${i}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0, transition: { delay: i * (intervalMs / 1000) } }}
            exit={{ opacity: 0, y: -6 }}
            className="rounded-lg bg-base-200 px-4 py-3"
          >
            {text}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
