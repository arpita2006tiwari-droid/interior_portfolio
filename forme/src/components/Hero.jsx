import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import heroBg from '../assets/hero-bg.jpg';

export default function Hero() {
  const { setCursorState } = useCursor();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 1.0,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  const textRevealVariants = {
    hidden: { y: '100%' },
    visible: { 
      y: 0, 
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section className="relative w-full h-screen flex flex-col md:flex-row overflow-hidden bg-[var(--color-background)]">
      {/* Left Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full md:w-1/2 h-full flex flex-col justify-center px-6 md:px-16 pt-32 md:pt-0 z-10"
      >
        <motion.div variants={itemVariants} className="overflow-hidden mb-8">
          <div className="mono text-xs tracking-widest text-[var(--color-sage)] uppercase">
            CREATING HOMES SUSTAINABLE REASONABLY
          </div>
        </motion.div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8 text-balance font-light">
          <div className="overflow-hidden py-1">
            <motion.div variants={textRevealVariants}>
              Spaces that
            </motion.div>
          </div>
          <div className="overflow-hidden py-1">
            <motion.div variants={textRevealVariants}>
              <span className="italic-serif text-[var(--color-terracotta)] pr-4">inspire.</span>
            </motion.div>
          </div>
        </h1>

        <motion.p variants={itemVariants} className="text-lg md:text-xl max-w-md opacity-70 mb-12 font-light leading-relaxed">
          Comprehensive service provider from past 35 Years for interior design, renovation and turnkey project execution.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 items-start sm:items-center">
          <a
            href="#projects"
            className="group flex items-center space-x-2 text-sm mono tracking-wide hover:opacity-70 transition-opacity overflow-hidden"
            onMouseEnter={() => setCursorState('VIEW')}
            onMouseLeave={() => setCursorState('DEFAULT')}
          >
            <span className="border-b border-black pb-1 relative">
              <span className="relative z-10">Explore our work</span>
              <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black origin-left transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100 z-20"></span>
            </span>
            <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500 ease-[0.16,1,0.3,1]">↗</span>
          </a>
          
          <a
            href="#contact"
            className="text-sm mono tracking-wide opacity-50 hover:opacity-100 transition-opacity relative group"
            onMouseEnter={() => setCursorState('VIEW')}
            onMouseLeave={() => setCursorState('DEFAULT')}
          >
            Begin a conversation
            <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-black/50 origin-right transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100 group-hover:origin-left"></span>
          </a>
        </motion.div>
      </motion.div>

      {/* Right Image Scene */}
      <div className="absolute inset-0 md:relative w-full md:w-1/2 h-full z-0 opacity-40 md:opacity-100 pointer-events-none md:pointer-events-auto overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.15, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full relative"
          style={{ y }}
        >
          <img 
            src={heroBg} 
            alt="Premium Interior" 
            className="w-full h-[120%] object-cover absolute top-[-10%]"
          />
          {/* Subtle gradient overlay for blending and text readability on mobile */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)] via-transparent to-transparent md:bg-none" />
        </motion.div>
      </div>
    </section>
  );
}
