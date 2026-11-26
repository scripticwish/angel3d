import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Compass, Flame, Medal, Sparkles } from 'lucide-react';
import { FadeIn } from '../ui/FadeIn';

interface SkatingPathSectionProps {
  onOpenBooking: (presetProgram?: string) => void;
}

type AgeKey = '2-6' | '7-14' | '15+';
type GoalKey = 'start' | 'sport' | 'grace';

interface PathRecommendation {
  title: string;
  arena: string;
  frequency: string;
  milestones: { period: string; elements: string; result: string }[];
}

const PATH_MATRIX: Record<`${AgeKey}-${GoalKey}`, PathRecommendation> = {
  '2-6-start': {
    title: 'Мини-группа «Первые шаги» (2–6 детей)',
    arena: 'ТЦ Океанис · ТЦ РИО · ТЦ МЕГА',
    frequency: '2–3 раза в неделю · Лёд + игровое ОФП',
    milestones: [
      { period: '1 месяц', elements: 'Правильная стойка, падения без страха, «ёлочка» и «фонарики»', result: 'Уверенное скольжение' },
      { period: '3 месяца', elements: '«Ласточка», перекидной прыжок, простое вращение на двух ногах', result: 'Первые соревнования и медаль' },
      { period: '6–12 месяцев', elements: 'Одинарные прыжки (сальхов, тулуп), скольжение на дугах', result: 'Готовность к юношеским разрядам' },
    ],
  },
  '2-6-sport': {
    title: 'Подготовка в школу олимпийского резерва',
    arena: 'ТЦ Океанис · Динамо · ТЦ РИО',
    frequency: '3–4 раза в неделю · Лёд + СФП',
    milestones: [
      { period: '1 месяц', elements: 'Баланс, глубокое ребро, уверенный толчок назад и вперёд', result: 'Спортивная осанка' },
      { period: '3 месяца', elements: 'Перекидной, волчок-подводящие, связки шагов под музыку', result: 'Первый квалификационный старт' },
      { period: '6–12 месяцев', elements: 'Стабильные одинарные прыжки и прокат первой программы', result: 'Поступление в СШОР' },
    ],
  },
  '2-6-grace': {
    title: 'Гармоничное развитие и ледовые шоу',
    arena: 'ТЦ Океанис · ТЦ МЕГА',
    frequency: '2 раза в неделю · Лёд + пластика',
    milestones: [
      { period: '1 месяц', elements: 'Свободное катание вперёд, торможение, змейка', result: 'Любовь ко льду' },
      { period: '3 месяца', elements: 'Спирали, кораблик, музыкальные связки', result: 'Участие в отчётном шоу' },
      { period: '6–12 месяцев', elements: 'Красивые вращения и лёгкие прыжки', result: 'Грация и крепкий иммунитет' },
    ],
  },
  '7-14-start': {
    title: 'Базовая группа для школьников',
    arena: 'ТЦ Океанис · ТЦ РИО · ТЦ МЕГА',
    frequency: '2–3 раза в неделю',
    milestones: [
      { period: '1 месяц', elements: 'Уверенный ход вперёд/назад, перебежки, дуги', result: 'Свобода на любом катке' },
      { period: '3 месяца', elements: 'Перекидной, сальхов, базовые вращения', result: 'Первые клубные старты' },
      { period: '6–12 месяцев', elements: 'Каскад одинарных прыжков и авторская программа', result: 'Юношеский разряд' },
    ],
  },
  '7-14-sport': {
    title: 'Спортивный трек: разряды и многооборотные прыжки',
    arena: 'ТЦ Океанис · Динамо · Дзержинск',
    frequency: '4–5 раз в неделю · Лёд + СФП',
    milestones: [
      { period: '1 месяц', elements: 'Аудит техники рёбер, ротаторы в зале, докрут', result: 'Чистая база' },
      { period: '3 месяца', elements: 'Аксель, лутц, комбинированные вращения', result: 'Выступление на турнирах' },
      { period: '6–12 месяцев', elements: 'Двойные прыжки и постановка соревновательной программы', result: 'Спортивный разряд' },
    ],
  },
  '7-14-grace': {
    title: 'Группа любителей 11+ (Средние + Старшие)',
    arena: 'ТРЦ «Океанис» · Вторник 19:00–20:00',
    frequency: '1 450 ₽ / тренировка (спеццена)',
    milestones: [
      { period: '1 месяц', elements: 'Глубокое скольжение, тройки, мягкое колено', result: 'Эстетика катания' },
      { period: '3 месяца', elements: 'Вращения, спирали, лёгкие одинарные прыжки', result: 'Уверенный прокат под музыку' },
      { period: '6–12 месяцев', elements: 'Показательный номер и любительские фестивали', result: 'Яркое хобби и команда' },
    ],
  },
  '15+-start': {
    title: 'Взрослые с нуля и продолжающие',
    arena: 'ТРЦ «Океанис» · ТЦ РИО',
    frequency: '2 раза в неделю · Вечерние слоты',
    milestones: [
      { period: '1 месяц', elements: 'Снятие страха льда, уверенные дуги и торможение', result: 'Комфорт на коньках' },
      { period: '3 месяца', elements: 'Перебежки вперёд/назад, тройки, базовое вращение', result: 'Плавное красивое скольжение' },
      { period: '6–12 месяцев', elements: 'Первые прыжки и собственный музыкальный номер', result: 'Любительский фестиваль' },
    ],
  },
  '15+-sport': {
    title: 'Взрослые любители PRO + Индивидуальные',
    arena: 'ТРЦ «Океанис» · 7 локаций',
    frequency: '2–3 раза в неделю · Лёд + СФП',
    milestones: [
      { period: '1 месяц', elements: 'Коррекция рёбер, скорость и центровка вращений', result: 'Рост качества катания' },
      { period: '3 месяца', elements: 'Одинарные прыжки, аксель, либела и волчок', result: 'Готовность к стартам Adult' },
      { period: '6–12 месяцев', elements: 'Соревновательная программа по правилам ISU Adult', result: 'Призовые места на стартах' },
    ],
  },
  '15+-grace': {
    title: 'Группа любителей 11+ / 16–22 в ТРЦ «Океанис»',
    arena: 'ТРЦ «Океанис» · Вторник 19:00–20:00',
    frequency: '1 450 ₽ / занятие (вместо 2 300 ₽)',
    milestones: [
      { period: '1 месяц', elements: 'Красивые руки, осанка, скольжение по дугам', result: 'Кайф от каждого выхода на лёд' },
      { period: '3 месяца', elements: 'Спирали, вращения и музыкальные дорожки шагов', result: 'Яркие видео и фото со льда' },
      { period: '6–12 месяцев', elements: 'Участие в ледовых шоу и комьюнити Angel.Team', result: 'Грация и уверенность' },
    ],
  },
};

