import { ReactNode } from 'react';

/**
 * ScrollStack creates a stacked set of panels that "pin" using CSS sticky,
 * revealing the next panel as you scroll. Keep content lightweight for performance.
 */
type StackItem = {
  id: string;
  title?: string;
  content: ReactNode;
};

type Props = {
  items: StackItem[];
  /** Sticky top offset */
  offsetClass?: string; // e.g., 'top-16'
  ariaLabel?: string;
};

export default function ScrollStack({ items, offsetClass='top-20', ariaLabel='Scroll stack panels' }: Props) {
  return (
    <section aria-label={ariaLabel} className="relative">
      <div className="relative">
        {items.map((it, idx) => (
          <article
            key={it.id}
            className={`sticky ${offsetClass} z-${50 + idx} mb-8 rounded-2xl bg-base-200 p-6 shadow-lg`}
          >
            {it.title && <h3 className="text-xl font-bold mb-2">{it.title}</h3>}
            <div className="prose max-w-none">{it.content}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
