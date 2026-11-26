import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] rounded-full bg-ink text-white px-5 py-2.5 font-mono text-xs tracking-wider shadow-2xl border border-white/10"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
