import React, { useRef } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';

interface WordProps {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}

const Word: React.FC<WordProps> = ({ word, range, progress }) => {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <span className="relative inline-block mr-[0.26em] mb-[0.06em]">
      <span className="opacity-15 select-none" aria-hidden="true">
        {word}
      </span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0">
        {word}
      </motion.span>
    </span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.4'],
  });

  const words = text.split(' ');

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, idx) => {
        const start = idx / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={`${word}-${idx}`} word={word} range={[start, end]} progress={scrollYProgress} />
        );
      })}
    </p>
  );
};
