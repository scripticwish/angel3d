import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const HorizonGlow: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['28%', '-18%']);
  const opacity = useTransform(scrollYProgress, [0, 0.45, 0.85, 1], [0.2, 1, 0.9, 0.25]);

  return (
    <div ref={ref} className="relative h-28 sm:h-40 w-full overflow-hidden bg-glacial">
      <motion.div
        style={{ y, opacity }}
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[320px] w-[150vw] rounded-[100%]"
      >
        <div
          className="h-full w-full rounded-[100%]"
          style={{
            background:
              'radial-gradient(ellipse at 50% 60%, rgba(37,99,235,0.42) 0%, rgba(96,165,250,0.22) 34%, rgba(235,242,255,0.12) 60%, rgba(247,249,252,0) 78%)',
          }}
        />
      </motion.div>
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-cobalt/80">
        <span>ANGEL.TEAM // ICE ARCHITECTURE</span>
        <span className="hidden sm:inline">СЕЗОН 2026 — 2027</span>
      </div>
    </div>
  );
};
