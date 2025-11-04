// components/vault/HeroParticles.tsx
import { useCallback, useEffect, useMemo, useState } from 'react';
import Particles from 'react-tsparticles';
import type { Engine, ISourceOptions } from 'tsparticles-engine';
import { OutMode } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';
import { track } from '@/analytics/ga';

type Props = {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClickLocation?: string;
  particlesCount?: number; // keep lean for performance
};

export default function HeroParticles({
  title,
  subtitle,
  ctaLabel,
  ctaHref = '#',
  onCtaClickLocation = 'hero',
  particlesCount = 25,
}: Props) {
  const [hslPrimary, setHslPrimary] = useState('hsl(var(--p) / 0.6)');

  useEffect(() => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue('--p').trim();
    if (raw) setHslPrimary(`hsl(${raw} / 0.6)`);
  }, []);

  const init = useCallback(async (engine: Engine): Promise<void> => {
    await loadSlim(engine);
  }, []);

  const options: ISourceOptions = useMemo(() => ({
    fullScreen: false,
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    particles: {
      number: { value: particlesCount },
      color: { value: hslPrimary },
      links: { enable: true, distance: 120, opacity: 0.25, color: hslPrimary },
      move: {
        enable: true,
        speed: 0.6,
        // ✅ Use literal/enum, not a generic string
      },
      opacity: { value: 0.35 },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  }), [particlesCount, hslPrimary]);

  return (
    <section className="relative bg-base-100 text-base-content">
      <div className="absolute inset-0 -z-10">
        <Particles id="heroParticles" init={init} options={options} />
      </div>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">{title}</h1>
        {subtitle && <p className="mt-4 text-lg md:text-xl opacity-90">{subtitle}</p>}
        {ctaLabel && (
          <a
            href={ctaHref}
            className="btn btn-primary mt-8 min-h-[44px] min-w-[44px]"
            onClick={() =>
              track('cta_clicked', { button_location: onCtaClickLocation, button_text: ctaLabel })
            }
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </section>
  );
}
