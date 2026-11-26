import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface PageTransitionOverlayProps {
  active: boolean;
  targetLabel: string;
}

export const PageTransitionOverlay: React.FC<PageTransitionOverlayProps> = ({
  active,
  targetLabel,
}) => {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="page-transition"
          initial={{ clipPath: 'inset(0 0 0 100%)' }}
          animate={{ clipPath: 'inset(0 0 0 0%)' }}
          exit={{ clipPath: 'inset(0 100% 0 0)' }}
          transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[120] overflow-hidden bg-gradient-to-br from-[#F7F9FC] via-[#EDF3FF] to-[#E2ECFF] flex items-center justify-center pointer-events-auto"
        >
          {/* Subtle architectural ice grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(circle at 50% 50%, rgba(37,99,235,0.14) 0%, transparent 65%)',
            }}
          />

          {/* Full-width SVG Stage: Colorful Tracer Lines + Line-Art Gliding Figure Skater */}
          <svg
            viewBox="0 0 1440 520"
            className="w-full max-w-[1440px] h-auto overflow-visible"
            fill="none"
          >
            <defs>
              <linearGradient id="traceCobalt" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0" />
                <stop offset="40%" stopColor="#2563EB" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#60A5FA" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="traceCyan" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
                <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#A5F3FC" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="traceViolet" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#818CF8" stopOpacity="0" />
                <stop offset="45%" stopColor="#818CF8" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#C4B5FD" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="traceRose" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EC4899" stopOpacity="0" />
                <stop offset="50%" stopColor="#F472B6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FBCFE8" stopOpacity="1" />
              </linearGradient>
              <filter id="traceGlow" x="-10%" y="-30%" width="120%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

{/* Colorful Ice Blade Tracer Ribbons */}
            <motion.path
              d="M -60 355 C 220 390, 480 265, 760 305 C 1020 340, 1220 260, 1500 225"
              stroke="url(#traceCobalt)"
              strokeWidth="4.5"
              strokeLinecap="round"
              filter="url(#traceGlow)"
              pathLength={1}
              strokeDasharray="1"
              initial={{ strokeDashoffset: 1, opacity: 0.4 }}
              animate={{ strokeDashoffset: 0, opacity: 1 }}
              transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.path
              d="M -60 370 C 235 405, 495 282, 775 320 C 1035 354, 1230 274, 1500 242"
              stroke="url(#traceCyan)"
              strokeWidth="3"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1"
              initial={{ strokeDashoffset: 1, opacity: 0.3 }}
              animate={{ strokeDashoffset: 0, opacity: 0.95 }}
              transition={{ duration: 0.82, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.path
              d="M -60 342 C 210 374, 470 252, 750 292 C 1010 326, 1210 248, 1500 212"
              stroke="url(#traceViolet)"
              strokeWidth="2.4"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1"
              initial={{ strokeDashoffset: 1, opacity: 0.25 }}
              animate={{ strokeDashoffset: 0, opacity: 0.85 }}
              transition={{ duration: 0.85, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.path
              d="M -60 382 C 250 415, 510 296, 790 332 C 1050 366, 1245 288, 1500 256"
              stroke="url(#traceRose)"
              strokeWidth="2"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1"
              initial={{ strokeDashoffset: 1, opacity: 0.2 }}
              animate={{ strokeDashoffset: 0, opacity: 0.85 }}
              transition={{ duration: 0.86, delay: 0.09, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Minimalist Line-Art Figure Skater Gliding in Arabesque / Spiral */}
            <motion.g
              initial={{ x: -120, y: 215, rotate: -6, opacity: 0 }}
              animate={{
                x: [0, 580, 1240],
                y: [225, 165, 95],
                rotate: [-4, 2, -3],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 0.86, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Head & hair bun */}
              <circle cx="118" cy="36" r="10.5" stroke="#0E1116" strokeWidth="2.4" />
              <circle cx="105" cy="32" r="4.5" stroke="#2563EB" strokeWidth="2" />
              {/* Flowing neck & arched spine */}
              <path
                d="M113 46 C 108 62, 96 78, 86 92"
                stroke="#0E1116"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              {/* Expressive front arm reaching forward */}
              <path
                d="M106 58 C 128 54, 148 44, 166 36"
                stroke="#0E1116"
                strokeWidth="2.3"
                strokeLinecap="round"
              />
              {/* Back arm sweeping gracefully */}
              <path
                d="M104 60 C 82 64, 62 56, 44 46"
                stroke="#2563EB"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              {/* Flowing skating dress lines */}
              <path
                d="M86 92 C 74 96, 62 92, 54 102 C 72 106, 92 106, 108 100 Z"
                stroke="#2563EB"
                strokeWidth="1.9"
                strokeLinejoin="round"
              />
              {/* Extended free leg (spiral) */}
              <path
                d="M84 94 C 58 88, 30 78, 4 64"
                stroke="#0E1116"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Free skate blade */}
              <path d="M-4 58 L10 70" stroke="#EC4899" strokeWidth="2.2" strokeLinecap="round" />

              {/* Gliding standing leg */}
              <path
                d="M90 98 C 94 122, 92 146, 86 168"
                stroke="#0E1116"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              {/* Gliding skate boot & curved blade */}
              <path
                d="M86 168 L100 172"
                stroke="#0E1116"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              <path
                d="M72 178 C 86 181, 100 180, 114 174"
                stroke="#2563EB"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
            </motion.g>
          </svg>

          {/* Center Page Label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="absolute bottom-12 inset-x-0 px-4 text-center"
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-cobalt">
              ANGEL.TEAM
            </div>
            <div className="mt-1 font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight frost-text">
              {targetLabel}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
