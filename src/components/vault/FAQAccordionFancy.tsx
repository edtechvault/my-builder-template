import { useId, useState } from 'react';
import type { FAQItem } from '@/types/FAQ';

type Props = {
  items: FAQItem[];
  singleOpen?: boolean; // QA: must work for both modes
};

export default function FAQAccordionFancy({ items, singleOpen=false }: Props) {
  const [openIds, setOpenIds] = useState<string[]>([]);
  const base = useId();

  function toggle(id: string) {
    setOpenIds(prev => {
      const isOpen = prev.includes(id);
      if (singleOpen) return isOpen ? [] : [id];
      return isOpen ? prev.filter(x => x !== id) : [...prev, id];
    });
  }

  return (
    <section className="bg-base-100 text-base-content py-12">
      <div className="mx-auto max-w-4xl px-6">
        <ul className="space-y-4">
          {items.map((item, idx) => {
            const qId = `${base}-q-${item.id || idx}`;
            const aId = `${base}-a-${item.id || idx}`;
            const expanded = openIds.includes(item.id || String(idx));
            return (
              <li key={item.id || idx} className="border border-base-300 rounded-xl">
                <button
                  id={qId}
                  className="w-full text-left p-4 md:p-5 flex justify-between items-center focus:outline-none focus-visible:ring ring-primary min-h-11"
                  aria-expanded={expanded}
                  aria-controls={aId}
                  onClick={() => toggle(item.id || String(idx))}
                >
                  <span className="font-medium">{item.question}</span>
                  <span className="ml-4">{expanded ? '−' : '+'}</span>
                </button>
                <div
                  id={aId}
                  role="region"
                  aria-labelledby={qId}
                  className={`px-4 md:px-5 pb-4 md:pb-5 transition-[max-height,opacity] duration-300 ${expanded ? 'opacity-100' : 'opacity-0'} `}
                  style={{ maxHeight: expanded ? '500px' : '0', overflow: 'hidden' }}
                >
                  <p>{item.answer}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
