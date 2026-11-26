import React, { useRef, useState } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Calendar, CheckCircle2, Sparkles } from 'lucide-react';
import { PROGRAMS } from '../../data/programs';
import { ProgramItem } from '../../types';

interface ProgramsStackSectionProps {
  onOpenBooking: (presetProgram?: string) => void;
}

interface StackCardProps {
  program: ProgramItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  onSelect: (title: string) => void;
}

const FROST_CARD_STYLE = {
  background:
    'linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(186, 220, 255, 0.08) 50%, rgba(255, 255, 255, 0.05) 100%)',
  backdropFilter: 'blur(22px) saturate(140%)',
  WebkitBackdropFilter: 'blur(22px) saturate(140%)',
  boxShadow:
    '0 28px 70px rgba(8, 18, 36, 0.36), inset 0 1px 1px rgba(255, 255, 255, 0.45), inset 0 -1px 1px rgba(186, 230, 253, 0.15)',
};

const StackCard: React.FC<StackCardProps> = ({ program, index, total, progress, onSelect }) => {
  const targetScale = 1 - (total - 1 - index) * 0.035;
  const rangeStart = index / total;
  const scale = useTransform(progress, [rangeStart, 1], [1, targetScale]);

  return (
    <div
      className="sticky top-24 sm:top-28 mb-10 last:mb-0"
      style={{ paddingTop: `${index * 16}px` }}
    >
      <motion.article
        style={{ ...FROST_CARD_STYLE, scale, transformOrigin: 'top center' }}
        className="relative rounded-[44px] border border-white/25 text-white p-8 lg:p-10 overflow-hidden"
      >
        {/* Лёгкий инейный блик по верхнему краю карточки */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.75) 50%, transparent 95%)',
          }}
        />

        <div className="flex items-end justify-between gap-4 pb-6 border-b border-white/15">
          <div className="flex items-baseline gap-6">
            <span className="font-display font-bold text-7xl leading-none text-sky-300 drop-shadow-[0_0_20px_rgba(125,211,252,0.35)]">
              {program.number}
            </span>
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-sky-200">
                {program.tag}
              </div>
              <h3 className="mt-1 font-display font-bold text-4xl uppercase tracking-tight text-white">
                {program.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelect(program.title)}
            className="group inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 hover:border-white hover:bg-white hover:text-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.1em] text-white transition-all duration-300"
          >
            <span>Записаться</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-12 gap-8 items-stretch">
          <div className="col-span-7 flex flex-col justify-between">
            <div>
              <p className="text-base text-slate-100/90 leading-relaxed">{program.description}</p>

              <ul className="mt-6 space-y-2.5">
                {program.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-white/15 flex flex-wrap items-center gap-6 font-mono text-xs">
              <div className="flex items-center gap-2 text-sky-100/90">
                <Calendar className="w-4 h-4 text-sky-300" />
                <span>{program.schedule}</span>
              </div>
              <div className="ml-auto rounded-full bg-white/15 border border-white/20 px-4 py-1.5 text-white font-medium">
                {program.price}
              </div>
            </div>
          </div>

          <div className="col-span-5">
            <div className="relative h-full min-h-[290px] w-full rounded-[28px] overflow-hidden border border-white/25 group shadow-lg">
              <img
                src={program.image}
                alt={program.title}
                loading="lazy"
                className="h-full w-full object-cover object-[50%_20%] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18253A]/80 via-transparent to-transparent flex flex-col justify-between p-5">
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-white/85">
                  <span>ANGEL.TEAM // {program.number}</span>
                  <Sparkles className="w-4 h-4 text-sky-200" />
                </div>
                <div className="font-mono text-xs uppercase tracking-wider text-sky-200">
                  Возраст: {program.age}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
};

