import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

export default function Contact() {
  const { setCursorState } = useCursor();
  
  // Magnetic Button Logic
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.3;
    const y = (e.clientY - (top + height / 2)) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setCursorState('DEFAULT');
  };

  return (
    <section id="contact" className="w-full bg-[var(--color-terracotta)] text-[#f4efe7] pt-32 pb-16 px-6 md:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16">
        <div>
          <h2 className="text-5xl md:text-8xl leading-none mb-12">
            Let's create <br />
            something <br />
            <span className="italic-serif">meaningful.</span>
          </h2>
          <a 
            href="mailto:hello@forme.studio" 
            className="text-2xl md:text-3xl hover:opacity-70 transition-opacity"
            onMouseEnter={() => setCursorState('VIEW')}
            onMouseLeave={() => setCursorState('DEFAULT')}
          >
            hello@forme.studio
          </a>
        </div>
        
        <div className="flex flex-col items-start md:items-end w-full md:w-auto">
          <ul className="flex space-x-6 mb-16 mono text-sm opacity-80">
            <li><a href="#" className="hover:opacity-100 transition-opacity">Instagram</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">Pinterest</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">LinkedIn</a></li>
          </ul>
          
          <motion.a
            href="mailto:hello@forme.studio"
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setCursorState('VIEW')}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-[var(--color-dark)] text-[#f4efe7] flex items-center justify-center text-sm mono uppercase tracking-wider relative overflow-hidden group"
          >
            <span className="z-10 group-hover:scale-110 transition-transform duration-500 flex items-center space-x-2">
              <span>Start a project</span>
              <span className="text-xl">↗</span>
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
