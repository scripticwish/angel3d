import { PricingPlan } from '../types';

export type ArenaKey = 'ОКЕАНИС' | 'РИО' | 'МЕГА';
export type SlotKind = 'group-kids' | 'group-adults' | 'individual';

export interface WeeklyCellSlot {
  id: string;
  times: string[];
  label?: string;
  arena: ArenaKey;
  kind: SlotKind;
}

export interface DayColumn {
  day: string;
  short: string;
  slots: WeeklyCellSlot[];
}

export interface CoachScheduleBoard {
  coachId: string;
  coachName: string;
  role: string;
  days: DayColumn[];
}

export const ARENA_META: Record<
  ArenaKey,
  {
    name: ArenaKey;
    dot: string;
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
  }
> = {
  ОКЕАНИС: {
    name: 'ОКЕАНИС',
    dot: '#38BDF8',
    bg: 'bg-sky-50/90 hover:bg-sky-100/90',
    border: 'border-sky-200/90',
    text: 'text-sky-950',
    badgeBg: 'bg-sky-500/15 text-sky-800',
  },
  РИО: {
    name: 'РИО',
    dot: '#F59E0B',
    bg: 'bg-amber-50/90 hover:bg-amber-100/90',
    border: 'border-amber-200/90',
    text: 'text-amber-950',
    badgeBg: 'bg-amber-500/15 text-amber-800',
  },
  МЕГА: {
    name: 'МЕГА',
    dot: '#EC4899',
    bg: 'bg-rose-50/90 hover:bg-rose-100/90',
    border: 'border-rose-200/90',
    text: 'text-rose-950',
    badgeBg: 'bg-rose-500/15 text-rose-800',
  },
};

