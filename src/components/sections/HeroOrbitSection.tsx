import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, X } from 'lucide-react';
import { ORBIT_CARDS } from '../../data/orbitCards';
import { OrbitCardItem, OrbitCategory } from '../../types';
import { useWindowSize } from '../../hooks/useWindowSize';
import { MagneticButton } from '../ui/MagneticButton';

interface HeroOrbitSectionProps {
  onOpenBooking: (presetProgram?: string) => void;
  onNotify: (msg: string) => void;
}

interface SpringState {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  s: number;
  o: number;
  vx: number;
  vy: number;
  vz: number;
  vrx: number;
  vry: number;
  vrz: number;
  vs: number;
  vo: number;
}

const CATEGORIES: OrbitCategory[] = ['Все', 'Прыжки', 'Скольжение', 'Хореография', 'Спорт'];

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

export const HeroOrbitSection: React.FC<HeroOrbitSectionProps> = ({
  onOpenBooking,
  onNotify,
}) => {
  const { width, height } = useWindowSize();
  const isMobile = width < 768;

  const [layoutMode, setLayoutMode] = useState<'orbit' | 'grid'>('orbit');
  const [category, setCategory] = useState<OrbitCategory>('Все');
  const [focusedCard, setFocusedCard] = useState<OrbitCardItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const phaseRef = useRef(0);
  const phaseVRef = useRef(0);
  const mouseRef = useRef({ nx: 0.5, ny: 0.5 });

  // Sync interactive React state into refs so the rAF loop NEVER resets on hover/click!
  const layoutModeRef = useRef(layoutMode);
  const hoveredIdRef = useRef(hoveredId);
  const focusedCardRef = useRef(focusedCard);

  useEffect(() => {
    layoutModeRef.current = layoutMode;
  }, [layoutMode]);

  useEffect(() => {
    hoveredIdRef.current = hoveredId;
  }, [hoveredId]);

  useEffect(() => {
    focusedCardRef.current = focusedCard;
  }, [focusedCard]);

  const activeIndices = useMemo(() => {
    return ORBIT_CARDS.map((card, i) =>
      category === 'Все' || card.category === category ? i : -1
    ).filter((i) => i !== -1);
  }, [category]);

  const activeIndicesRef = useRef(activeIndices);
  useEffect(() => {
    activeIndicesRef.current = activeIndices;
  }, [activeIndices]);

  // Embers-style scroll-driven camera plate transition & split foreground ridges
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const plate1Scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const plate2Opacity = useTransform(scrollYProgress, [0.18, 0.78], [0, 1]);
  const plate2Scale = useTransform(scrollYProgress, [0.18, 1], [1.08, 1]);
  const leftMoundX = useTransform(scrollYProgress, [0, 0.7], ['0%', '-42%']);
  const rightMoundX = useTransform(scrollYProgress, [0, 0.7], ['0%', '42%']);

  const dragRef = useRef<{
    index: number | null;
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
    vx: number;
    vy: number;
    moved: boolean;
  }>({
    index: null,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    vx: 0,
    vy: 0,
    moved: false,
  });

  const springsRef = useRef<SpringState[]>(
    ORBIT_CARDS.map(() => ({
      x: width / 2,
      y: height / 2,
      z: -80,
      rx: 0,
      ry: 0,
      rz: 0,
      s: 0.25,
      o: 0,
      vx: 0,
      vy: 0,
      vz: 0,
      vrx: 0,
      vry: 0,
      vrz: 0,
      vs: 0,
      vo: 0,
    }))
  );

  // Precompute arc-length parameterized superellipse ring
  const ringPoints = useMemo(() => {
    const N = 360;
    const pts: { x: number; y: number; dist: number }[] = [];
    const rx = isMobile ? width * 0.44 : Math.min(width * 0.42, 620);
    const ry = isMobile ? height * 0.36 : Math.min(height * 0.39, 360);
    const cx = width / 2;
    const cy = height * 0.53;
    const exp = 0.62;
    let total = 0;

    for (let i = 0; i <= N; i++) {
      const a = (i / N) * Math.PI * 2;
      const ca = Math.cos(a);
      const sa = Math.sin(a);
      const x = cx + Math.sign(ca) * Math.pow(Math.abs(ca), exp) * rx;
      const y = cy + Math.sign(sa) * Math.pow(Math.abs(sa), exp) * ry;
      if (i > 0) {
        const dx = x - pts[i - 1].x;
        const dy = y - pts[i - 1].y;
        total += Math.hypot(dx, dy);
      }
      pts.push({ x, y, dist: total });
    }
    return { pts, total };
  }, [width, height, isMobile]);

  const ringPointsRef = useRef(ringPoints);
  useEffect(() => {
    ringPointsRef.current = ringPoints;
  }, [ringPoints]);

  const toggleLayout = (next: 'orbit' | 'grid') => {
    setLayoutMode(next);
    springsRef.current.forEach((st, i) => {
      st.vrz += (i % 2 === 0 ? 1 : -1) * 110;
      st.vz += 140;
    });
  };

  // Main requestAnimationFrame spring-physics loop (only depends on viewport size!)
  useEffect(() => {
    let rafId = 0;
    let lastTime = performance.now();
    const startTime = lastTime;

    const cardW = isMobile ? Math.min(width * 0.3, 128) : Math.max(134, Math.min(width * 0.115, 174));
    const cardH = cardW * 1.32;

    const sampleRing = (u: number) => {
      const { pts, total } = ringPointsRef.current;
      const wrapped = ((u % 1) + 1) % 1;
      const targetDist = wrapped * total;
      let lo = 0;
      let hi = pts.length - 1;
      while (lo < hi - 1) {
        const mid = (lo + hi) >> 1;
        if (pts[mid].dist < targetDist) lo = mid;
        else hi = mid;
      }
      const p0 = pts[lo];
      const p1 = pts[hi];
      const span = Math.max(0.0001, p1.dist - p0.dist);
      const t = (targetDist - p0.dist) / span;
      return {
        x: p0.x + (p1.x - p0.x) * t,
        y: p0.y + (p1.y - p0.y) * t,
      };
    };

    const tick = (now: number) => {
      const rawDt = Math.min((now - lastTime) / 1000, 0.033);
      lastTime = now;
      const elapsed = (now - startTime) / 1000;

      const curLayout = layoutModeRef.current;
      const curHovered = hoveredIdRef.current;
      const curFocused = focusedCardRef.current;
      const curActive = activeIndicesRef.current;

      // Gently pause orbit rotation while hovering a card so clicking is effortless
      if (curLayout === 'orbit' && !curFocused) {
        const driftSpeed = curHovered ? 0.004 : 0.036;
        phaseRef.current += (driftSpeed + phaseVRef.current) * rawDt;
        phaseVRef.current *= 0.93;
      }

      const activeCount = Math.max(1, curActive.length);
      const { nx, ny } = mouseRef.current;

      ORBIT_CARDS.forEach((card, i) => {
        const st = springsRef.current[i];
        const el = cardRefs.current[i];
        if (!el) return;

        const releaseTime = 0.12 + i * 0.055;
        const isReleased = elapsed >= releaseTime;
        const activePos = curActive.indexOf(i);
        const isActive = activePos !== -1;
        const isDragged = dragRef.current.index === i;
        const isHovered = curHovered === card.id && !isDragged && !curFocused;
        const isFocused = curFocused?.id === card.id;

        let tx = width / 2;
        let ty = height / 2;
        let tz = 0;
        let trx = 0;
        let try_ = 0;
        let trz = 0;
        let ts = 1;
        let to = 1;

        if (!isReleased) {
          tx = width / 2;
          ty = height * 0.48;
          tz = -100;
          ts = 0.25;
          to = 0;
        } else if (isDragged) {
          tx = dragRef.current.lastX;
          ty = dragRef.current.lastY;
          tz = 130;
          ts = 1.08;
          trz = card.baseTilt * 0.3 + Math.max(-22, Math.min(22, dragRef.current.vx * 1.6));
          try_ = Math.max(-24, Math.min(24, dragRef.current.vx * 2.2));
          trx = Math.max(-24, Math.min(24, -dragRef.current.vy * 2.2));
          to = 1;
        } else if (curFocused) {
          if (isFocused) {
            tx = isMobile ? width / 2 : width * 0.34;
            ty = isMobile ? height * 0.32 : height * 0.52;
            tz = 150;
            ts = isMobile ? 1.15 : 1.48;
            trz = 0;
            try_ = -10 + (nx - 0.5) * 10;
            trx = (ny - 0.5) * -8;
            to = 1;
          } else {
            const angle = (i / ORBIT_CARDS.length) * Math.PI * 2;
            tx = width / 2 + Math.cos(angle) * width * 0.72;
            ty = height / 2 + Math.sin(angle) * height * 0.72;
            tz = -160;
            ts = 0.65;
            to = 0;
          }
        } else if (!isActive) {
          tx = width / 2 + (i - 3.5) * 90;
          ty = height + cardH * 1.3;
          tz = -120;
          trz = card.baseTilt * 2.2;
          ts = 0.7;
          to = 0;
        } else if (curLayout === 'grid') {
          const cols = isMobile ? 2 : 4;
          const rows = Math.ceil(activeCount / cols);
          const col = activePos % cols;
          const row = Math.floor(activePos / cols);
          const gapX = isMobile ? cardW * 1.18 : cardW * 1.24;
          const gapY = isMobile ? cardH * 1.12 : cardH * 1.14;
          const gridW = (Math.min(cols, activeCount) - 1) * gapX;
          const gridH = (rows - 1) * gapY;
          tx = width / 2 - gridW / 2 + col * gapX + (nx - 0.5) * -10;
          ty = height * (isMobile ? 0.65 : 0.66) - gridH / 2 + row * gapY + (ny - 0.5) * -8;
          tz = isHovered ? 75 : 0;
          ts = isHovered ? 1.04 : isMobile ? 0.84 : 0.88;
          trz = isHovered ? 0 : card.baseTilt * 0.18;
          trx = isHovered ? 0 : (ny - 0.5) * -8;
          try_ = isHovered ? 0 : (nx - 0.5) * 10;
          to = 1;
        } else {
          // Orbit mode
          const u = phaseRef.current / (Math.PI * 2) + activePos / activeCount;
          const pt = sampleRing(u);
          const seed = Math.sin(i * 91.7) * 0.5 + 0.5;
          const depth = 0.6 + seed * 0.7;

          tx = pt.x + (nx - 0.5) * -22 * depth;
          ty = pt.y + (ny - 0.5) * -16 * depth + Math.sin(elapsed * 0.85 + i * 1.6) * 4;

          // Keep top-center clear for navbar
          const distFromTopCenter = Math.abs(tx - width / 2);
          if (ty < height * 0.3 && distFromTopCenter < width * 0.2) {
            const factor = 1 - distFromTopCenter / (width * 0.2);
            ty -= factor * 30;
            ts = 1 - factor * 0.12;
          }

          tz = isHovered ? 110 : (seed - 0.5) * 30;
          ts = isHovered ? 1.12 : ts;
          trz = isHovered ? 0 : card.baseTilt + Math.sin(elapsed * 0.7 + i) * 2;
          trx = isHovered ? 0 : (ny - 0.5) * -12;
          try_ = isHovered ? 0 : (nx - 0.5) * 16;
          to = 1;
        }

        const substeps = 4;
        const h = rawDt / substeps;
        const kXY = isDragged ? 380 : 125;
        const dXY = isDragged ? 30 : 18;

        for (let step = 0; step < substeps; step++) {
          st.vx += ((tx - st.x) * kXY - st.vx * dXY) * h;
          st.x += st.vx * h;
          st.vy += ((ty - st.y) * kXY - st.vy * dXY) * h;
          st.y += st.vy * h;

          st.vz += ((tz - st.z) * 145 - st.vz * 19) * h;
          st.z += st.vz * h;

          st.vrx += ((trx - st.rx) * 155 - st.vrx * 19) * h;
          st.rx += st.vrx * h;
          st.vry += ((try_ - st.ry) * 155 - st.vry * 19) * h;
          st.ry += st.vry * h;
          st.vrz += ((trz - st.rz) * 130 - st.vrz * 17) * h;
          st.rz += st.vrz * h;

          st.vs += ((ts - st.s) * 170 - st.vs * 21) * h;
          st.s += st.vs * h;
          st.vo += ((to - st.o) * 95 - st.vo * 18) * h;
          st.o += st.vo * h;
        }

        el.style.transform = `translate3d(${st.x - cardW / 2}px, ${st.y - cardH / 2}px, ${st.z}px) rotateZ(${st.rz}deg) rotateX(${st.rx}deg) rotateY(${st.ry}deg) scale(${st.s})`;
        el.style.opacity = `${Math.max(0, Math.min(1, st.o))}`;
        el.style.zIndex = isHovered || isFocused || isDragged ? '220' : `${Math.round(50 + st.z)}`;
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [width, height, isMobile]);

  const handleStageMouseMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current = {
      nx: x / Math.max(1, rect.width),
      ny: y / Math.max(1, rect.height),
    };

    if (dragRef.current.index !== null) {
      const dx = x - dragRef.current.lastX;
      const dy = y - dragRef.current.lastY;
      dragRef.current.vx = dx;
      dragRef.current.vy = dy;
      dragRef.current.lastX = x;
      dragRef.current.lastY = y;
      if (Math.hypot(x - dragRef.current.startX, y - dragRef.current.startY) > 6) {
        dragRef.current.moved = true;
      }
    }
  };

  const handlePointerUp = () => {
    if (dragRef.current.index !== null) {
      const idx = dragRef.current.index;
      if (dragRef.current.moved) {
        const st = springsRef.current[idx];
        st.vx = dragRef.current.vx * 55;
        st.vy = dragRef.current.vy * 55;
        const phrases = ['Чистый выезд!', 'Идеальная дуга.', 'Гравитация под контролем.'];
        onNotify(phrases[idx % phrases.length]);
      } else {
        setFocusedCard(ORBIT_CARDS[idx]);
      }
      dragRef.current.index = null;
    }
  };

  const cardW = isMobile ? Math.min(width * 0.3, 128) : Math.max(134, Math.min(width * 0.115, 174));
  const cardH = cardW * 1.32;

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={handleStageMouseMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative h-screen min-h-[720px] w-full overflow-hidden bg-glacial select-none"
    >
      {/* Layer 1: Detailed Architectural Ice Arena Plate (Embers-style intro zoom-out) */}
      <motion.div
        initial={{ scale: 1.18, opacity: 0.4 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.35, ease: [0.25, 1, 0.5, 1] }}
        style={{ scale: plate1Scale }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <img
          src="/images/hero-arena.jpg"
          alt="Ледовая арена Angel.Team"
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      {/* Layer 2: Angled Ice Arena Plate (crossfades smoothly on scroll like Embers Foundry) */}
      <motion.div
        style={{ opacity: plate2Opacity, scale: plate2Scale }}
        className="pointer-events-none absolute inset-0 z-[1]"
      >
        <img
          src="/images/arena-angle.jpg"
          alt="Панорама ледовой арены"
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      {/* Atmospheric Glacial Readability Veil */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            'radial-gradient(circle at 50% 44%, rgba(247,249,252,0.82) 0%, rgba(247,249,252,0.52) 42%, rgba(235,242,255,0.28) 72%, rgba(14,17,22,0.22) 100%)',
        }}
      />

      {/* Embers-style Split Crystalline Foreground Ridges (glide in on load, part on scroll) */}
      <motion.div
        initial={{ x: '-35%', opacity: 0 }}
        animate={{ x: '0%', opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
        style={{ x: leftMoundX }}
        className="pointer-events-none absolute bottom-0 left-0 z-[12] w-[55vw] h-[22vh] opacity-90"
      >
        <svg viewBox="0 0 800 260" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="iceRidgeL" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#DCE8FF" stopOpacity="0.92" />
              <stop offset="55%" stopColor="#F7F9FC" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.98" />
            </linearGradient>
          </defs>
          <path d="M0 40 L210 115 L440 190 L800 260 L0 260 Z" fill="url(#iceRidgeL)" />
          <path d="M0 40 L210 115 L440 190" stroke="#2563EB" strokeOpacity="0.25" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>

      <motion.div
        initial={{ x: '35%', opacity: 0 }}
        animate={{ x: '0%', opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
        style={{ x: rightMoundX }}
        className="pointer-events-none absolute bottom-0 right-0 z-[12] w-[55vw] h-[22vh] opacity-90"
      >
        <svg viewBox="0 0 800 260" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="iceRidgeR" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#DCE8FF" stopOpacity="0.92" />
              <stop offset="55%" stopColor="#F7F9FC" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.98" />
            </linearGradient>
          </defs>
          <path d="M800 40 L590 115 L360 190 L0 260 L800 260 Z" fill="url(#iceRidgeR)" />
          <path d="M800 40 L590 115 L360 190" stroke="#2563EB" strokeOpacity="0.25" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>

      {/* 3D Cards Stage */}
      <div className="stage-3d absolute inset-0 z-20 pointer-events-none">
        {ORBIT_CARDS.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            onPointerDown={(e) => {
              if (focusedCard) return;
              const rect = sectionRef.current?.getBoundingClientRect();
              if (!rect) return;
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              dragRef.current = {
                index: i,
                startX: x,
                startY: y,
                lastX: x,
                lastY: y,
                vx: 0,
                vy: 0,
                moved: false,
              };
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
                  ? '0 28px 60px -12px rgba(37, 99, 235, 0.35)'
                  : '0 22px 45px -16px rgba(14, 17, 22, 0.28)',
              borderColor:
                hoveredId === card.id
                  ? '#2563EB'
                  : card.bgColor === '#FFFFFF' || card.bgColor === '#F1F5F9'
                    ? 'rgba(14,17,22,0.12)'
                    : 'rgba(255,255,255,0.16)',
            }}
            className="card-3d pointer-events-auto absolute top-0 left-0 rounded-2xl border cursor-pointer active:cursor-grabbing overflow-hidden transition-shadow duration-200"
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

      {/* Central Hero Copy — fixed padding & line-height so text is NEVER clipped */}
      <div
        className={`relative z-30 flex h-full flex-col items-center justify-center px-5 text-center transition-all duration-500 pointer-events-none ${
          focusedCard
            ? 'opacity-0 scale-95'
            : layoutMode === 'grid'
              ? '-translate-y-[23vh] scale-[0.76]'
              : 'translate-y-0 scale-100'
        }`}
      >
        <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md border border-ink/10 px-4 py-1.5 mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-cobalt" />
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink/85">
            Школа фигурного катания · Дети и взрослые
          </span>
        </div>

        <h1 className="max-w-5xl px-4 py-2 overflow-visible">
          <span className="block font-display font-bold uppercase tracking-tight leading-[1.06] text-[clamp(2.6rem,6.6vw,6.2rem)] text-ink drop-shadow-[0_2px_18px_rgba(255,255,255,0.85)]">
            ЛЁД. ГРАЦИЯ.
          </span>
          <span className="block font-serif italic font-semibold tracking-normal leading-[1.05] text-[clamp(3rem,7.6vw,7rem)] text-cobalt px-3 pb-1 drop-shadow-[0_4px_24px_rgba(255,255,255,0.9)]">
            Angel.Team
          </span>
        </h1>

        <p className="mt-3 max-w-md text-sm sm:text-base text-ink/80 font-medium leading-relaxed drop-shadow-[0_1px_10px_rgba(255,255,255,0.9)]">
          Ставим технику скольжения, уверенные прыжки и авторскую хореографию на аренах Океанис,
          РИО и МЕГА.
        </p>

        <div className="pointer-events-auto mt-6 flex items-center justify-center">
          <MagneticButton
            label="Записаться на пробное"
            variant="cobalt"
            onClick={() => onOpenBooking('Пробная тренировка')}
          />
        </div>

        {/* Category Filter Chips */}
        <div className="pointer-events-auto mt-5 flex flex-wrap items-center justify-center gap-1.5">
          {CATEGORIES.map((cat) => {
            const active = category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-all ${
                  active
                    ? 'bg-ink text-white shadow-md'
                    : 'bg-white/85 backdrop-blur-sm text-ink/80 hover:bg-white border border-ink/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Corner Hints & Layout Switch (kept ONLY here at bottom-right) */}
      <div className="pointer-events-none absolute bottom-6 inset-x-6 z-30 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.1em] text-ink/70">
        <span className="hidden md:inline bg-white/75 backdrop-blur-sm px-3 py-1.5 rounded-full border border-ink/10">
          Кликните карточку для деталей · Перетащите для броска
        </span>
        <div className="pointer-events-auto ml-auto inline-flex rounded-full bg-white/90 backdrop-blur-md border border-ink/10 p-1 shadow-md">
          <button
            type="button"
            onClick={() => toggleLayout('orbit')}
            className={`rounded-full px-3.5 py-1.5 transition-colors ${
              layoutMode === 'orbit' ? 'bg-ink text-white' : 'text-ink/75 hover:text-ink'
            }`}
          >
            Орбита
          </button>
          <button
            type="button"
            onClick={() => toggleLayout('grid')}
            className={`rounded-full px-3.5 py-1.5 transition-colors ${
              layoutMode === 'grid' ? 'bg-ink text-white' : 'text-ink/75 hover:text-ink'
            }`}
          >
            Сетка
          </button>
        </div>
      </div>

      {/* Focus Detail Overlay */}
      <AnimatePresence>
        {focusedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-glacial/75 backdrop-blur-md flex items-end md:items-center justify-center md:justify-end p-5 sm:p-10"
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
              className="w-full md:w-[46%] lg:w-[42%] rounded-3xl bg-white border border-ink/10 p-6 sm:p-8 shadow-2xl"
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
                  Назад к орбите
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
