import { motion } from 'framer-motion';
import { track } from '@/analytics/ga';

export type BubbleItem = { id: string; label: string; href?: string; onClick?: () => void };

type Props = {
  items: BubbleItem[];
  /** distance between bubbles (px) */
  gap?: number;
  /** GA location */
  location?: string;
  ariaLabel?: string;
};

export default function BubbleMenu({ items, gap = 64, location = 'bubble-menu', ariaLabel='Quick actions' }: Props) {
  return (
    <div className="relative inline-block">
      <div className="group inline-flex">
        <button
          className="btn btn-primary rounded-full min-h-[56px] min-w-[56px]"
          aria-label="Open quick actions"
        >
          •••
        </button>

        {/* bubbles */}
        <ul aria-label={ariaLabel} className="relative">
          {items.map((b, i) => {
            const Tag = b.href ? 'a' : 'button';
            const pos = { x: (i + 1) * gap, y: 0 };
            const common = {
              className:
                'btn btn-accent rounded-full absolute top-1/2 -translate-y-1/2 min-h-[48px] min-w-[48px] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto focus:outline-none focus-visible:ring ring-primary',
              'aria-label': b.label,
              onClick: () => {
                b.onClick?.();
                track('cta_clicked', { button_location: location, item: b.label });
              }
            } as any;
            return (
              <li key={b.id} className="list-none">
                <motion.div
                  initial={{ x: 0, opacity: 0 }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{ x: pos.x, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 240, damping: 20, delay: 0.04 * (i + 1) }}
                >
                  {Tag === 'a' ? <a {...common} href={b.href}>{b.label}</a> : <button {...common}>{b.label}</button>}
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
