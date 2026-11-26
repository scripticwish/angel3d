import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AboutContentBlock, HeroAboutCinema } from './components/sections/HeroAboutCinema';
import { MarqueeSection } from './components/sections/MarqueeSection';
import { ProgramsStackSection } from './components/sections/ProgramsStackSection';
import { CoachesWaveSection } from './components/sections/CoachesWaveSection';
import { SchedulePricingSection } from './components/sections/SchedulePricingSection';
import { SkatingPathSection } from './components/sections/SkatingPathSection';
import { FaqSection } from './components/sections/FaqSection';
import { BookingModal } from './components/sections/BookingModal';
import { Toast } from './components/ui/Toast';
import { PageTransitionOverlay } from './components/ui/PageTransitionOverlay';
import { PageId } from './types';

const VALID_PAGES: PageId[] = ['home', 'about', 'programs', 'coaches', 'schedule'];

const PAGE_LABELS: Record<PageId, string> = {
  home: 'Главная страница',
  about: 'О школе',
  programs: 'Направления',
  coaches: 'Тренерский штаб',
  schedule: 'Расписание льда',
};

function getInitialPage(): PageId {
  const hash = window.location.hash.replace('#/', '').replace('#', '') as PageId;
  return VALID_PAGES.includes(hash) ? hash : 'home';
}

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const [transitioning, setTransitioning] = useState(false);
  const [transitionLabel, setTransitionLabel] = useState('Главная арена');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [presetProgram, setPresetProgram] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const onHashChange = () => {
      const next = getInitialPage();
      setCurrentPage((prev) => (prev === next ? prev : next));
    };
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      timersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  // Гарантированный сброс скролла наверх при смене страницы
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentPage]);

  const handleNavigate = useCallback(
    (page: PageId) => {
      if (page === currentPage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];

      setTransitionLabel(PAGE_LABELS[page]);
      setTransitioning(true);

      const swapTimer = window.setTimeout(() => {
        setCurrentPage(page);
        const nextHash = page === 'home' ? '' : `#/${page}`;
        if (window.location.hash !== nextHash) {
          window.history.pushState(null, '', nextHash || window.location.pathname);
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }, 420);

      const endTimer = window.setTimeout(() => {
        setTransitioning(false);
      }, 900);

      timersRef.current = [swapTimer, endTimer];
    },
    [currentPage]
  );

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  }, []);

  const handleOpenBooking = useCallback((preset?: string) => {
    setPresetProgram(preset);
    setBookingOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-glacial text-ink overflow-x-clip flex flex-col">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
      />

      <main className="flex-1">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {currentPage === 'home' && (
            <>
              <HeroAboutCinema onOpenBooking={handleOpenBooking} onNotify={showToast} />
              <MarqueeSection />
              <ProgramsStackSection onOpenBooking={handleOpenBooking} />
              <CoachesWaveSection onOpenBooking={handleOpenBooking} />
              <SchedulePricingSection onOpenBooking={handleOpenBooking} />
              <SkatingPathSection onOpenBooking={handleOpenBooking} />
              <FaqSection />
            </>
          )}

          {currentPage === 'about' && (
            <>
              <AboutContentBlock onOpenBooking={handleOpenBooking} standalone />
              <MarqueeSection />
              <SkatingPathSection onOpenBooking={handleOpenBooking} />
            </>
          )}

          {currentPage === 'programs' && (
            <>
              <div data-nav-theme="dark" className="bg-[#1E2E47]">
                <ProgramsStackSection onOpenBooking={handleOpenBooking} />
              </div>
              <SkatingPathSection onOpenBooking={handleOpenBooking} />
            </>
          )}

          {currentPage === 'coaches' && (
            <CoachesWaveSection onOpenBooking={handleOpenBooking} />
          )}

          {currentPage === 'schedule' && (
            <>
              <SchedulePricingSection onOpenBooking={handleOpenBooking} />
              <FaqSection />
            </>
          )}
        </motion.div>
      </main>

      <Footer onNavigate={handleNavigate} onOpenBooking={handleOpenBooking} />

      <BookingModal
        open={bookingOpen}
        presetProgram={presetProgram}
        onClose={() => setBookingOpen(false)}
        onSuccess={showToast}
      />

      <PageTransitionOverlay active={transitioning} targetLabel={transitionLabel} />
      <Toast message={toastMessage} />
    </div>
  );
};

export default App;