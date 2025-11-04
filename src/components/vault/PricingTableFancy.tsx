import { useEffect, useRef } from 'react';
import type { PricingTier } from '@/types/Pricing';
import { track } from '@/analytics/ga';

type Props = {
  sectionId?: string; // used for sessionStorage de-dupe
  heading?: string;
  subheading?: string;
  tiers: PricingTier[];
};

export default function PricingTableFancy({ sectionId='pricing', heading='Pricing', subheading, tiers }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const key = `pricing_view_${sectionId}`;
    if (sessionStorage.getItem(key)) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          track('pricing_view', { section_id: sectionId });
          sessionStorage.setItem(key, '1');
          io.disconnect();
        }
      });
    }, { threshold: [0, 0.3, 1] });

    io.observe(el);
    return () => io.disconnect();
  }, [sectionId]);

  return (
    <section ref={ref} className="bg-base-100 text-base-content py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold">{heading}</h2>
          {subheading && <p className="mt-3 opacity-80">{subheading}</p>}
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map(t => (
            <article key={t.id} className={`card bg-base-200 shadow-xl ${t.popular ? 'ring-2 ring-primary' : ''}`}>
              <div className="card-body">
                <h3 className="card-title justify-between">
                  <span>{t.name}</span>
                  {t.popular && <span className="badge badge-primary">Most Popular</span>}
                </h3>
                <p className="text-4xl font-extrabold mt-2">{t.price}</p>
                <ul className="mt-4 space-y-2">
                  {t.features.map((f,i) => <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-3 w-3 rounded-full bg-primary" aria-hidden="true"></span>
                    <span>{f}</span>
                  </li>)}
                </ul>
                <div className="card-actions mt-6">
                  <a
                    href={t.ctaHref}
                    className="btn btn-primary w-full min-h-11"
                    onClick={() => track('cta_clicked', { button_location: 'pricing', button_text: t.ctaLabel, tier: t.name })}
                    aria-label={`Choose ${t.name} plan`}
                  >
                    {t.ctaLabel}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
