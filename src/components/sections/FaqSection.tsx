import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { FadeIn } from '../ui/FadeIn';

const FAQ_ITEMS = [
  {
    q: 'С какого возраста можно начать заниматься в Angel.Team?',
    a: 'Мы принимаем детей от 2 лет! Для малышей проходят мягкие занятия в мини-группах от 2 до 6 человек, где ребёнок без страха привыкает ко льду в игровой форме. Также у нас есть группы для школьников, любителей 11+ и взрослых.',
  },
  {
    q: 'Нужны ли сразу профессиональные фигурные коньки?',
    a: 'На первую пробную тренировку можно прийти в любых удобных коньках или взять их в прокат на арене. После занятия тренер посмотрит уровень и подскажет, какую модель и жёсткость ботинка лучше выбрать для дальнейшего прогресса.',
  },
  {
    q: 'Когда ребёнок сможет участвовать в первых соревнованиях?',
    a: 'При регулярных тренировках наши ученики выходят на первые соревнования уже с 3-го месяца обучения. Мы также готовим детей к поступлению в школу олимпийского резерва (СШОР).',
  },
  {
    q: 'Как одеться на первую тренировку на льду?',
    a: 'Одежда должна быть тёплой, эластичной и не сковывать движения: термобельё или лосины, флисовая кофта/жилетка, тонкие перчатки и высокие носки. Для малышей 2–5 лет рекомендуем лёгкую защиту коленей и локтей.',
  },
  {
    q: 'На каких ледовых аренах проходят занятия?',
    a: 'У школы 7 локаций: ТРЦ «Океанис», ТЦ «РИО», ТЦ «МЕГА», «Динамо», Сормовский парк, а также площадки в г. Дзержинск и г. Богородск. Вы можете выбрать ближайшую к дому арену.',
  },
  {
    q: 'Можно ли прийти в группу любителей 11+ или взрослому с нуля?',
    a: 'Конечно! В ТРЦ «Океанис» по вторникам (19:00–20:00) открыт набор в группу любителей 11+ (сейчас занимаются девушки 16–22 лет) по спеццене 1 450 ₽ вместо 2 300 ₽. Также доступны индивидуальные тренировки в удобное время.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-white py-20 sm:py-28 border-t border-ink/10">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <FadeIn className="mb-12">
          <div className="font-mono text-xs uppercase tracking-[0.14em] text-cobalt mb-3">
            05 // ЧАСТЫЕ ВОПРОСЫ
          </div>
          <h2 className="font-display font-bold uppercase tracking-tight leading-[0.95] text-[clamp(2.4rem,5vw,4.4rem)] frost-text">
            ОТВЕТЫ НА <span className="text-cobalt">ВОПРОСЫ</span>
          </h2>
        </FadeIn>

        <div className="divide-y divide-ink/12 border-y border-ink/12">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={item.q} className="py-5">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left group"
                >
                  <span className="font-sans font-semibold text-base sm:text-lg text-ink group-hover:text-cobalt transition-colors">
                    {item.q}
                  </span>
                  <span
                    className={`h-9 w-9 shrink-0 rounded-full border border-ink/15 flex items-center justify-center transition-all duration-300 ${
                      isOpen ? 'bg-ink text-white rotate-45 border-ink' : 'bg-glacial text-ink'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 pr-10 text-sm sm:text-base text-slate-muted leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
