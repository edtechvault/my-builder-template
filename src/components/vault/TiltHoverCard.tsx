import React, { useRef } from 'react';

type Props = {
  title: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  maxTiltDeg?: number;
};

export default function TiltHoverCard({
  title,
  body,
  ctaLabel,
  ctaHref = '#',
  maxTiltDeg = 10,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * -2 * maxTiltDeg;
    const ry = (px - 0.5) *  2 * maxTiltDeg;
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  }
  function reset() {
    const el = ref.current;
    if (el) el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
  }

  return (
    <section className="bg-base-100 text-base-content py-10">
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className="mx-auto max-w-md rounded-2xl bg-base-200 p-6 shadow-xl transition-transform will-change-transform"
        style={{ transform: 'perspective(800px)' }}
      >
        <h3 className="text-xl font-bold">{title}</h3>
        {body && <p className="mt-2 opacity-80">{body}</p>}
        {ctaLabel && (
          <div className="mt-6">
            <a href={ctaHref} className="btn btn-primary min-h-[44px] min-w-[44px]">{ctaLabel}</a>
          </div>
        )}
      </div>
    </section>
  );
}
