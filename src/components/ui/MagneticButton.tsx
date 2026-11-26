import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Magnet } from './Magnet';

interface MagneticButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'cobalt' | 'ink' | 'outline' | 'light';
  className?: string;
  showArrow?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  label,
  onClick,
  variant = 'cobalt',
  className = '',
  showArrow = true,
}) => {
  const styles: Record<string, string> = {
    cobalt: 'frost-btn text-white',
    ink: 'frost-surface text-white border border-white/25 hover:border-sky-300/70',
    outline:
      'bg-white/60 backdrop-blur-md text-ink border border-ink/20 hover:border-cobalt hover:bg-cobalt hover:text-white',
    light:
      'bg-white/90 backdrop-blur-md text-ink border border-white hover:bg-sky-200 shadow-lg',
  };

  return (
    <Magnet padding={40} strength={5}>
      <button
        type="button"
        onClick={onClick}
        className={`group inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 font-mono text-xs sm:text-[13px] font-medium uppercase tracking-[0.09em] transition-all duration-300 ${styles[variant]} ${className}`}
      >
        <span>{label}</span>
        {showArrow && (
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </button>
    </Magnet>
  );
};
