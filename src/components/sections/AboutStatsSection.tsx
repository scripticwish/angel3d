import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SCHOOL_STATS } from '../../data/stats';
import { StatItem } from '../../types';
import { AnimatedText } from '../ui/AnimatedText';
import { MagneticButton } from '../ui/MagneticButton';

interface AboutStatsSectionProps {
  onOpenBooking: (presetProgram?: string) => void;
}

const CountingStatRow: React.FC<{ stat: StatItem; index: number }> = ({ stat, index }) => {
  const rowRef = useRef<HTMLLIElement>(null);
  const inView = useInView(rowRef, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState(
    stat.staticText ? stat.staticText : stat.decimals ? `0.0${stat.suffix}` : `0${stat.suffix}`
  );

  useEffect(() => {
    if (!inView || stat.staticText) return;
    let raf = 0;
    const duration = 1400;
    const start = performance.now();

    const step = (now: number) => {
      const k = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      const val = stat.target * eased;
      if (stat.decimals) {
        setDisplay(`${val.toFixed(stat.decimals)}${stat.suffix}`);
      } else {
        setDisplay(`${Math.round(val)}${stat.suffix}`);
      }
      if (k < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat]);

  return (
    <motion.li
      ref={rowRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-8 first:pt-2"
    >
      {/* Animated Hairline */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.85, ease: [0.7, 0, 0.2, 1] }}
        style={{ transformOrigin: 'left' }}
        className="absolute top-0 left-0 right-0 h-px bg-ink/15"
      />

      <div className="font-display font-bold text-6xl sm:text-7xl lg:text-[84px] leading-none tracking-tight text-cobalt tabular-nums">
        {display}
      </div>
      <div className="mt-3 font-sans font-semibold text-lg text-ink">{stat.label}</div>
      <p className="mt-1 text-sm text-slate-muted leading-relaxed max-w-md">{stat.detail}</p>
    </motion.li>
  );
};

export const AboutStatsSection: React.FC<AboutStatsSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="about" className="relative bg-glacial py-20 sm:py-28">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Pinned Left Editorial Column */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-cobalt mb-4">
              01 // ФИЛОСОФИЯ ANGEL.TEAM
            </div>

            {/* Editorial Ice-Track Visual Box */}
            <div className="relative mb-8 h-52 sm:h-64 w-full overflow-hidden rounded-3xl bg-ink p-6 text-white shadow-xl">
              <svg
                viewBox="0 0 600 260"
                className="absolute inset-0 h-full w-full opacity-45"
                fill="none"
              >
                <path
                  d="M-20 210 C 120 40, 260 260, 410 70 C 480 -10, 560 90, 630 35"
                  stroke="#60A5FA"
                  strokeWidth="2.5"
                />
                <path
                  d="M-10 235 C 140 85, 290 250, 440 105 C 510 35, 580 120, 630 70"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                  strokeDasharray="6 6"
                />
                <circle cx="410" cy="70" r="7" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
              </svg>
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-blue-200">
                  <span>RINK TELEMETRY · 33 KEYPOINTS</span>
                  <span>ISU STANDARD</span>
                </div>
                <div>
                  <div className="font-serif italic text-2xl sm:text-3xl text-white">
                    «Красота рождается из чистой техники»
                  </div>
                  <div className="mt-1 font-mono text-xs text-slate-300">
                    Алиса Николаева, основатель Angel.Team
                  </div>
                </div>
              </div>
            </div>

            <h2 className="font-display font-bold uppercase tracking-tight leading-[0.95] text-[clamp(2.6rem,5.4vw,5.2rem)] text-ink">
              МЫ СТАВИМ
              <br />
              ТЕХНИКУ.
              <br />
              <span className="text-cobalt">МЫ РАСТИМ</span>
              <br />
              ЧЕМПИОНОВ.
            </h2>

            <div className="mt-8">
              <MagneticButton
                label="Познакомиться на льду"
                variant="ink"
                onClick={() => onOpenBooking('Пробная тренировка')}
              />
            </div>
          </div>

          {/* Scrolling Right Column: Scroll-Revealed Manifesto + 5 Counting Stats */}
          <div className="lg:col-span-6 lg:pt-8">
            <AnimatedText
              text="Angel.Team объединяет классическую школу фигурного катания, современную биомеханику прыжков и бережное отношение к каждому ученику. Мы учим не просто держаться на коньках — мы учим чувствовать ребро, музыку и свободу полёта."
              className="font-sans font-medium text-xl sm:text-2xl lg:text-[26px] leading-[1.45] text-ink mb-14"
            />

            <ul className="divide-y-0">
              {SCHOOL_STATS.map((stat, idx) => (
                <CountingStatRow key={stat.id} stat={stat} index={idx} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
