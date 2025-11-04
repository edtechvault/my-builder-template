import React from 'react';
import { motion } from 'framer-motion';

type Item = { id: string; title: string; body?: string };
type Props = {
  heading?: string;
  items: Item[];
  direction?: 'up' | 'down' | 'left' | 'right';
  once?: boolean;
};

const dirMap = {
  up:    { x: 0, y: 24 },
  down:  { x: 0, y: -24 },
  left:  { x: 24, y: 0 },
  right: { x: -24, y: 0 },
};

export default function ScrollRevealSection({
  heading = 'Section',
  items,
  direction = 'up',
  once = true,
}: Props) {
  const offset = dirMap[direction];

  return (
    <section className="bg-base-100 text-base-content py-16">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8">{heading}</h2>
        <div className="space-y-6">
          {items.map((it, idx) => (
            <motion.article
              key={it.id}
              initial={{ opacity: 0, ...offset }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once, amount: 0.3 }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="rounded-xl bg-base-200 p-5"
            >
              <h3 className="text-lg font-semibold">{it.title}</h3>
              {it.body && <p className="opacity-80 mt-1">{it.body}</p>}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
