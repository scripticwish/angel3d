import React from 'react';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import { AngelLogo } from '../ui/AngelLogo';
import { PageId } from '../../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: (presetProgram?: string) => void;
}

const SOCIAL_LINKS = [
  {
    name: 'Telegram',
    href: 'https://t.me/al',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
        <path d="M21.9 4.6c.3-1.2-.8-2.2-1.9-1.7L2.8 9.6c-1.2.5-1.1 2.2.1 2.6l4.4 1.4 1.7 5.3c.3 1 1.6 1.2 2.2.4l2.5-3.1 4.6 3.4c.9.7 2.2.2 2.4-1l1.2-14zM9.2 13.4l8.8-5.6-6.9 6.8-.3 3.2-1.6-4.4z" />
      </svg>
    ),
  },
  {
    name: 'VK',
    href: 'https://vk.ru/team.angel',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
        <path d="M13.16 18.94c-6.84 0-10.74-4.68-10.9-12.48h3.42c.11 5.72 2.63 8.15 4.63 8.65V6.46h3.22v4.94c1.97-.21 4.04-2.46 4.74-4.94h3.22c-.54 3.06-2.8 5.31-4.41 6.24 1.61.75 4.19 2.72 5.17 6.24h-3.54c-.76-2.37-2.65-4.2-5.15-4.45v4.45h-.4z" />
      </svg>
    ),
  },
  {
    name: 'Instagram*',
    href: 'https://instagram.com/angel_team.nn',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 fill-none stroke-current"
        strokeWidth="1.9"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <footer
      data-nav-theme="dark"
      className="relative text-white pt-20 pb-10 overflow-hidden"
      style={{
        background:
          'linear-gradient(165deg, #1E2E47 0%, #273D5C 48%, #1A283F 100%)',
      }}
    >
      {/* Эффект инея в подвале */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-[12%] h-[360px] w-[360px] rounded-full bg-sky-300/15 blur-[100px]" />
        <div className="absolute bottom-0 right-[8%] h-[340px] w-[340px] rounded-full bg-blue-300/15 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 260 260' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)' opacity='0.55'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-7">
            <div
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              className="mb-6 cursor-pointer inline-block"
            >
              <AngelLogo light />
            </div>
            <h2 className="font-display font-bold uppercase tracking-tight leading-[0.96] text-[clamp(2.4rem,5.5vw,5rem)]">
              НАЧНИТЕ ПУТЬ В
              <br />
              <span className="text-cobalt">ANGEL.TEAM</span>
            </h2>
            <div className="mt-8">
              <MagneticButton
                label="Записаться на пробный лёд"
                variant="light"
                onClick={() => onOpenBooking('Пробная тренировка')}
              />
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
            <div className="space-y-3">
              <div className="font-mono text-xs uppercase tracking-[0.12em] text-slate-400">
                Контакты и 7 локаций
              </div>
              <a
                href="tel:+79991234567"
                className="flex items-center gap-2 text-slate-200 hover:text-blue-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-cobalt" />
                <span>+7 (999) 123-45-67</span>
              </a>
              <a
                href="mailto:hello@angelteam.ru"
                className="flex items-center gap-2 text-slate-200 hover:text-blue-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-cobalt" />
                <span>hello@angelteam.ru</span>
              </a>
              <div className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-cobalt shrink-0 mt-0.5" />
                <span>Океанис, РИО, МЕГА, Динамо, Сормовский парк, Дзержинск, Богородск</span>
              </div>

              {/* Социальные сети */}
              <div className="pt-3">
                <div className="font-mono text-xs uppercase tracking-[0.12em] text-slate-400 mb-2.5">
                  Соцсети
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {SOCIAL_LINKS.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-white/90 hover:bg-white hover:text-[#1E2E47] hover:border-white transition-all duration-200"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="font-mono text-xs uppercase tracking-[0.12em] text-slate-400">
                Страницы
              </div>
              {[
                { label: 'Главная', page: 'home' as PageId },
                { label: 'О школе', page: 'about' as PageId },
                { label: 'Направления', page: 'programs' as PageId },
                { label: 'Тренеры', page: 'coaches' as PageId },
                { label: 'Расписание', page: 'schedule' as PageId },
              ].map((link) => (
                <button
                  key={link.page}
                  type="button"
                  onClick={() => onNavigate(link.page)}
                  className="w-full flex items-center justify-between text-slate-300 hover:text-white transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="font-display font-bold uppercase tracking-tight leading-none text-[clamp(3rem,11vw,9.5rem)] text-white/10 select-none">
            ANGEL.TEAM
          </div>
          <div className="space-y-1 sm:text-right">
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-slate-400">
              © 2026 ANGEL.TEAM · Школа фигурного катания
            </div>
            <div className="text-[10px] text-slate-500">
              *Instagram принадлежит компании Meta, признанной экстремистской и запрещённой в РФ
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};