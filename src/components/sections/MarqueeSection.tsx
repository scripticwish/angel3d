import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PHOTO_ROW_1 = [
  { src: '/images/marquee-group-ice.jpg', label: 'Группы 2–6 детей' },
  { src: '/images/marquee-kids-coach.jpg', label: 'Обучение с 2 лет' },
  { src: '/images/marquee-medals-team.jpg', label: 'Старты с 3-го месяца', position: '50% 30%' },
  { src: '/images/show-girls-ice.jpg', label: 'Ледовые шоу и выступления', position: '50% 60%' },
  { src: '/images/team-blue-jackets.jpg', label: 'Команда Angel.Team', position: '50% 40%'},
];

const TEXT_ROW_2 = [
  'ОКЕАНИС',
  'РИО',
  'МЕГА',
  'ДИНАМО',
  'СОРМОВСКИЙ ПАРК',
  'ДЗЕРЖИНСК',
  'БОГОРОДСК',
];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const xRight = useTransform(scrollYProgress, [0, 1], [-180, 120]);
  const xLeft = useTransform(scrollYProgress, [0, 1], [120, -180]);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 py-12 sm:py-16 overflow-hidden border-y border-ink/10 bg-white"
    >
      <div className="flex flex-col gap-5">
        {/* Photo Strip Row */}
        <motion.div style={{ x: xRight }} className="flex gap-4 will-change-transform">
          {[...PHOTO_ROW_1, ...PHOTO_ROW_1].map((item, idx) => (
            <div
              key={`p1-${idx}`}
              className="relative shrink-0 w-[260px] sm:w-[320px] h-[180px] sm:h-[210px] rounded-3xl overflow-hidden border border-ink/10 shadow-sm group"
            >
              <img
                src={item.src}
                alt={item.label}
                loading="lazy"
                style={{ objectPosition: item.position }}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent flex items-end p-4">
                <span className="font-mono text-[11px] uppercase tracking-wider text-white">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Locations Row */}
        <motion.div style={{ x: xLeft }} className="flex gap-3 whitespace-nowrap will-change-transform">
          {[...TEXT_ROW_2, ...TEXT_ROW_2, ...TEXT_ROW_2].map((loc, idx) => (
            <div
              key={`loc-${idx}`}
              className="inline-flex items-center gap-3 rounded-2xl border border-cobalt/15 bg-ice-wash/75 px-5 py-3"
            >
              <span className="h-2 w-2 rounded-full bg-cobalt" />
              <span className="font-display font-bold text-lg sm:text-xl uppercase tracking-tight frost-text">
                {loc}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
