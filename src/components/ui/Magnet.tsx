import React, { useRef, useState } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 60,
  strength = 4,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    if (
      Math.abs(dx) < rect.width / 2 + padding &&
      Math.abs(dy) < rect.height / 2 + padding
    ) {
      setActive(true);
      setPos({ x: dx / strength, y: dy / strength });
    } else {
      setActive(false);
      setPos({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setActive(false);
    setPos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      <div
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          transition: active
            ? 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            : 'transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
};
