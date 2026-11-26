export type PageId = 'home' | 'about' | 'programs' | 'coaches' | 'schedule';

export type OrbitCategory = 'Все' | 'Прыжки' | 'Скольжение' | 'Хореография' | 'Спорт';

export interface OrbitCardItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  category: Exclude<OrbitCategory, 'Все'>;
  metric: string;
  level: string;
  bgColor: string;
  spineColor: string;
  accentColor: string;
  textColor: string;
  note: string;
  baseTilt: number;
  pattern: 'arc' | 'spiral' | 'wings' | 'grid' | 'blade' | 'rings' | 'prism' | 'wave';
}

export interface ProgramItem {
  id: string;
  number: string;
  tag: string;
  title: string;
  age: string;
  schedule: string;
  price: string;
  description: string;
  highlights: string[];
  accentBg: string;
  accentText: string;
  visualTheme: 'ice' | 'cobalt' | 'aurora' | 'obsidian';
  image: string;
}

export interface CoachItem {
  id: string;
  name: string;
  role: string;
  rank: string;
  experience: string;
  specialization: string;
  bio: string;
  accent: string;
  initials: string;
  image: string;
  achievements: string[];
  imageScale?: number;
  imageOffsetY?: number;
}

export interface StatItem {
  id: string;
  target: number;
  suffix: string;
  decimals?: number;
  staticText?: string;
  label: string;
  detail: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  price: string;
  oldPrice?: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}
