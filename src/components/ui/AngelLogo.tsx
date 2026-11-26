import React from 'react';

interface AngelLogoProps {
  light?: boolean;
  className?: string;
}

export const AngelLogo: React.FC<AngelLogoProps> = ({ light = false, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <img
        src="/images/logo.png"
        alt="Angel.Team"
        className={`h-20 w-auto object-contain scale-150 transition-all duration-300 ${
          light ? 'brightness-0 invert' : ''
        }`}
      />

      {/* Если нет текста на лого */}
      {/* 
      <div className="flex flex-col leading-none">
        <span
          className={`font-display font-bold text-lg tracking-tight uppercase ${
            light ? 'text-white' : 'frost-text'
          }`}
        >
          ANGEL.TEAM
        </span>
        <span
          className={`font-mono text-[9px] uppercase tracking-[0.2em] ${
            light ? 'text-sky-200/80' : 'text-[#273D5C]/75'
          }`}
        >
          Figure Skating
        </span>
      </div>
      */}
      
    </div>
  );
};