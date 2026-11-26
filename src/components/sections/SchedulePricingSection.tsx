import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, Check, Clock, Sparkles, UserCheck } from 'lucide-react';
import {
  ARENA_META,
  ArenaKey,
  COACH_WEEKLY_SCHEDULES,
  DayColumn,
  GROUP_WEEKLY_SCHEDULE,
  PRICING_PLANS,
  SlotKind,
} from '../../data/schedule';
import { FadeIn } from '../ui/FadeIn';

interface SchedulePricingSectionProps {
  onOpenBooking: (presetProgram?: string) => void;
}

const ARENA_FILTERS: Array<'Все' | ArenaKey> = ['Все', 'ОКЕАНИС', 'РИО', 'МЕГА'];
const KIND_FILTERS: Array<{ key: 'all' | SlotKind; label: string }> = [
  { key: 'all', label: 'Все слоты' },
  { key: 'group-kids', label: 'Группы Дети' },
  { key: 'group-adults', label: 'Группы Взрослые' },
  { key: 'individual', label: 'Индивидуальные' },
];

export const SchedulePricingSection: React.FC<SchedulePricingSectionProps> = ({
  onOpenBooking,
}) => {
  const [mode, setMode] = useState<'groups' | 'coaches'>('groups');
  const [selectedCoachId, setSelectedCoachId] = useState<string>(COACH_WEEKLY_SCHEDULES[0].coachId);
  const [arenaFilter, setArenaFilter] = useState<'Все' | ArenaKey>('Все');
  const [kindFilter, setKindFilter] = useState<'all' | SlotKind>('all');

  const activeCoachBoard =
    COACH_WEEKLY_SCHEDULES.find((c) => c.coachId === selectedCoachId) || COACH_WEEKLY_SCHEDULES[0];

  const daysToRender: DayColumn[] =
    mode === 'groups' ? GROUP_WEEKLY_SCHEDULE : activeCoachBoard.days;

  return (
    <section id="schedule" className="relative bg-white py-20 sm:py-28 border-t border-ink/10">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-cobalt mb-3">
              04 // РАСПИСАНИЕ И ТАРИФЫ
            </div>
            <h2 className="font-display font-bold uppercase tracking-tight leading-[0.96] text-[clamp(2.4rem,5.4vw,4.8rem)] frost-text">
              РАСПИСАНИЕ <span className="text-cobalt">ЛЬДА</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-muted max-w-xl">
              Нажмите на любой свободный слот, чтобы мгновенно записаться на тренировку. Цвет
              ячейки соответствует ледовой арене.
            </p>
          </div>

          {/* Animated Mode Switcher */}
          <div className="relative inline-flex rounded-full bg-glacial border border-ink/10 p-1.5 self-start lg:self-auto">
            {[
              { id: 'groups' as const, label: 'Расписание групп', icon: CalendarDays },
              { id: 'coaches' as const, label: 'Тренерское расписание', icon: UserCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = mode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMode(tab.id)}
                  className={`relative z-10 inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider transition-colors ${
                    active ? 'text-white' : 'text-ink/70 hover:text-ink'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="scheduleModePill"
                      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                      className="absolute inset-0 -z-10 rounded-full frost-surface border border-white/25"
                    />
                  )}
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Controls Bar: Arena Legend Filters + Kind Filter + Coach Switcher */}
        <div className="mb-6 flex flex-col gap-4 rounded-3xl bg-glacial/80 border border-ink/10 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Arena Color Legend & Interactive Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-muted mr-1">
                Арены:
              </span>
              {ARENA_FILTERS.map((arena) => {
                const active = arenaFilter === arena;
                const dotColor = arena === 'Все' ? '#1E2E47' : ARENA_META[arena].dot;
                return (
                  <button
                    key={arena}
                    type="button"
                    onClick={() => setArenaFilter(arena)}
                    className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-all border ${
                      active
                        ? 'frost-surface text-white border-white/25'
                        : 'bg-white text-ink/80 border-ink/10 hover:border-cobalt/40'
                    }`}
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: active && arena === 'Все' ? '#7DD3FC' : dotColor }}
                    />
                    <span>{arena}</span>
                  </button>
                );
              })}
            </div>

            {/* Kind Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              {KIND_FILTERS.map((k) => {
                const active = kindFilter === k.key;
                return (
                  <button
                    key={k.key}
                    type="button"
                    onClick={() => setKindFilter(k.key)}
                    className={`rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-all ${
                      active
                        ? 'frost-btn text-white'
                        : 'bg-white/80 text-slate-muted hover:text-ink border border-ink/10'
                    }`}
                  >
                    {k.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Coach Selector Row (when in Coach mode) */}
          <AnimatePresence initial={false}>
            {mode === 'coaches' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden pt-3 border-t border-ink/10 flex flex-wrap items-center gap-2.5"
              >
                <span className="font-mono text-[11px] uppercase tracking-wider text-slate-muted mr-1">
                  Тренер:
                </span>
                {COACH_WEEKLY_SCHEDULES.map((board) => {
                  const active = board.coachId === selectedCoachId;
                  return (
                    <button
                      key={board.coachId}
                      type="button"
                      onClick={() => setSelectedCoachId(board.coachId)}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                        active
                          ? 'frost-btn text-white'
                          : 'bg-white text-ink border border-ink/10 hover:border-cobalt/40'
                      }`}
                    >
                      <span>{board.coachName}</span>
                      <span
                        className={`font-mono text-[10px] ${
                          active ? 'text-sky-100' : 'text-slate-muted'
                        }`}
                      >
                        ({board.role})
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 7-Day Weekly Schedule Grid */}
        <motion.div
          key={`${mode}-${selectedCoachId}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 overflow-x-auto pb-3"
        >
          <div className="min-w-[980px] rounded-[28px] border border-ink/12 bg-glacial/60 p-3 sm:p-4 shadow-sm">
            <div className="grid grid-cols-7 gap-2.5">
              {daysToRender.map((col, colIdx) => (
                <div
                  key={col.day}
                  className="flex flex-col rounded-2xl bg-white/80 border border-ink/8 overflow-hidden"
                >
                  {/* Day Header — Морозный стиль */}
                  <div className="frost-surface text-white px-3 py-3 text-center border-b border-white/15">
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-sky-300">
                      {col.short}
                    </div>
                    <div className="font-display font-semibold text-sm uppercase tracking-wide mt-0.5">
                      {col.day}
                    </div>
                  </div>

                  {/* Slots Column */}
                  <div className="flex-1 p-2 space-y-2">
                    {col.slots.length === 0 ? (
                      <div className="h-28 flex items-center justify-center text-center font-mono text-[10px] uppercase tracking-wider text-slate-muted/60 px-2">
                        Выходной / по запросу
                      </div>
                    ) : (
                      col.slots.map((slot, slotIdx) => {
                        const meta = ARENA_META[slot.arena];
                        const matchesArena = arenaFilter === 'Все' || slot.arena === arenaFilter;
                        const matchesKind = kindFilter === 'all' || slot.kind === kindFilter;
                        const isHighlighted = matchesArena && matchesKind;

                        return (
                          <motion.button
                            key={slot.id}
                            type="button"
                            disabled={!isHighlighted}
                            tabIndex={isHighlighted ? 0 : -1}
                            aria-disabled={!isHighlighted}
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{
                              opacity: isHighlighted ? 1 : 0.22,
                              scale: isHighlighted ? 1 : 0.97,
                            }}
                            transition={{
                              duration: 0.25,
                              delay: Math.min(0.25, colIdx * 0.02 + slotIdx * 0.015),
                            }}
                            whileHover={isHighlighted ? { y: -2, scale: 1.02 } : undefined}
                            onClick={() => {
                              if (!isHighlighted) return;
                              const title =
                                mode === 'coaches'
                                  ? `${activeCoachBoard.coachName} · ${col.day} (${slot.times.join(', ')}) · ${slot.arena}`
                                  : `${slot.label || 'Индивидуальная'} · ${col.day} (${slot.times.join(', ')}) · ${slot.arena}`;
                              onOpenBooking(title);
                            }}
                            className={`group w-full text-left rounded-xl border p-2.5 transition-all ${
                              isHighlighted
                                ? 'cursor-pointer'
                                : 'pointer-events-none cursor-default select-none'
                            } ${meta.bg} ${meta.border} ${meta.text}`}
                          >
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="inline-flex items-center gap-1 font-mono text-[9px] font-semibold uppercase tracking-wider opacity-80">
                                <span
                                  className="h-1.5 w-1.5 rounded-full"
                                  style={{ backgroundColor: meta.dot }}
                                />
                                {slot.arena}
                              </span>
                              <Sparkles className="w-3 h-3 opacity-0 group-hover:opacity-100 text-cobalt transition-opacity" />
                            </div>

                            <div className="space-y-0.5 font-mono text-[11px] font-medium leading-tight">
                              {slot.times.map((t) => (
                                <div key={t} className="flex items-center gap-1">
                                  <Clock className="w-2.5 h-2.5 opacity-50 shrink-0" />
                                  <span>{t}</span>
                                </div>
                              ))}
                            </div>

                            {slot.label && (
                              <div
                                className={`mt-1.5 inline-block rounded-md px-1.5 py-0.5 font-display font-semibold text-[10px] uppercase tracking-wide ${meta.badgeBg}`}
                              >
                                {slot.label}
                              </div>
                            )}
                          </motion.button>
                        );
                      })
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative overflow-hidden rounded-[32px] p-7 sm:p-8 flex flex-col justify-between border transition-transform duration-300 hover:-translate-y-1 ${
                plan.highlighted
                  ? 'frost-surface text-white border-white/25'
                  : 'bg-glacial frost-text border-ink/10'
              }`}
            >
              {plan.highlighted && (
                <div className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full bg-sky-300/20 blur-3xl" />
              )}

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display font-bold text-2xl uppercase tracking-tight">
                    {plan.name}
                  </h3>
                  {plan.badge && (
                    <span className="rounded-full bg-sky-400/20 border border-sky-300/35 text-sky-200 px-3 py-1 font-mono text-[10px] uppercase tracking-wider">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-display font-bold text-5xl tracking-tight">
                    {plan.price}
                  </span>
                </div>
                <div
                  className={`mt-1 font-mono text-xs uppercase tracking-wider ${
                    plan.highlighted ? 'text-sky-300' : 'text-slate-muted'
                  }`}
                >
                  {plan.period}
                </div>

                <p
                  className={`mt-4 text-sm leading-relaxed ${
                    plan.highlighted ? 'text-slate-200/90' : 'text-slate-muted'
                  }`}
                >
                  {plan.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm">
                      <Check
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          plan.highlighted ? 'text-sky-300' : 'text-cobalt'
                        }`}
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => onOpenBooking(plan.name)}
                className={`relative z-10 mt-8 w-full rounded-full py-3.5 font-mono text-xs uppercase tracking-[0.1em] transition-all ${
                  plan.highlighted
                    ? 'bg-white text-ink hover:bg-sky-200 font-semibold shadow-lg'
                    : 'frost-surface text-white border border-white/25 hover:border-sky-300/70'
                }`}
              >
                Выбрать тариф
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};