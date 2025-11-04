import { ReactNode } from 'react';
import { track } from '@/analytics/ga';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClickLocation?: string; // e.g., 'hero'
  children?: ReactNode;
};

export default function HeroAurora({
  eyebrow, title, subtitle, ctaLabel, ctaHref = '#', onCtaClickLocation = 'hero', children,
}: Props) {
  const aurora = {
    backgroundImage: `
      radial-gradient(60% 50% at 10% 10%, hsl(var(--p) / 0.18) 0%, transparent 60%),
      radial-gradient(40% 40% at 90% 10%, hsl(var(--a) / 0.18) 0%, transparent 60%),
      radial-gradient(50% 60% at 50% 90%, hsl(var(--s) / 0.18) 0%, transparent 60%)
    `
  };

  return (
    <section className="relative overflow-hidden bg-base-100 text-base-content">
      <div className="absolute inset-0 -z-10" style={aurora} aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {eyebrow && <p className="mb-2 text-sm opacity-70">{eyebrow}</p>}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">{title}</h1>
        {subtitle && <p className="mt-4 text-lg md:text-xl opacity-90">{subtitle}</p>}
        <div className="mt-8 flex gap-4">
          {ctaLabel && (
            <a
              href={ctaHref}
              className="btn btn-primary min-h-11 min-w-11"
              onClick={() => track('cta_clicked', { button_location: onCtaClickLocation, button_text: ctaLabel })}
            >
              {ctaLabel}
            </a>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
