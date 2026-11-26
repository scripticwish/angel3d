import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { AngelLogo } from '../ui/AngelLogo';
import { PageId } from '../../types';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenBooking: (presetProgram?: string) => void;
}

const NAV_LINKS: Array<{ id: PageId; label: string }> = [
  { id: 'home', label: 'Главная' },
  { id: 'programs', label: 'Направления' },
  { id: 'coaches', label: 'Тренеры' },
  { id: 'schedule', label: 'Расписание' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Отслеживание скролла и тёмных секций (data-nav-theme="dark") под шапкой
  useEffect(() => {
    const checkThemeAndScroll = () => {
      setScrolled(window.scrollY > 24);

      const darkSections = document.querySelectorAll<HTMLElement>('[data-nav-theme="dark"]');
      let overDark = false;
      const probeY = 40;

      darkSections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) {
          overDark = true;
        }
      });

      setIsDarkBg(overDark);
    };

    checkThemeAndScroll();
    window.addEventListener('scroll', checkThemeAndScroll, { passive: true });
    window.addEventListener('resize', checkThemeAndScroll);

    return () => {
      window.removeEventListener('scroll', checkThemeAndScroll);
      window.removeEventListener('resize', checkThemeAndScroll);
    };
  }, [currentPage]);

  // Блокировка скролла при открытом мобильном меню
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (page: PageId) => {
    setMobileOpen(false);
    onNavigate(page);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-transparent border-none border-transparent`}
      >
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Логотип: сверху по центру на мобильных, слева на десктопе */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:static lg:translate-x-0 lg:translate-y-0 flex items-center focus:outline-none mt-5"
            aria-label="На главную Angel.Team"
          >
            <AngelLogo light={isDarkBg} />
          </button>

          {/* Десктопное меню */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Основная навигация">
            {NAV_LINKS.map((link) => {
              const active = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`relative font-mono text-xs uppercase tracking-[0.11em] py-1.5 transition-colors ${
                    active
                      ? isDarkBg
                        ? 'text-sky-300 font-semibold'
                        : 'text-cobalt font-semibold'
                      : isDarkBg
                        ? 'text-white/90 hover:text-sky-300'
                        : 'text-[#1E2E47] font-medium hover:text-cobalt'
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="navActiveUnderline"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                      className={`absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full ${
                        isDarkBg ? 'bg-sky-300' : 'bg-cobalt'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Кнопка «Пробное занятие» на десктопе */}
          <div className="hidden lg:flex items-center">
            <button
              type="button"
              onClick={() => onOpenBooking('Пробная тренировка')}
              className={`rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-[0.09em] transition-all duration-200 ${
                isDarkBg
                  ? 'bg-white text-ink hover:bg-sky-200 font-semibold shadow-md'
                  : 'frost-surface text-white border border-white/25 hover:border-sky-300/70'
              }`}
            >
              Пробное занятие
            </button>
          </div>

          {/* Кнопка бургер-меню на мобильных (прижата к правому краю) */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
            className={`ml-auto lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border transition-all ${
              isDarkBg
                ? 'bg-white/10 border-white/25 text-white hover:bg-white/20'
                : 'bg-white/80 border-[#1E2E47]/15 text-[#1E2E47] hover:border-cobalt/50'
            }`}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Мобильное выдвижное меню в морозном стеклянном стиле */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden bg-[#1A283F]/45 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          >
            <motion.aside
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background:
                  'linear-gradient(160deg, rgba(255, 255, 255, 0.92) 0%, rgba(235, 244, 255, 0.88) 100%)',
                backdropFilter: 'blur(24px) saturate(150%)',
                WebkitBackdropFilter: 'blur(24px) saturate(150%)',
              }}
              className="mt-16 sm:mt-20 mx-4 rounded-[28px] border border-white/80 ring-1 ring-[#1E2E47]/10 shadow-[0_24px_60px_rgba(14,24,44,0.22)] p-6 flex flex-col gap-6"
            >
              <nav className="flex flex-col gap-2" aria-label="Мобильная навигация">
                {NAV_LINKS.map((link) => {
                  const active = currentPage === link.id;
                  return (
                    <button
                      key={link.id}
                      type="button"
                      onClick={() => handleNavClick(link.id)}
                      className={`w-full flex items-center justify-between rounded-2xl px-4 py-3.5 text-left font-display font-bold text-lg uppercase tracking-tight transition-all ${
                        active
                          ? 'frost-surface text-white border border-white/25'
                          : 'text-[#1E2E47] hover:bg-white/70'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight
                        className={`w-4 h-4 ${active ? 'text-sky-300' : 'text-[#1E2E47]/40'}`}
                      />
                    </button>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-[#1E2E47]/10">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenBooking('Пробная тренировка');
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full frost-btn text-white py-3.5 px-6 font-mono text-xs uppercase tracking-[0.1em] transition-all"
                >
                  <span>Пробное занятие</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};