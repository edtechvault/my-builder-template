import { motion, useMotionValue, useTransform } from 'framer-motion';
import { track } from '@/analytics/ga';

export type DockItem = {
  id: string;
  label: string;
  href?: string;
  /** Optional image/icon URL (WebP/AVIF recommended) */
  iconUrl?: string;
  /** Optional onClick override */
  onClick?: () => void;
};

type Props = {
  items: DockItem[];
  /** Radius in px where magnify effect applies */
  influencePx?: number;
  /** GA location */
  location?: string;
  ariaLabel?: string;
};

export default function Dock({
  items,
  influencePx = 100,
  location = 'dock',
  ariaLabel = 'Dock navigation',
}: Props) {
  const cursorX = useMotionValue(-9999);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    cursorX.set(e.clientX);
  }
  function sizeFor(el: HTMLAnchorElement | HTMLButtonElement) {
    const rect = el.getBoundingClientRect();
    return (x: number) => {
      const dist = Math.abs(x - (rect.left + rect.width / 2));
      const clamped = Math.max(0, influencePx - dist);
      const scale = 1 + (clamped / influencePx) * 0.8; // up to 1.8x
      return scale;
    };
  }

  return (
    <nav
      aria-label={ariaLabel}
      className="mx-auto w-full max-w-3xl"
      onMouseMove={handleMove}
      onMouseLeave={() => cursorX.set(-9999)}
    >
      <ul className="flex items-end justify-center gap-3 p-3 rounded-2xl bg-base-200">
        {items.map((it) => {
          const scale = useTransform(cursorX, (x) => {
            const el = document.getElementById(`dock-${it.id}`) as HTMLAnchorElement | HTMLButtonElement | null;
            if (!el) return 1;
            return sizeFor(el)(x);
          });

          const Tag = it.href ? 'a' : 'button';
          const common = {
            id: `dock-${it.id}`,
            className:
              'btn btn-ghost rounded-full h-[56px] w-[56px] md:h-[64px] md:w-[64px] p-0 overflow-hidden focus:outline-none focus-visible:ring ring-primary',
            'aria-label': it.label,
            onClick: () => {
              it.onClick?.();
              track('cta_clicked', { button_location: location, item: it.label, href: it.href || '' });
            }
          } as any;

          return (
            <li key={it.id} className="list-none">
              <motion.div style={{ scale }}>
                {Tag === 'a' ? (
                  <a {...common} href={it.href}>
                    {it.iconUrl
                      ? <img src={it.iconUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
                      : <span className="text-xl">{it.label.slice(0,2)}</span>}
                  </a>
                ) : (
                  <button {...common}>
                    {it.iconUrl
                      ? <img src={it.iconUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
                      : <span className="text-xl">{it.label.slice(0,2)}</span>}
                  </button>
                )}
              </motion.div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
