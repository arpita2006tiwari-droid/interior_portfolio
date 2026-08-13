import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const { cursorState } = useCursor();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (isMobile) return null;

  const variants = {
    DEFAULT: {
      width: 12,
      height: 12,
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      backgroundColor: 'var(--color-dark)',
      mixBlendMode: 'normal',
      opacity: 1
    },
    VIEW: {
      width: 64,
      height: 64,
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      backgroundColor: 'var(--color-beige)',
      mixBlendMode: 'normal',
      opacity: 0.9
    },
    EXPLORE: {
      width: 80,
      height: 80,
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      backgroundColor: 'var(--color-terracotta)',
      mixBlendMode: 'normal',
      opacity: 0.9
    },
    DRAG: {
      width: 64,
      height: 64,
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      backgroundColor: 'var(--color-dark)',
      mixBlendMode: 'normal',
      opacity: 0.8
    }
  };

  const getCursorText = () => {
    switch (cursorState) {
      case 'VIEW': return 'VIEW';
      case 'EXPLORE': return 'EXPLORE';
      case 'DRAG': return 'DRAG';
      default: return '';
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center text-[10px] mono text-[#f5f0e8] overflow-hidden shadow-sm"
      variants={variants}
      animate={cursorState}
      transition={{ type: 'spring', stiffness: 300, damping: 28, mass: 0.5 }}
    >
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: cursorState !== 'DEFAULT' ? 1 : 0, y: cursorState !== 'DEFAULT' ? 0 : 10 }}
        transition={{ duration: 0.2 }}
      >
        {getCursorText()}
      </motion.span>
    </motion.div>
  );
}
