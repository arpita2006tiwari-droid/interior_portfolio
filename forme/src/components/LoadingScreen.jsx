import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 800);
        }, 400);
      }
      setProgress(currentProgress);
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--color-dark)] text-[var(--color-primary)]"
        >
          <div className="flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl mb-4 tracking-wide font-light">FORMÉ</h1>
            <p className="mono text-xs md:text-sm text-[var(--color-beige)] opacity-80 mb-12">
              Interior Architecture Studio
            </p>
            <p className="mono text-[10px] mb-8 text-[var(--color-beige)] opacity-50">2026</p>
            
            <div className="w-48 md:w-64 h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-[var(--color-gold)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>
            
            <div className="mono text-[10px] mt-4 opacity-50 w-48 md:w-64 text-right">
              {Math.floor(progress)}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
