import type { Testimonial } from "../../types/Testimonial";

type Props = { testimonial: Testimonial };

export default function SpotlightTestimonialCard({ testimonial }: Props) {
  return (
    <figure className="relative group rounded-2xl bg-base-200 p-6 md:p-8 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: "radial-gradient(200px 200px at var(--x,50%) var(--y,50%), hsl(var(--a) / 0.18), transparent 60%)" }}
        aria-hidden="true"
      />
      <blockquote className="text-lg md:text-xl">“{testimonial.quote}”</blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        {testimonial.avatarUrl && <img src={testimonial.avatarUrl} alt="" className="h-10 w-10 rounded-full" loading="lazy" />}
        <div>
          <div className="font-semibold">{testimonial.author}</div>
          {testimonial.title && <div className="text-sm opacity-70">{testimonial.title}</div>}
        </div>
      </figcaption>
    </figure>
  );
}