export const GROUP_WEEKLY_SCHEDULE: DayColumn[] = [
  {
    day: 'Понедельник',
    short: 'ПН',
    slots: [
      { id: 'g-mon-1', times: ['10:00–11:00', '11:00–12:00'], arena: 'ОКЕАНИС', kind: 'individual' },
      { id: 'g-mon-2', times: ['12:00–13:00', '13:00–14:00'], arena: 'ОКЕАНИС', kind: 'individual' },
      { id: 'g-mon-3', times: ['13:45–14:45', '15:15–16:15'], arena: 'РИО', kind: 'individual' },
      { id: 'g-mon-4', times: ['14:30–15:30', '15:30–16:30'], arena: 'ОКЕАНИС', kind: 'individual' },
      { id: 'g-mon-5', times: ['16:15–17:15', '17:15–18:15'], arena: 'РИО', kind: 'individual' },
      { id: 'g-mon-6', times: ['18:00–19:00', '19:45–20:45'], arena: 'ОКЕАНИС', kind: 'individual' },
      { id: 'g-mon-7', times: ['21:00–22:00'], arena: 'ОКЕАНИС', kind: 'individual' },
    ],
  },
  {
    day: 'Вторник',
    short: 'ВТ',
    slots: [
      { id: 'g-tue-1', times: ['10:00–11:00', '11:00–12:00'], arena: 'ОКЕАНИС', kind: 'individual' },
      { id: 'g-tue-2', times: ['12:00–13:00', '13:00–14:00'], arena: 'ОКЕАНИС', kind: 'individual' },
      { id: 'g-tue-3', times: ['14:30–15:30', '15:30–16:30'], arena: 'ОКЕАНИС', kind: 'individual' },
      { id: 'g-tue-4', times: ['15:30–16:30'], arena: 'МЕГА', kind: 'individual' },
      { id: 'g-tue-5', times: ['18:00–19:00'], label: 'ГРУППА ДЕТИ', arena: 'МЕГА', kind: 'group-kids' },
      { id: 'g-tue-6', times: ['19:15–20:15'], arena: 'МЕГА', kind: 'individual' },
      { id: 'g-tue-7', times: ['21:00–22:00'], label: 'ГРУППА ВЗР', arena: 'ОКЕАНИС', kind: 'group-adults' },
    ],
  },
  {
    day: 'Среда',
    short: 'СР',
    slots: [
      { id: 'g-wed-1', times: ['10:00–11:00'], arena: 'ОКЕАНИС', kind: 'individual' },
      { id: 'g-wed-2', times: ['10:15–11:00'], arena: 'РИО', kind: 'individual' },
      { id: 'g-wed-3', times: ['11:00–11:50'], arena: 'ОКЕАНИС', kind: 'individual' },
      { id: 'g-wed-4', times: ['11:45–12:45'], arena: 'РИО', kind: 'individual' },
      { id: 'g-wed-5', times: ['15:00–16:00', '15:30–16:30'], arena: 'ОКЕАНИС', kind: 'individual' },
      { id: 'g-wed-6', times: ['18:00–19:00', '21:00–22:00'], arena: 'ОКЕАНИС', kind: 'individual' },
      { id: 'g-wed-7', times: ['19:00–20:00'], label: 'ГРУППА ДЕТИ', arena: 'ОКЕАНИС', kind: 'group-kids' },
    ],
  },
  {
    day: 'Четверг',
    short: 'ЧТ',
    slots: [
      { id: 'g-thu-1', times: ['10:00–11:00', '11:00–12:00'], arena: 'ОКЕАНИС', kind: 'individual' },
      { id: 'g-thu-2', times: ['11:15–12:15'], label: 'ГРУППА ДЕТИ', arena: 'ОКЕАНИС', kind: 'group-kids' },
      { id: 'g-thu-3', times: ['13:45–14:45', '15:15–16:15'], arena: 'РИО', kind: 'individual' },
      { id: 'g-thu-4', times: ['16:15–17:15', '17:15–18:15'], arena: 'РИО', kind: 'individual' },
      { id: 'g-thu-5', times: ['18:00–19:00', '19:15–20:15'], arena: 'МЕГА', kind: 'individual' },
      { id: 'g-thu-6', times: ['19:45–20:45'], label: 'ГРУППА ДЕТИ', arena: 'РИО', kind: 'group-kids' },
      { id: 'g-thu-7', times: ['21:00–22:00'], arena: 'ОКЕАНИС', kind: 'individual' },
    ],
  },
  {
    day: 'Пятница',
    short: 'ПТ',
    slots: [
      { id: 'g-fri-1', times: ['16:30–17:30'], arena: 'ОКЕАНИС', kind: 'individual' },
      { id: 'g-fri-2', times: ['18:00–19:00'], arena: 'ОКЕАНИС', kind: 'individual' },
      { id: 'g-fri-3', times: ['19:45–20:45'], arena: 'РИО', kind: 'individual' },
      { id: 'g-fri-4', times: ['21:00–22:00'], label: 'ГРУППА ВЗР', arena: 'ОКЕАНИС', kind: 'group-adults' },
    ],
  },
  {
    day: 'Суббота',
    short: 'СБ',
    slots: [
      { id: 'g-sat-1', times: ['10:00–11:00', '10:15–11:15'], arena: 'РИО', kind: 'individual' },
      { id: 'g-sat-2', times: ['11:15–12:15'], label: 'ГРУППА ДЕТИ', arena: 'РИО', kind: 'group-kids' },
      { id: 'g-sat-3', times: ['12:00–13:00', '13:00–14:00'], arena: 'ОКЕАНИС', kind: 'individual' },
      { id: 'g-sat-4', times: ['13:45–14:45'], label: 'ГРУППА ВЗР', arena: 'РИО', kind: 'group-adults' },
      { id: 'g-sat-5', times: ['14:30–15:30', '15:30–16:30'], arena: 'ОКЕАНИС', kind: 'individual' },
      { id: 'g-sat-6', times: ['18:00–19:00', '20:00–21:00'], arena: 'ОКЕАНИС', kind: 'individual' },
      { id: 'g-sat-7', times: ['21:00–22:00'], arena: 'ОКЕАНИС', kind: 'individual' },
    ],
  },
  {
    day: 'Воскресенье',
    short: 'ВС',
    slots: [
      { id: 'g-sun-1', times: ['10:00–11:00', '11:00–12:00'], arena: 'ОКЕАНИС', kind: 'individual' },
      { id: 'g-sun-2', times: ['11:30–12:30'], label: 'ГРУППА ДЕТИ', arena: 'МЕГА', kind: 'group-kids' },
      { id: 'g-sun-3', times: ['12:00–13:00', '13:00–14:00'], arena: 'ОКЕАНИС', kind: 'individual' },
      { id: 'g-sun-4', times: ['14:30–15:30', '15:30–16:30'], arena: 'ОКЕАНИС', kind: 'individual' },
      { id: 'g-sun-5', times: ['18:00–19:00', '20:00–21:00'], arena: 'ОКЕАНИС', kind: 'individual' },
      { id: 'g-sun-6', times: ['21:00–22:00'], arena: 'ОКЕАНИС', kind: 'individual' },
    ],
  },
];

