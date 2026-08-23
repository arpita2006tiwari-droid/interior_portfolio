import React from 'react';
import { motion } from 'framer-motion';
import Scene3D from './Scene3D';
import { useCursor } from '../context/CursorContext';

export default function Hero() {
  const { setCursorState } = useCursor();

  return (
    <section className="relative w-full h-screen flex flex-col md:flex-row overflow-hidden bg-[var(--color-background)]">
      {/* Left Content */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-6 md:px-16 pt-32 md:pt-0 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mono text-xs tracking-widest text-[var(--color-sage)] mb-8 uppercase"
        >
          CREATING HOMES SUSTAINABLE REASONABLY
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8 text-balance"
        >
          Spaces that <br />
          <span className="italic-serif text-[var(--color-terracotta)]">inspire.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl max-w-md opacity-70 mb-12"
        >
          Comprehensive service provider from past 35 Years for interior design, renovation and turnkey project execution.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 items-start sm:items-center"
        >
          <a
            href="#projects"
            className="group flex items-center space-x-2 text-sm mono tracking-wide hover:opacity-70 transition-opacity"
            onMouseEnter={() => setCursorState('VIEW')}
            onMouseLeave={() => setCursorState('DEFAULT')}
          >
            <span className="border-b border-black pb-1">Explore our work</span>
            <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
          </a>
          
          <a
            href="#contact"
            className="text-sm mono tracking-wide opacity-50 hover:opacity-100 transition-opacity"
            onMouseEnter={() => setCursorState('VIEW')}
            onMouseLeave={() => setCursorState('DEFAULT')}
          >
            Begin a conversation
          </a>
        </motion.div>
      </div>

      {/* Right 3D Scene */}
      <div className="absolute inset-0 md:relative w-full md:w-1/2 h-full z-0 opacity-40 md:opacity-100 pointer-events-none md:pointer-events-auto">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="w-full h-full"
        >
          <Scene3D />
        </motion.div>
      </div>
    </section>
  );
}
