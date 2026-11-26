import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, X } from 'lucide-react';
import { ORBIT_CARDS } from '../../data/orbitCards';
import { SCHOOL_STATS } from '../../data/stats';
import { OrbitCardItem, StatItem } from '../../types';
import { useWindowSize } from '../../hooks/useWindowSize';
import { MagneticButton } from '../ui/MagneticButton';
import { AnimatedText } from '../ui/AnimatedText';

interface HeroAboutCinemaProps {
  onOpenBooking: (presetProgram?: string) => void;
  onNotify: (msg: string) => void;
}

interface SpringState {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  s: number;
  o: number;
  vx: number;
  vy: number;
  vz: number;
  vrx: number;
  vry: number;
  vs: number;
  vo: number;
}

function renderCardArtwork(card: OrbitCardItem) {
  const stroke = card.accentColor;
  switch (card.pattern) {
    case 'arc':
      return (
        <svg viewBox="0 0 160 120" className="w-full h-full opacity-90" fill="none">
          <path d="M12 104 C 44 20, 114 20, 148 92" stroke={stroke} strokeWidth="2.2" />
          <path d="M24 108 C 56 42, 108 42, 138 100" stroke={stroke} strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
          <circle cx="80" cy="40" r="5" fill={stroke} />
          <circle cx="80" cy="40" r="14" stroke={stroke} strokeWidth="1" opacity="0.45" />
        </svg>
      );
    case 'wings':
      return (
        <svg viewBox="0 0 160 120" className="w-full h-full opacity-90" fill="none">
          <path d="M80 96 C 60 56, 30 34, 14 26 C 32 54, 52 72, 80 96Z" stroke={stroke} strokeWidth="1.8" />
          <path d="M80 96 C 100 56, 130 34, 146 26 C 128 54, 108 72, 80 96Z" stroke={stroke} strokeWidth="1.8" />
          <line x1="80" y1="20" x2="80" y2="104" stroke={stroke} strokeWidth="1" opacity="0.45" />
        </svg>
      );
    case 'rings':
      return (
        <svg viewBox="0 0 160 120" className="w-full h-full opacity-90" fill="none">
          <ellipse cx="80" cy="60" rx="54" ry="22" stroke={stroke} strokeWidth="1.8" transform="rotate(-14 80 60)" />
          <ellipse cx="80" cy="60" rx="38" ry="15" stroke={stroke} strokeWidth="1.4" transform="rotate(14 80 60)" />
          <circle cx="80" cy="60" r="4" fill={stroke} />
        </svg>
      );
    case 'wave':
      return (
        <svg viewBox="0 0 160 120" className="w-full h-full opacity-90" fill="none">
          <path d="M8 76 Q 44 26, 80 62 T 152 46" stroke={stroke} strokeWidth="2.2" />
          <path d="M8 94 Q 44 44, 80 80 T 152 64" stroke={stroke} strokeWidth="1.2" opacity="0.55" />
        </svg>
      );
    case 'spiral':
      return (
        <svg viewBox="0 0 160 120" className="w-full h-full opacity-90" fill="none">
          <circle cx="80" cy="60" r="44" stroke={stroke} strokeWidth="1.2" strokeDasharray="6 4" />
          <circle cx="80" cy="60" r="28" stroke={stroke} strokeWidth="1.8" />
          <circle cx="80" cy="60" r="12" stroke={stroke} strokeWidth="2" />
        </svg>
      );
    case 'prism':
      return (
        <svg viewBox="0 0 160 120" className="w-full h-full opacity-90" fill="none">
          <polygon points="80,16 132,96 28,96" stroke={stroke} strokeWidth="1.8" />
          <polygon points="80,34 114,90 46,90" stroke={stroke} strokeWidth="1" opacity="0.55" />
        </svg>
      );
    case 'blade':
      return (
        <svg viewBox="0 0 160 120" className="w-full h-full opacity-90" fill="none">
          <path d="M18 82 C 56 88, 108 84, 144 46" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M36 96 C 72 98, 114 92, 142 64" stroke={stroke} strokeWidth="1.2" opacity="0.55" />
          <circle cx="144" cy="46" r="4" fill={stroke} />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 160 120" className="w-full h-full opacity-90" fill="none">
          <line x1="24" y1="30" x2="136" y2="30" stroke={stroke} strokeWidth="1.2" opacity="0.5" />
          <line x1="24" y1="60" x2="136" y2="60" stroke={stroke} strokeWidth="1.8" />
          <line x1="24" y1="90" x2="136" y2="90" stroke={stroke} strokeWidth="1.2" opacity="0.5" />
          <line x1="56" y1="16" x2="56" y2="104" stroke={stroke} strokeWidth="1.2" opacity="0.5" />
          <line x1="104" y1="16" x2="104" y2="104" stroke={stroke} strokeWidth="1.2" opacity="0.5" />
        </svg>
      );
  }
}