export const COACH_WEEKLY_SCHEDULES: CoachScheduleBoard[] = [
  {
    coachId: 'alisa',
    coachName: 'Николаева Алиса',
    role: 'ОКЕАНИС · РИО · МЕГА',
    days: [
      {
        day: 'Понедельник',
        short: 'ПН',
        slots: [
          { id: 'a-mon-1', times: ['10:00–11:00', '11:00–12:00'], arena: 'ОКЕАНИС', kind: 'individual' },
          { id: 'a-mon-2', times: ['12:00–13:00', '13:00–14:00'], arena: 'ОКЕАНИС', kind: 'individual' },
          { id: 'a-mon-3', times: ['14:30–15:30', '15:30–16:30'], arena: 'ОКЕАНИС', kind: 'individual' },
          { id: 'a-mon-4', times: ['18:00–19:00', '21:00–22:00'], arena: 'ОКЕАНИС', kind: 'individual' },
        ],
      },
      {
        day: 'Вторник',
        short: 'ВТ',
        slots: [
          { id: 'a-tue-1', times: ['10:00–11:00', '11:00–12:00'], arena: 'ОКЕАНИС', kind: 'individual' },
          { id: 'a-tue-2', times: ['12:00–13:00', '13:00–14:00'], arena: 'ОКЕАНИС', kind: 'individual' },
          { id: 'a-tue-3', times: ['15:30–16:30'], arena: 'МЕГА', kind: 'individual' },
          { id: 'a-tue-4', times: ['18:00–19:00'], label: 'ГРУППА', arena: 'МЕГА', kind: 'group-kids' },
          { id: 'a-tue-5', times: ['19:15–20:15'], arena: 'МЕГА', kind: 'individual' },
        ],
      },
      {
        day: 'Среда',
        short: 'СР',
        slots: [
          { id: 'a-wed-1', times: ['10:00–11:00'], arena: 'ОКЕАНИС', kind: 'individual' },
          { id: 'a-wed-2', times: ['11:00–11:50'], arena: 'ОКЕАНИС', kind: 'individual' },
          { id: 'a-wed-3', times: ['15:00–16:00', '15:30–16:30'], arena: 'ОКЕАНИС', kind: 'individual' },
          { id: 'a-wed-4', times: ['18:00–19:00', '21:00–22:00'], arena: 'ОКЕАНИС', kind: 'individual' },
          { id: 'a-wed-5', times: ['19:00–20:00'], label: 'ГРУППА', arena: 'ОКЕАНИС', kind: 'group-kids' },
        ],
      },
      {
        day: 'Четверг',
        short: 'ЧТ',
        slots: [
          { id: 'a-thu-1', times: ['10:00–11:00'], arena: 'ОКЕАНИС', kind: 'individual' },
          { id: 'a-thu-2', times: ['11:00–12:00'], arena: 'ОКЕАНИС', kind: 'individual' },
          { id: 'a-thu-3', times: ['18:00–19:00'], arena: 'МЕГА', kind: 'individual' },
          { id: 'a-thu-4', times: ['19:15–20:15'], arena: 'МЕГА', kind: 'individual' },
        ],
      },
      {
        day: 'Пятница',
        short: 'ПТ',
        slots: [
          { id: 'a-fri-1', times: ['18:00–19:00'], arena: 'ОКЕАНИС', kind: 'individual' },
        ],
      },
      {
        day: 'Суббота',
        short: 'СБ',
        slots: [
          { id: 'a-sat-1', times: ['10:15–11:15'], arena: 'РИО', kind: 'individual' },
          { id: 'a-sat-2', times: ['11:15–12:15'], label: 'ГРУППА ДЕТИ', arena: 'РИО', kind: 'group-kids' },
          { id: 'a-sat-3', times: ['16:30–17:30', '18:00–19:00'], arena: 'ОКЕАНИС', kind: 'individual' },
          { id: 'a-sat-4', times: ['19:00–20:00'], arena: 'ОКЕАНИС', kind: 'individual' },
        ],
      },
      {
        day: 'Воскресенье',
        short: 'ВС',
        slots: [
          { id: 'a-sun-1', times: ['16:30–17:30'], arena: 'ОКЕАНИС', kind: 'individual' },
        ],
      },
    ],
  },
  {
    coachId: 'ekaterina',
    coachName: 'Есина Екатерина',
    role: 'ОКЕАНИС',
    days: [
      {
        day: 'Понедельник',
        short: 'ПН',
        slots: [
          { id: 'e-mon-1', times: ['10:00–11:00', '11:00–12:00'], arena: 'ОКЕАНИС', kind: 'individual' },
          { id: 'e-mon-2', times: ['12:00–13:00', '13:00–14:00'], arena: 'ОКЕАНИС', kind: 'individual' },
          { id: 'e-mon-3', times: ['14:30–15:30', '15:30–16:30'], arena: 'ОКЕАНИС', kind: 'individual' },
          { id: 'e-mon-4', times: ['18:00–19:00', '21:00–22:00'], arena: 'ОКЕАНИС', kind: 'individual' },
        ],
      },
      {
        day: 'Вторник',
        short: 'ВТ',
        slots: [
          { id: 'e-tue-1', times: ['10:00–11:00', '11:00–12:00'], arena: 'ОКЕАНИС', kind: 'individual' },
          { id: 'e-tue-2', times: ['12:00–13:00', '13:00–14:00'], arena: 'ОКЕАНИС', kind: 'individual' },
          { id: 'e-tue-3', times: ['14:30–15:30', '15:30–16:30'], arena: 'ОКЕАНИС', kind: 'individual' },
          { id: 'e-tue-4', times: ['18:00–19:00'], label: 'ГРУППА', arena: 'ОКЕАНИС', kind: 'group-kids' },
          { id: 'e-tue-5', times: ['21:00–22:00'], arena: 'ОКЕАНИС', kind: 'individual' },
        ],
      },
      {
        day: 'Среда',
        short: 'СР',
        slots: [
          { id: 'e-wed-1', times: ['10:00–11:00', '11:00–12:00'], arena: 'ОКЕАНИС', kind: 'individual' },
          { id: 'e-wed-2', times: ['12:00–13:00', '13:00–14:00'], arena: 'ОКЕАНИС', kind: 'individual' },
          { id: 'e-wed-3', times: ['14:30–15:30', '15:30–16:30'], arena: 'ОКЕАНИС', kind: 'individual' },
          { id: 'e-wed-4', times: ['18:00–19:00', '21:00–22:00'], arena: 'ОКЕАНИС', kind: 'individual' },
        ],
      },
      { day: 'Четверг', short: 'ЧТ', slots: [] },
      { day: 'Пятница', short: 'ПТ', slots: [] },
      {
        day: 'Суббота',
        short: 'СБ',
        slots: [
          { id: 'e-sat-1', times: ['10:00–11:00', '11:00–12:00'], arena: 'ОКЕАНИС', kind: 'individual' },
          { id: 'e-sat-2', times: ['12:00–13:00', '13:00–14:00'], arena: 'ОКЕАНИС', kind: 'individual' },
          { id: 'e-sat-3', times: ['14:30–15:30', '15:30–16:30'], arena: 'ОКЕАНИС', kind: 'individual' },
          { id: 'e-sat-4', times: ['18:00–19:00', '21:00–22:00'], arena: 'ОКЕАНИС', kind: 'individual' },
        ],
      },
      {
        day: 'Воскресенье',
        short: 'ВС',
        slots: [
          { id: 'e-sun-1', times: ['10:00–11:00', '11:00–12:00'], arena: 'ОКЕАНИС', kind: 'individual' },
          { id: 'e-sun-2', times: ['12:00–13:00', '13:00–14:00'], arena: 'ОКЕАНИС', kind: 'individual' },
          { id: 'e-sun-3', times: ['14:30–15:30', '15:30–16:30'], arena: 'ОКЕАНИС', kind: 'individual' },
          { id: 'e-sun-4', times: ['18:00–19:00', '21:00–22:00'], arena: 'ОКЕАНИС', kind: 'individual' },
        ],
      },
    ],
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'trial',
    name: 'Пробная тренировка',
    price: '1 200 ₽',
    period: 'разовое занятие',
    description: 'Знакомство с тренером, диагностика уровня и подбор идеальной группы.',
    features: [
      '60 минут на льду в мини-группе',
      'Рекомендации по подбору коньков',
      'Обратная связь от тренера после льда',
    ],
  },
  {
    id: 'standard',
    name: 'Абонемент 8 занятий',
    badge: 'Популярный',
    price: '9 600 ₽',
    period: 'в месяц · 1 200 ₽ / трен.',
    description: 'Оптимальный ритм для стабильного прогресса детей и взрослых любителей.',
    features: [
      '8 ледовых тренировок в месяц',
      'Заморозка абонемента по справке',
      'Доступ к закрытому чату группы',
      'Скидка 10% на индивидуальные подкатки',
    ],
    highlighted: true,
  },
  {
    id: 'sport',
    name: 'Спорт-пакет 16 занятий',
    price: '16 800 ₽',
    period: 'в месяц · Лёд + Зал',
    description: 'Комплексная система для выполнения разрядов и подготовки к стартам.',
    features: [
      '12 ледовых тренировок + 4 занятия ОФП/хореографии',
      'Ежемесячный видеоразбор техники прыжков',
      'Приоритетная запись на сборы и старты',
    ],
  },
];