export const SkatingPathSection: React.FC<SkatingPathSectionProps> = ({ onOpenBooking }) => {
  const [age, setAge] = useState<AgeKey>('2-6');
  const [goal, setGoal] = useState<GoalKey>('start');

  const rec = PATH_MATRIX[`${age}-${goal}`];

  return (
    <section className="relative bg-glacial py-20 sm:py-28 border-t border-ink/10">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-cobalt mb-3">
              ИНТЕРАКТИВНЫЙ НАВИГАТОР
            </div>
            <h2 className="font-display font-bold uppercase tracking-tight leading-[0.95] text-[clamp(2.4rem,5.2vw,4.6rem)] frost-text">
              ВАШ ПУТЬ <span className="font-serif italic font-semibold normal-case text-cobalt">на льду</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-slate-muted leading-relaxed">
            Выберите возраст и цель — покажем реальный маршрут прогресса на 1, 3 и 12 месяцев и
            подходящую группу.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Panel */}
          <div className="lg:col-span-5 rounded-[32px] bg-white border border-ink/10 p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-7">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-muted mb-3">
                  1. Возраст ученика
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { key: '2-6' as const, label: '2–6 лет' },
                    { key: '7-14' as const, label: '7–14 лет' },
                    { key: '15+' as const, label: '15+ / Взр' },
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setAge(item.key)}
                      className={`rounded-2xl py-3.5 font-mono text-xs uppercase tracking-wider border transition-all ${
                        age === item.key
                          ? 'frost-surface text-white border-white/25'
                          : 'bg-glacial text-ink/80 border-ink/10 hover:border-cobalt/40'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-muted mb-3">
                  2. Главная цель
                </div>
                <div className="space-y-2.5">
                  {[
                    { key: 'start' as const, label: 'Встать на коньки с нуля', icon: Compass },
                    { key: 'sport' as const, label: 'Соревнования, разряды и СШОР', icon: Medal },
                    { key: 'grace' as const, label: 'Грация, шоу и катание для души', icon: Flame },
                  ].map((item) => {
                    const Icon = item.icon;
                    const active = goal === item.key;
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setGoal(item.key)}
                        className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left border transition-all ${
                          active
                            ? 'frost-btn text-white'
                            : 'bg-glacial text-ink border-ink/10 hover:border-cobalt/40'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-ink/10">
              <button
                type="button"
                onClick={() => onOpenBooking(rec.title)}
                className="group w-full inline-flex items-center justify-center gap-2.5 rounded-full frost-btn text-white py-3.5 px-6 font-mono text-xs uppercase tracking-[0.1em] transition-all"
              >
                <span>Записаться в эту группу</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Dynamic Result Roadmap — Морозный стиль */}
          <div className="lg:col-span-7 frost-surface rounded-[32px] border border-white/25 text-white p-6 sm:p-9 flex flex-col justify-between overflow-hidden relative">
            {/* Морозные засветы на фоне */}
            <div className="pointer-events-none absolute -top-20 right-0 h-56 w-56 rounded-full bg-sky-300/20 blur-[80px]" />
            <div className="pointer-events-none absolute bottom-0 left-10 h-44 w-44 rounded-full bg-blue-300/15 blur-[70px]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={`${age}-${goal}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/15">
                  <div>
                    <div className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-sky-300">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Рекомендованный маршрут</span>
                    </div>
                    <h3 className="mt-1.5 font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight">
                      {rec.title}
                    </h3>
                  </div>
                  <div className="text-right font-mono text-xs text-slate-200">
                    <div>{rec.arena}</div>
                    <div className="text-sky-300 mt-0.5">{rec.frequency}</div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {rec.milestones.map((m, idx) => (
                    <div
                      key={m.period}
                      className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="font-mono text-xs uppercase tracking-[0.14em] text-sky-200 bg-sky-400/20 border border-sky-300/25 inline-block px-2.5 py-1 rounded-full">
                          0{idx + 1} · {m.period}
                        </div>
                        <p className="mt-3 text-sm text-slate-100/90 leading-relaxed">{m.elements}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-white/15 font-mono text-[11px] uppercase tracking-wider text-sky-300">
                        Итог: {m.result}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};