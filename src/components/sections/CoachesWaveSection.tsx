import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowLeft, ArrowRight, Award, Check, MapPin, Pause, Play, Sparkles, X } from 'lucide-react';
import { COACHES } from '../../data/coaches';
import { CoachItem } from '../../types';

interface CoachesWaveSectionProps {
  onOpenBooking: (presetProgram?: string) => void;
}

export const CoachesWaveSection: React.FC<CoachesWaveSectionProps> = ({ onOpenBooking }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, { amount: 0.12 });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [openedCoach, setOpenedCoach] = useState<CoachItem | null>(null);

  const total = COACHES.length;

  const goNext = () => setActiveIndex((i) => (i + 1) % total);
  const goPrev = () => setActiveIndex((i) => (i - 1 + total) % total);

  // Auto-close opened coach card if user scrolls away from #coaches!
  useEffect(() => {
    if (!isSectionInView && openedCoach) {
      setOpenedCoach(null);
    }
  }, [isSectionInView, openedCoach]);

  useEffect(() => {
    if (!isPlaying || openedCoach) return;
    const timer = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % total);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [isPlaying, openedCoach, total, activeIndex]);

  const getRingStyle = (idx: number) => {
    const isOpenedThis = openedCoach?.id === COACHES[idx].id;

    if (openedCoach) {
      if (isOpenedThis) {
        return {
          x: '-16vw',
          y: 12,
          scale: 1.22,
          opacity: 1,
          filter: 'blur(0px)',
          zIndex: 40,
        };
      }
      return {
        x: `${(idx - activeIndex) * 45}vw`,
        y: -40,
        scale: 0.65,
        opacity: 0,
        filter: 'blur(10px)',
        zIndex: 5,
      };
    }

    let diff = (idx - activeIndex + total) % total;
    if (diff > total / 2) diff -= total;
    const absDiff = Math.abs(diff);

    const xVw =
      absDiff === 0 ? 0 : absDiff === 1 ? Math.sign(diff) * 28 : Math.sign(diff) * 44;
    const scale = absDiff === 0 ? 1.06 : absDiff === 1 ? 0.88 : 0.72;
    const yOffset = absDiff === 0 ? 0 : absDiff === 1 ? -18 : -38;
    const blur = absDiff === 0 ? 0 : absDiff === 1 ? 1.8 : 4.2;
    const opacity = absDiff === 0 ? 1 : absDiff === 1 ? 0.95 : 0.72;
    const zIndex = 30 - absDiff * 8;

    return {
      x: `${xVw}vw`,
      y: yOffset,
      scale,
      opacity,
      filter: `blur(${blur}px)`,
      zIndex,
    };
  };

  return (
    <section
      id="coaches"
      ref={sectionRef}
      className="relative z-30 bg-white text-ink border-t border-ink/10 overflow-hidden min-h-screen flex flex-col justify-between pt-24 pb-12"
    >
      
      {/* Top Header — completely disappears (opacity: 0) when a coach is selected */}
      <motion.div
        animate={{
          opacity: openedCoach ? 0 : 1,
          y: openedCoach ? -16 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1440px] w-full mx-auto px-6 sm:px-12 relative z-10 pointer-events-none"
      >
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-cobalt mb-2">
          03 // ВСЕ ДЕЙСТВУЮЩИЕ ТРЕНЕРЫ — КМС
        </div>
        <h2 className="font-display font-bold uppercase tracking-tight leading-[1.15] text-[clamp(2.4rem,4.8vw,4.4rem)] frost-text">
          ТРЕНЕРСКИЙ <span className="font-serif italic font-semibold normal-case text-cobalt">штаб</span>
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-muted max-w-md">
          Нажмите на центрального тренера, чтобы приблизить и открыть описание, или кликните по
          соседним, чтобы повернуть подиум.
        </p>
      </motion.div>

      {/* FULL-SCREEN WIDTH 3D Ring Cutout Stage */}
      <div className="relative my-4 h-[460px] sm:h-[540px] w-full flex items-end justify-center overflow-visible">
        {COACHES.map((coach, idx) => {
          const style = getRingStyle(idx);
          const isFront = idx === activeIndex;
          const isHidden = Boolean(openedCoach && openedCoach.id !== coach.id);

          return (
            <motion.button
              key={coach.id}
              type="button"
              onClick={() => {
                if (openedCoach?.id === coach.id) {
                  setOpenedCoach(null);
                } else if (isFront) {
                  setOpenedCoach(coach);
                  setIsPlaying(false);
                } else {
                  setActiveIndex(idx);
                  setIsPlaying(false);
                }
              }}
              animate={{
                x: style.x,
                y: style.y,
                scale: style.scale,
                opacity: style.opacity,
                filter: style.filter,
              }}
              transition={{
                type: 'spring',
                stiffness: 92,
                damping: 20,
              }}
              style={{
                zIndex: style.zIndex,
                transformOrigin: '50% 100%',
                pointerEvents: isHidden ? 'none' : 'auto',
              }}
              className="group absolute bottom-6 w-[280px] sm:w-[340px] flex flex-col items-center cursor-pointer focus:outline-none bg-transparent border-0 p-0"
            >
              {/* Contact Floor Shadow */}
              <div
                className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 w-[135%] h-7 rounded-full blur-[3px]"
                style={{
                  background:
                    'radial-gradient(closest-side, rgba(20,16,12,0.28), rgba(20,16,12,0.12) 48%, rgba(20,16,12,0.03) 76%, transparent)',
                }}
              />
              
              <img
                src={coach.image}
                alt={coach.name}
                draggable={false}
                style={{
                  transform:
                    coach.imageScale || coach.imageOffsetY
                      ? `translateY(${coach.imageOffsetY ?? 0}px) scale(${coach.imageScale ?? 1})`
                      : undefined,
                  transformOrigin: '50% 100%',
                }}
                className="relative h-[350px] sm:h-[450px] w-auto max-w-[300px] sm:max-w-[360px] object-contain object-bottom select-none pointer-events-none"
              />

              {!openedCoach && (
                <span
                  className={`mt-2 whitespace-nowrap text-center rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-all duration-300 shadow-lg ${
                    isFront
                      ? 'frost-surface text-white border border-white/25 opacity-95 group-hover:border-sky-300/80'
                      : 'bg-white/90 text-ink border border-ink/15 opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {coach.name} {isFront ? '· Подробнее' : ''}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Section-Anchored Frosted-Glass Profile Card (position: absolute — stays strictly inside #coaches!) */}
      <AnimatePresence>
        {openedCoach && (
          <motion.aside
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 30, scale: 0.96 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-24 right-4 sm:right-10 z-50 w-[calc(100%-2rem)] max-w-md max-h-[calc(100%-7rem)] overflow-y-auto rounded-[32px] bg-white/55 backdrop-blur-xl border border-ink/10 shadow-[0_24px_70px_rgba(14,17,22,0.12)] p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-ink/10">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-cobalt font-semibold">
                  Профиль тренера
                </span>
                <button
                  type="button"
                  onClick={() => setOpenedCoach(null)}
                  aria-label="Закрыть профиль"
                  className="h-9 w-9 rounded-full border border-ink/15 bg-white/70 hover:bg-ink hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-5 space-y-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-cobalt">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{openedCoach.rank}</span>
                  </div>
                  <h3 className="mt-1 font-display font-bold text-3xl sm:text-4xl uppercase tracking-tight frost-text">
                    {openedCoach.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-muted">{openedCoach.role}</p>
                </div>

                <p className="text-sm text-ink/85 leading-relaxed">{openedCoach.bio}</p>

                <div className="divide-y divide-ink/10 border-y border-ink/10">
                  <div className="py-3.5 flex items-start gap-3">
                    <Award className="w-4 h-4 text-cobalt shrink-0 mt-0.5" />
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-muted">
                        Специализация
                      </div>
                      <div className="mt-0.5 text-sm font-medium text-ink">
                        {openedCoach.specialization}
                      </div>
                    </div>
                  </div>

                  <div className="py-3.5 flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-cobalt shrink-0 mt-0.5" />
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-muted">
                        Локации и опыт
                      </div>
                      <div className="mt-0.5 text-sm font-medium text-ink">
                        {openedCoach.experience}
                      </div>
                    </div>
                  </div>

                  <div className="py-3.5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-muted mb-2">
                      Ключевые достижения
                    </div>
                    <ul className="space-y-1.5">
                      {openedCoach.achievements.map((ach) => (
                        <li key={ach} className="flex items-start gap-2 text-sm text-ink/85">
                          <span className="h-4 w-4 rounded-full bg-ice-wash text-cobalt flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3" />
                          </span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <button
                type="button"
                onClick={() => {
                  const name = openedCoach.name;
                  setOpenedCoach(null);
                  onOpenBooking(`Тренировка с тренером: ${name}`);
                }}
                className="group w-full flex items-center justify-center gap-3 rounded-full frost-btn text-white py-3.5 px-6 font-mono text-xs uppercase tracking-[0.12em] transition-all duration-300"
              >
                <span>Записаться к тренеру</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Full-Width Runway Controls Row */}
      <motion.div
        animate={{ opacity: openedCoach ? 0 : 1, pointerEvents: openedCoach ? 'none' : 'auto' }}
        transition={{ duration: 0.3 }}
        className="max-w-[1440px] w-full mx-auto px-6 sm:px-12 relative z-20 flex items-center gap-3 sm:gap-5 pt-2"
      >
        <button
          type="button"
          onClick={() => {
            goPrev();
            setIsPlaying(false);
          }}
          aria-label="Предыдущий тренер"
          className="h-11 w-11 shrink-0 rounded-full border border-ink/15 bg-white hover:bg-ink hover:text-white flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex-1 flex items-center gap-2 overflow-hidden">
          {COACHES.map((coach, idx) => {
            const isCurrent = idx === activeIndex;
            const isPast = idx < activeIndex;
            return (
              <button
                key={coach.id}
                type="button"
                onClick={() => {
                  setActiveIndex(idx);
                  setIsPlaying(false);
                }}
                className={`flex flex-col gap-1.5 text-left transition-all duration-500 ${
                  isCurrent ? 'flex-[2.6] text-ink' : 'flex-1 text-slate-muted hover:text-ink'
                }`}
              >
                <div className="h-[2px] w-full bg-ink/15 overflow-hidden rounded-full">
                  {isCurrent ? (
                    <motion.div
                      key={`${activeIndex}-${isPlaying}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: isPlaying ? 5 : 0.4, ease: 'linear' }}
                      style={{ transformOrigin: 'left' }}
                      className="h-full w-full bg-cobalt"
                    />
                  ) : (
                    <div
                      className={`h-full w-full bg-ink/40 transition-transform ${
                        isPast ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  )}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-wider truncate">
                  0{idx + 1}
                  {isCurrent && <span className="ml-2 font-semibold">{coach.name}</span>}
                </div>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setIsPlaying((p) => !p)}
          aria-label={isPlaying ? 'Пауза' : 'Автопрокрутка'}
          className="h-11 w-11 shrink-0 rounded-full border border-ink/15 bg-white hover:bg-ink hover:text-white flex items-center justify-center transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <button
          type="button"
          onClick={() => {
            goNext();
            setIsPlaying(false);
          }}
          aria-label="Следующий тренер"
          className="h-11 w-11 shrink-0 rounded-full border border-ink/15 bg-white hover:bg-ink hover:text-white flex items-center justify-center transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </section>
  );
};
