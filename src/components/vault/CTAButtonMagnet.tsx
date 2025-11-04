
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { MouseEvent } from 'react';
import { track } from '@/analytics/ga';

type Props = {
  label: string;
  href?: string;
  location?: string; // analytics location
};

export default function CTAButtonMagnet({ label, href = '#', location = 'cta' }: Props) {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const tx = useTransform(mx, v => v * 0.2);
  const ty = useTransform(my, v => v * 0.2);

  function onMove(e: MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - (rect.left + rect.width/2));
    my.set(e.clientY - (rect.top  + rect.height/2));
  }

  return (
    <motion.a
      href={href}
      onMouseMove={onMove}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ x: tx, y: ty }}
      className="btn btn-accent min-h-11 min-w-11"
      onClick={() => track('cta_clicked', { button_location: location, button_text: label })}
    >
      {label}
    </motion.a>
  );
}