export const ProgramsStackSection: React.FC<ProgramsStackSectionProps> = ({ onOpenBooking }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const [activeMobile, setActiveMobile] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const handleMobileScroll = () => {
    const el = mobileTrackRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth * 0.86;
    const idx = Math.round(el.scrollLeft / Math.max(1, cardWidth));
    setActiveMobile(Math.max(0, Math.min(PROGRAMS.length - 1, idx)));
  };

  const scrollToMobileCard = (idx: number) => {
    const el = mobileTrackRef.current;
    if (!el) return;
    const target = el.children[idx] as HTMLElement | undefined;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      setActiveMobile(idx);
    }
  };

  return (
    <section
      id="programs"
      data-nav-theme="dark"
      className="relative z-20 rounded-t-[40px] sm:rounded-t-[56px] text-white py-20 sm:py-28 overflow-x-clip"
      style={{
        background:
          'linear-gradient(165deg, #1E2E47 0%, #273D5C 42%, #20324D 78%, #1A283F 100%)',
      }}
    >
      {/* Эффект инея: мягкие морозные засветы + кристаллическая зернистость */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-[40px] sm:rounded-t-[56px]">
        <div className="absolute -top-24 left-[10%] h-[420px] w-[420px] rounded-full bg-sky-300/20 blur-[110px]" />
        <div className="absolute top-[35%] right-[-6%] h-[480px] w-[480px] rounded-full bg-blue-300/15 blur-[120px]" />
        <div className="absolute bottom-[8%] left-[25%] h-[360px] w-[360px] rounded-full bg-cyan-200/15 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 260 260' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)' opacity='0.55'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1320px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-20">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-sky-300 mb-3">
              02 // НАПРАВЛЕНИЯ ПОДГОТОВКИ
            </div>
            <h2 className="font-display font-bold uppercase tracking-tight leading-[0.92] text-[clamp(2.8rem,7vw,6.2rem)] hero-gradient-light">
              ПРОГРАММЫ
              <br />
              ОБУЧЕНИЯ
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-slate-200/80 leading-relaxed">
            От первых шагов в 2 года до поступления в школу олимпийского резерва и вечерней группы
            любителей в ТРЦ «Океанис».
          </p>
        </div>

        {/* МОБИЛЬНАЯ ВЕРСИЯ: морозная свайп-карусель */}
        <div className="lg:hidden">
          <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
            {PROGRAMS.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => scrollToMobileCard(idx)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider border transition-colors ${
                  activeMobile === idx
                    ? 'bg-white text-ink border-white font-semibold'
                    : 'bg-white/10 border-white/20 text-sky-100'
                }`}
              >
                {p.number} · {p.age}
              </button>
            ))}
          </div>

          <div
            ref={mobileTrackRef}
            onScroll={handleMobileScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 scroll-smooth"
          >
            {PROGRAMS.map((program) => (
              <article
                key={program.id}
                style={FROST_CARD_STYLE}
                className="w-[86vw] max-w-[420px] shrink-0 snap-center rounded-[28px] border border-white/25 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-800">
                  <img
                    src={program.image}
                    alt={program.title}
                    loading="lazy"
                    className="h-full w-full object-cover object-[50%_20%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E2E47]/90 via-transparent to-transparent" />
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="rounded-full bg-[#18253A]/75 backdrop-blur-md border border-white/20 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-sky-200">
                      {program.number} // {program.age}
                    </span>
                    <span className="rounded-full bg-cobalt/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
                      {program.price}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-sky-200">
                      {program.tag}
                    </div>
                    <h3 className="mt-1 font-display font-bold text-2xl uppercase tracking-tight text-white">
                      {program.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-slate-100/90 leading-relaxed">
                      {program.description}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {program.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-white/90">
                          <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/15 space-y-3">
                    <div className="flex items-center gap-2 font-mono text-[11px] text-sky-100/90">
                      <Calendar className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                      <span>{program.schedule}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenBooking(program.title)}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-ink hover:bg-sky-200 py-3 px-5 font-mono text-xs font-semibold uppercase tracking-[0.1em] transition-colors"
                    >
                      <span>Записаться</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ДЕСКТОПНАЯ ВЕРСИЯ: морозный sticky-стек карточек */}
        <div ref={containerRef} className="hidden lg:block relative">
          {PROGRAMS.map((program, index) => (
            <StackCard
              key={program.id}
              program={program}
              index={index}
              total={PROGRAMS.length}
              progress={scrollYProgress}
              onSelect={(title) => onOpenBooking(title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};