const CountingStatRow: React.FC<{ stat: StatItem; index: number }> = ({ stat, index }) => {
  const rowRef = useRef<HTMLLIElement>(null);
  const inView = useInView(rowRef, { once: true, amount: 0.35 });
  const [display, setDisplay] = useState(
    stat.staticText ? stat.staticText : stat.decimals ? `0.0${stat.suffix}` : `0${stat.suffix}`
  );

  useEffect(() => {
    if (!inView || stat.staticText) return;
    let raf = 0;
    const duration = 1350;
    const start = performance.now();

    const step = (now: number) => {
      const k = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      const val = stat.target * eased;
      if (stat.decimals) {
        setDisplay(`${val.toFixed(stat.decimals)}${stat.suffix}`);
      } else {
        setDisplay(`${Math.round(val)}${stat.suffix}`);
      }
      if (k < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat]);

  return (
    <motion.li
      ref={rowRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="relative py-6 first:pt-2"
    >
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.85, ease: [0.7, 0, 0.2, 1] }}
        style={{ transformOrigin: 'left' }}
        className="absolute top-0 left-0 right-0 h-px bg-ink/15"
      />

      <div className="font-display font-bold text-5xl sm:text-6xl leading-none tracking-tight text-cobalt tabular-nums">
        {display}
      </div>
      <div className="mt-2 font-sans font-semibold text-base sm:text-lg text-ink">{stat.label}</div>
      <p className="mt-1 text-sm text-ink/75 leading-relaxed max-w-md">{stat.detail}</p>
    </motion.li>
  );
};

export const AboutContentBlock: React.FC<{
  onOpenBooking: (presetProgram?: string) => void;
  standalone?: boolean;
}> = ({ onOpenBooking, standalone = false }) => (
  <section
    id="about"
    className={`relative z-20 py-24 sm:py-32 ${standalone ? 'bg-cover bg-center bg-fixed' : ''}`}
    style={
      standalone
        ? {
            backgroundImage:
              'linear-gradient(180deg, rgba(247,249,252,0.82) 0%, rgba(247,249,252,0.92) 100%), url(/images/arena-angle.png)',
          }
        : undefined
    }
  >
    <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-6 lg:sticky lg:top-28">
          <div className="inline-block rounded-full bg-white/90 backdrop-blur-md border border-ink/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-cobalt mb-5">
            01 // ПОЧЕМУ ВЫБИРАЮТ ANGEL.TEAM
          </div>

          <div className="relative mb-8 h-64 sm:h-80 w-full overflow-hidden rounded-3xl border border-white/70 shadow-xl">
            <img
              src="/images/team-studio-light.jpg"
              alt="Команда Angel.Team"
              className="h-full w-full object-cover object-[10%_10%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent flex flex-col justify-end p-6 text-white">
              <div className="font-serif italic text-2xl sm:text-3xl leading-snug">
                «Грация, воплощённая в движении»
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-blue-200">
                Нижний Новгород · Дзержинск · Богородск
              </div>
            </div>
          </div>

          <h2 className="font-display font-bold uppercase tracking-tight leading-[1.2] text-[clamp(2.5rem,5.2vw,5rem)] frost-text drop-shadow-[0_2px_16px_rgba(255,255,255,0.85)]">
            ПРЕИМУЩЕСТВА
            <br />
            <span className="text-cobalt">ОБУЧЕНИЯ</span>
            <br />
            НА ЛЬДУ
          </h2>

          <div className="mt-8">
            <MagneticButton
              label="Записаться на пробный лёд"
              variant="ink"
              onClick={() => onOpenBooking('Пробная тренировка')}
            />
          </div>
        </div>

        <div className="lg:col-span-6 rounded-[36px] bg-white/85 backdrop-blur-xl border border-white/90 p-6 sm:p-10 shadow-[0_24px_60px_rgba(14,17,22,0.08)]">
          <AnimatedText
            text="Все действующие тренеры Angel.Team — кандидаты в мастера спорта. За каждым направлением закреплён профильный специалист, поэтому ученики выходят на первые соревнования уже с 3-го месяца и уверенно поступают в школу олимпийского резерва."
            className="font-sans font-medium text-xl sm:text-2xl leading-[1.45] text-ink mb-10"
          />

          <ul className="divide-y-0">
            {SCHOOL_STATS.map((stat, idx) => (
              <CountingStatRow key={stat.id} stat={stat} index={idx} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export const HeroAboutCinema: React.FC<HeroAboutCinemaProps> = ({ onOpenBooking }) => {
  const { width, height } = useWindowSize();
  const isMobile = width < 768;

  const [focusedCard, setFocusedCard] = useState<OrbitCardItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [atFarBoard, setAtFarBoard] = useState(false);

  const storyRef = useRef<HTMLDivElement>(null);
  const aboutWrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef = useRef({ nx: 0.5, ny: 0.5 });

  const walkTargetRef = useRef(0);
  const walkCurRef = useRef(0);
  const boardDragRef = useRef({ active: false, startX: 0, startTarget: 0 });

  const hoveredIdRef = useRef(hoveredId);
  const focusedCardRef = useRef(focusedCard);
  const flyProgressRef = useRef(0);

  useEffect(() => {
    hoveredIdRef.current = hoveredId;
  }, [hoveredId]);
  useEffect(() => {
    focusedCardRef.current = focusedCard;
  }, [focusedCard]);

  // 1) Scroll progress for #top -> Far Board Glass glide (240vh)
  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ['start start', 'end end'],
  });

  // 2) Scroll progress for Far Board -> #about smooth background crossfade!
  const { scrollYProgress: aboutEnterProgress } = useScroll({
    target: aboutWrapperRef,
    offset: ['start end', 'start 0.15'],
  });

  useEffect(() => {
    return storyProgress.on('change', (v) => {
      flyProgressRef.current = v;
      setAtFarBoard(v > 0.42);
    });
  }, [storyProgress]);

  // Plate 1: hero-arena.png (gentle scale 1 -> 1.32, NO pixelation!)
  const plate1Scale = useTransform(storyProgress, [0, 0.55], [1, 1.32]);
  const plate1Opacity = useTransform(storyProgress, [0.22, 0.52], [1, 0]);

  // Plate 2: arena-far-board.jpg (crisp high-res close-up at the far dasher board glass!)
  const plate2Scale = useTransform(storyProgress, [0.2, 0.85], [0.95, 1.04]);
  const plate2Opacity = useTransform(storyProgress, [0.2, 0.5], [0, 1]);

  // Plate 3: arena-angle.png (smoothly fades in as #about enters!)
  const plate3Opacity = useTransform(aboutEnterProgress, [0.05, 0.85], [0, 1]);
  const plate3Scale = useTransform(aboutEnterProgress, [0.05, 1], [1.06, 1]);

  // Hero copy & founders glide past camera
  const heroScale = useTransform(storyProgress, [0, 0.34], [1, 1.24]);
  const heroOpacity = useTransform(storyProgress, [0, 0.28], [1, 0]);
  const heroBlur = useTransform(storyProgress, [0, 0.28], ['blur(0px)', 'blur(14px)']);

  const foundersScale = useTransform(storyProgress, [0, 0.34], [1, 1.2]);
  const foundersOpacity = useTransform(storyProgress, [0, 0.28], [1, 0]);

  const leftMoundX = useTransform(storyProgress, [0, 0.35], ['0%', '-55%']);
  const rightMoundX = useTransform(storyProgress, [0, 0.35], ['0%', '55%']);

  const boardUiOpacity = useTransform(storyProgress, [0.46, 0.65], [0, 1]);
  const boardUiY = useTransform(storyProgress, [0.46, 0.65], [20, 0]);

  const springsRef = useRef<SpringState[]>(
    ORBIT_CARDS.map(() => ({
      x: width / 2,
      y: height * 0.5,
      z: -120,
      rx: 0,
      ry: 0,
      s: 0.4,
      o: 0,
      vx: 0,
      vy: 0,
      vz: 0,
      vrx: 0,
      vry: 0,
      vs: 0,
      vo: 0,
    }))
  );

  const stepBoardWalk = (dir: number) => {
    walkTargetRef.current += dir * 1;
  };

  useEffect(() => {
    let rafId = 0;
    let lastTime = performance.now();

    const cardW = isMobile ? Math.min(width * 0.34, 136) : Math.max(146, Math.min(width * 0.125, 184));
    const cardH = cardW * 1.32;

    const tick = (now: number) => {
      const rawDt = Math.min((now - lastTime) / 1000, 0.033);
      lastTime = now;

      const curHovered = hoveredIdRef.current;
      const curFocused = focusedCardRef.current;
      const flyP = flyProgressRef.current;
      const showOnFarGlass = flyP > 0.38;

      const walkTau = isMobile ? 0.2 : 0.32;
      walkCurRef.current += (walkTargetRef.current - walkCurRef.current) * (1 - Math.exp(-rawDt / walkTau));

      const { nx, ny } = mouseRef.current;

      ORBIT_CARDS.forEach((card, i) => {
        const st = springsRef.current[i];
        const el = cardRefs.current[i];
        if (!el) return;

        const isHovered = curHovered === card.id && !curFocused;
        const isFocused = curFocused?.id === card.id;

        let tx = width / 2;
        let ty = height * 0.5;
        let tz = -180;
        let trx = 0;
        let try_ = 0;
        let ts = 0.45;
        let to = 0;

        if (curFocused) {
          if (isFocused) {
            tx = isMobile ? width / 2 : width * 0.34;
            ty = isMobile ? height * 0.32 : height * 0.52;
            tz = 150;
            ts = isMobile ? 1.15 : 1.45;
            try_ = -10 + (nx - 0.5) * 10;
            trx = (ny - 0.5) * -8;
            to = 1;
          } else {
            tx = width / 2 + (i - 3.5) * 120;
            ty = height * 0.5;
            tz = -200;
            ts = 0.5;
            to = 0;
          }
        } else if (showOnFarGlass) {
          // Cards mounted cleanly on the glass panels of arena-far-board.jpg!
          const n = ORBIT_CARDS.length;
          let rel = ((i - walkCurRef.current) % n + n) % n;
          if (rel > n / 2) rel -= n;

          const angleStep = isMobile ? 0.58 : 0.38;
          const theta = rel * angleStep;
          const arcRadiusX = isMobile ? width * 0.68 : width * 0.46;
          const arcDepth = Math.cos(theta);

          // Чуть приподнимаем дугу на телефоне, чтобы не перекрывала нижний заголовок
          tx = width * 0.5 + Math.sin(theta) * arcRadiusX + (nx - 0.5) * -14;
          ty = height * (isMobile ? 0.46 : 0.49) + (1 - arcDepth) * (isMobile ? 24 : 38) + (ny - 0.5) * -8;
          tz = isHovered ? 120 : (arcDepth - 0.45) * 210;

          const baseScale = isMobile ? 0.78 : 0.94;
          ts = isHovered ? baseScale * 1.14 : baseScale * (0.72 + 0.32 * Math.max(0, arcDepth));
          try_ = isHovered ? 0 : -theta * (isMobile ? 28 : 34);
          trx = isHovered ? 0 : 2;
          to = Math.abs(rel) <= 2.4 ? Math.max(0, Math.min(1, 1.3 - Math.abs(rel) * 0.42)) : 0;
        }

        const substeps = 4;
        const h = rawDt / substeps;
        for (let step = 0; step < substeps; step++) {
          st.vx += ((tx - st.x) * 115 - st.vx * 18) * h;
          st.x += st.vx * h;
          st.vy += ((ty - st.y) * 115 - st.vy * 18) * h;
          st.y += st.vy * h;
          st.vz += ((tz - st.z) * 130 - st.vz * 19) * h;
          st.z += st.vz * h;
          st.vrx += ((trx - st.rx) * 145 - st.vrx * 19) * h;
          st.rx += st.vrx * h;
          st.vry += ((try_ - st.ry) * 145 - st.vry * 19) * h;
          st.ry += st.vry * h;
          st.vs += ((ts - st.s) * 155 - st.vs * 20) * h;
          st.s += st.vs * h;
          st.vo += ((to - st.o) * 90 - st.vo * 18) * h;
          st.o += st.vo * h;
        }

        el.style.transform = `translate3d(${st.x - cardW / 2}px, ${st.y - cardH / 2}px, ${st.z}px) rotateX(${st.rx}deg) rotateY(${st.ry}deg) scale(${st.s})`;
        el.style.opacity = `${Math.max(0, Math.min(1, st.o))}`;
        el.style.pointerEvents = st.o > 0.25 ? 'auto' : 'none';
        el.style.zIndex = isHovered || isFocused ? '220' : `${Math.round(120 + st.z)}`;
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [width, height, isMobile]);

  const handleStagePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!atFarBoard || focusedCard) return;
    boardDragRef.current = {
      active: true,
      startX: e.clientX,
      startTarget: walkTargetRef.current,
    };
  };

  const handleStageMouseMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current = {
      nx: x / Math.max(1, rect.width),
      ny: y / Math.max(1, rect.height),
    };

    if (boardDragRef.current.active) {
      const dx = e.clientX - boardDragRef.current.startX;
      walkTargetRef.current = boardDragRef.current.startTarget - dx / (isMobile ? 15 : 220);
    }
  };

  const handlePointerUp = () => {
    boardDragRef.current.active = false;
  };

  const cardW = isMobile ? Math.min(width * 0.34, 136) : Math.max(146, Math.min(width * 0.125, 184));
  const cardH = cardW * 1.32;

  return (
    <div className="relative w-full bg-glacial">
      {/* SHARED STICKY 3-PLATE BACKGROUND STAGE (spans BOTH #top->far-board AND #about!) */}
      <div className="pointer-events-none sticky top-0 h-screen w-full overflow-hidden z-0">
        {/* Plate 1: hero-arena.png */}
        <motion.div
          initial={{ scale: 1.12, opacity: 0.45 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.25, ease: [0.25, 1, 0.5, 1] }}
          style={{
            scale: plate1Scale,
            opacity: plate1Opacity,
            transformOrigin: '50% 60%',
          }}
          className="absolute inset-0 will-change-transform"
        >
          <img
            src="/images/hero-arena.png"
            alt="Ледовая арена Angel.Team"
            className="h-full w-full object-cover object-center"
          />
        </motion.div>

        {/* Plate 2: arena-far-board.jpg (crisp high-res far dasher board glass!) */}
        <motion.div
          style={{ opacity: plate2Opacity, scale: plate2Scale }}
          className="absolute inset-0 will-change-transform"
        >
          <img
            src="/images/arena-far-board.jpg"
            onError={(e) => {
              const t = e.currentTarget;
              if (!t.dataset.fb) {
                t.dataset.fb = '1';
                t.src = '/images/arena-far-board.png';
              } else if (t.dataset.fb === '1') {
                t.dataset.fb = '2';
                t.src = '/images/hero-arena.png';
              }
            }}
            alt="Дальний борт ледовой арены со стёклами"
            className="h-full w-full object-cover object-center"
          />
        </motion.div>

        {/* Plate 3: arena-angle.png (smoothly fades in for #about!) */}
        <motion.div
          style={{ opacity: plate3Opacity, scale: plate3Scale }}
          className="absolute inset-0 will-change-transform"
        >
          <img
            src="/images/arena-angle.png"
            alt="Панорама ледовой арены Angel.Team"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-glacial/75" />
        </motion.div>

        {/* Atmospheric Readability Veil */}
        <div
          className="absolute inset-0"
          style={{
            background: atFarBoard
              ? 'linear-gradient(180deg, rgba(247,249,252,0.32) 0%, rgba(247,249,252,0.06) 45%, rgba(14,17,22,0.16) 100%)'
              : 'radial-gradient(circle at 50% 45%, rgba(247,249,252,0.8) 0%, rgba(247,249,252,0.48) 44%, rgba(235,242,255,0.22) 75%, rgba(14,17,22,0.12) 100%)',
          }}
        />
      </div>

      {/* SECTION 1: #top -> Far Board Glass Story (pulled up by -100vh over sticky stage) */}
      <div id="top" ref={storyRef} className="relative z-10 -mt-[100vh] h-[250vh] w-full">
        <div
          ref={stageRef}
          onPointerDown={handleStagePointerDown}
          onPointerMove={handleStageMouseMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className={`sticky top-0 h-screen min-h-[720px] w-full overflow-hidden select-none ${
            atFarBoard ? 'cursor-grab active:cursor-grabbing' : ''
          }`}
        >
          {/* Split Crystalline Foreground Ridges */}
          <motion.div
            style={{ x: leftMoundX }}
            className="pointer-events-none absolute bottom-0 left-0 z-[10] w-[55vw] h-[18vh] opacity-90"
          >
            <svg viewBox="0 0 800 260" preserveAspectRatio="none" className="h-full w-full">
              <path d="M0 40 L210 115 L440 190 L800 260 L0 260 Z" fill="#F7F9FC" fillOpacity="0.9" />
            </svg>
          </motion.div>
          <motion.div
            style={{ x: rightMoundX }}
            className="pointer-events-none absolute bottom-0 right-0 z-[10] w-[55vw] h-[18vh] opacity-90"
          >
            <svg viewBox="0 0 800 260" preserveAspectRatio="none" className="h-full w-full">
              <path d="M800 40 L590 115 L360 190 L0 260 L800 260 Z" fill="#F7F9FC" fillOpacity="0.9" />
            </svg>
          </motion.div>

          {/* Founders Duo Editorial Cutout: на мобильных снизу по центру, на десктопе справа */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ scale: foundersScale, opacity: foundersOpacity }}
            className="pointer-events-none absolute bottom-0 inset-x-0 flex justify-center lg:inset-x-auto lg:right-[6%] lg:block z-[14]"
          >
            <motion.img
              src="/images/founders-duo.png"
              alt="Основатели и тренеры Angel.Team"
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="h-[34vh] max-h-[300px] sm:h-[38vh] sm:max-h-[360px] lg:h-[48vh] lg:max-h-none w-auto object-contain drop-shadow-[0_24px_38px_rgba(14,17,22,0.22)]"
            />
          </motion.div>

          {/* 3D Element Cards mounted on the glass panels of the far dasher board */}
          <div className="stage-3d absolute inset-0 z-20 pointer-events-none">
            {ORBIT_CARDS.map((card, i) => (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (atFarBoard) setFocusedCard(card);
                }}
                onMouseEnter={() => setHoveredId(card.id)}
                onMouseLeave={() => setHoveredId((prev) => (prev === card.id ? null : prev))}
                style={{
                  width: `${cardW}px`,
                  height: `${cardH}px`,
                  backgroundColor: card.bgColor,
                  color: card.textColor,
                  boxShadow:
                    hoveredId === card.id
                      ? '0 28px 60px -12px rgba(37, 99, 235, 0.42)'
                      : '0 22px 45px -16px rgba(14, 17, 22, 0.34)',
                  borderColor:
                    hoveredId === card.id
                      ? '#2563EB'
                      : card.bgColor === '#FFFFFF' || card.bgColor === '#F1F5F9'
                        ? 'rgba(14,17,22,0.14)'
                        : 'rgba(255,255,255,0.22)',
                }}
                className="card-3d absolute top-0 left-0 rounded-2xl border cursor-pointer overflow-hidden transition-shadow duration-200"
              >
                <div
                  className="absolute inset-y-0 left-0 w-2 opacity-60"
                  style={{ backgroundColor: card.spineColor }}
                />
                <div className="relative flex h-full flex-col justify-between p-3.5 sm:p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] opacity-65">
                      {card.code}
                    </span>
                    <span
                      className="rounded-full px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider"
                      style={{ backgroundColor: 'rgba(125,125,125,0.16)' }}
                    >
                      {card.metric}
                    </span>
                  </div>

                  <div className="my-1 flex-1 flex items-center justify-center">
                    {renderCardArtwork(card)}
                  </div>

                  <div>
                    <div className="font-display font-bold text-base sm:text-lg leading-none tracking-tight uppercase">
                      {card.title}
                    </div>
                    <div className="mt-1 font-sans text-[10px] sm:text-[11px] opacity-70 truncate">
                      {card.subtitle}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* BEAT 1: Clean Hero Copy */}
          <motion.div
            style={{ scale: heroScale, opacity: heroOpacity, filter: heroBlur }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center pb-[26vh] sm:pb-[28vh] lg:pb-0 px-5 text-center pointer-events-none"
          >
            <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full  backdrop-blur-md border border-cobalt/10 px-4 py-1.5 mb-4 sm:mb-5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cobalt" />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-ink/85">
                Обучение от 2 лет · 7 локаций · Тренеры КМС
              </span>
            </div>

            <h1 className="max-w-5xl px-4 py-1 sm:py-2 overflow-visible">
              <span className="block font-display font-bold uppercase tracking-tight leading-[1.06] text-[clamp(2.5rem,6.8vw,6.4rem)] frost-text drop-shadow-[0_2px_14px_rgba(255,255,255,0.85)]">
                ЛЁД. ГРАЦИЯ.
              </span>
              <span className="block font-serif italic font-semibold tracking-normal leading-[1.05] text-[clamp(2.9rem,7.8vw,7.2rem)] text-cobalt px-3 pb-1 drop-shadow-[0_4px_24px_rgba(255,255,255,0.95)]">
                Angel.Team
              </span>
            </h1>

            <p className="mt-3 sm:mt-4 max-w-md text-xs sm:text-base text-ink/85 font-medium leading-relaxed drop-shadow-[0_1px_10px_rgba(255,255,255,0.95)]">
              Грация, воплощённая в движении. Прокрутите вниз, чтобы скользить по льду к дальнему
              борту арены и изучить элементы.
            </p>

            <div className="pointer-events-auto mt-5 sm:mt-7 flex items-center justify-center">
              <MagneticButton
                label="Записаться на пробное"
                variant="cobalt"
                onClick={() => onOpenBooking('Пробная тренировка')}
              />
            </div>
          </motion.div>

          {/* BEAT 2: Far Board Glass Gallery UI */}
          <motion.div
            style={{ opacity: boardUiOpacity, y: boardUiY }}
            className={`pointer-events-none absolute inset-0 z-30 ${
              focusedCard || !atFarBoard ? 'invisible' : 'visible'
            }`}
          >
            <div className="hidden pointer-events-auto absolute left-6 sm:left-8 top-1/2 -translate-y-1/2 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => stepBoardWalk(-1)}
                aria-label="Предыдущий элемент"
                className="h-12 w-12 rounded-full border border-ink/35 bg-white/85 backdrop-blur-md hover:bg-ink hover:text-white flex items-center justify-center transition-colors shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => stepBoardWalk(1)}
                aria-label="Следующий элемент"
                className="h-12 w-12 rounded-full border border-ink/35 bg-white/85 backdrop-blur-md hover:bg-ink hover:text-white flex items-center justify-center transition-colors shadow-sm"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="absolute left-6 sm:left-8 bottom-7 max-w-2xl">
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/80">
                ДАЛЬНИЙ БОРТ АРЕНЫ // ГАЛЕРЕЯ НА СТЁКЛАХ
              </div>
              <div className="mt-1 font-display font-bold uppercase tracking-tight leading-[1.15] text-[clamp(2.4rem,6vw,5.4rem)] frost-text drop-shadow-[0_2px_14px_rgba(255,255,255,0.85)]">
                ЭЛЕМЕНТЫ ЛЬДА
              </div>
            </div>

            <div className="hidden sm:block absolute right-8 bottom-8 text-right font-mono text-[10.5px] uppercase tracking-[0.13em] text-ink/75 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-full border border-ink/10">
              Потяните экран влево/вправо или жмите стрелки · Клик — открыть элемент
            </div>
          </motion.div>

          {/* Focus Detail Overlay */}
          <AnimatePresence>
            {focusedCard && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-glacial/60 backdrop-blur-md flex items-end md:items-center justify-center md:justify-end p-5 sm:p-10"
                onClick={() => setFocusedCard(null)}
              >
                <button
                  type="button"
                  onClick={() => setFocusedCard(null)}
                  aria-label="Закрыть"
                  className="fixed top-24 left-6 z-50 h-11 w-11 rounded-full bg-ink text-white flex items-center justify-center hover:bg-cobalt transition-colors shadow-xl"
                >
                  <X className="w-5 h-5" />
                </button>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full md:w-[46%] lg:w-[42%] rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 p-6 sm:p-8 shadow-2xl"
                >
                  <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-cobalt">
                    <span>{focusedCard.category}</span>
                    <span>·</span>
                    <span>{focusedCard.code}</span>
                  </div>
                  <h2 className="mt-2 font-display font-bold text-4xl sm:text-5xl uppercase tracking-tight text-ink">
                    {focusedCard.title}
                  </h2>
                  <p className="mt-1 font-serif italic text-xl text-slate-muted">
                    {focusedCard.subtitle}
                  </p>

                  <div className="my-5 grid grid-cols-2 gap-3 border-y border-ink/10 py-4 font-mono text-xs">
                    <div>
                      <div className="text-slate-muted uppercase text-[10px]">Уровень</div>
                      <div className="mt-1 text-ink font-medium">{focusedCard.level}</div>
                    </div>
                    <div>
                      <div className="text-slate-muted uppercase text-[10px]">Показатель</div>
                      <div className="mt-1 text-cobalt font-medium">{focusedCard.metric}</div>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-muted leading-relaxed">
                    {focusedCard.note}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const title = focusedCard.title;
                        setFocusedCard(null);
                        onOpenBooking(`Элемент: ${title}`);
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-cobalt hover:bg-cobalt-deep text-white px-6 py-3 font-mono text-xs uppercase tracking-[0.09em] transition-colors"
                    >
                      <span>Отработать на льду</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setFocusedCard(null)}
                      className="rounded-full border border-ink/20 hover:border-ink px-5 py-3 font-mono text-xs uppercase tracking-[0.09em] text-ink transition-colors"
                    >
                      Закрыть
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* SECTION 2: #about — seamlessly shares the sticky background stage as Plate 3 crossfades in! */}
      <div ref={aboutWrapperRef} className="relative z-10">
        <AboutContentBlock onOpenBooking={onOpenBooking} />
      </div>
    </div>
  );
};