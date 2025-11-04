import React from 'react';

type GridItem = {
  id: string;
  imageSrc?: string;
  title: string;
  tags?: string[];
  metaIssue?: string;
  metaPage?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

type Props = {
  items: GridItem[];
  columns?: 2 | 3 | 4;
};

export default function HoverRevealGrid({ items, columns = 3 }: Props) {
  const colClass =
    columns === 4 ? 'md:grid-cols-4' :
    columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';

  return (
    <section className="bg-base-100 text-base-content py-10">
      <div className={`grid gap-5 grid-cols-1 ${colClass}`}>
        {items.map((item) => (
          <article
            key={item.id}
            className="group relative rounded-2xl overflow-hidden bg-base-200 focus-within:ring ring-primary transition"
          >
            <a
              href={item.ctaHref || '#'}
              className="block outline-none"
              aria-label={item.title}
            >
              {/* media */}
              <div className="aspect-[4/3] w-full overflow-hidden">
                {item.imageSrc ? (
                  <img
                    src={item.imageSrc}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="h-full w-full bg-base-300" />
                )}
              </div>

              {/* meta strip (Issue/Page) */}
              {(item.metaIssue || item.metaPage) && (
                <div className="absolute top-3 left-3 flex gap-2">
                  {item.metaIssue && <span className="badge badge-neutral">{item.metaIssue}</span>}
                  {item.metaPage && <span className="badge badge-ghost">{item.metaPage}</span>}
                </div>
              )}

              {/* title + tags */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                {item.tags && item.tags.length > 0 && (
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {item.tags.map((t, i) => (
                      <li key={i} className="badge badge-outline">{t}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* hover/focus overlay actions */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"
                aria-hidden="true"
                style={{
                  background: `
                    radial-gradient(220px 160px at 20% 20%, hsl(var(--p) / 0.18), transparent 60%),
                    radial-gradient(220px 160px at 80% 20%, hsl(var(--a) / 0.18), transparent 60%),
                    radial-gradient(220px 160px at 50% 80%, hsl(var(--s) / 0.18), transparent 60%)
                  `
                }}
              />
              {item.ctaLabel && (
                <div className="absolute inset-x-0 bottom-4 flex justify-center">
                  <span className="btn btn-primary min-h-[44px]">{item.ctaLabel}</span>
                </div>
              )}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
