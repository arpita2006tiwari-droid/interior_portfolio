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
          <div className="flex flex-col space-y-4">
            <a 
              href="mailto:rahulinterior07@gmail.com" 
              className="text-xl md:text-2xl hover:opacity-70 transition-opacity"
              onMouseEnter={() => setCursorState('VIEW')}
              onMouseLeave={() => setCursorState('DEFAULT')}
            >
              rahulinterior07@gmail.com
            </a>
            <a 
              href="mailto:rahulinteriors1985@gmail.com" 
              className="text-xl md:text-2xl hover:opacity-70 transition-opacity"
              onMouseEnter={() => setCursorState('VIEW')}
              onMouseLeave={() => setCursorState('DEFAULT')}
            >
              rahulinteriors1985@gmail.com
            </a>
            <p className="text-xl md:text-2xl mt-4">
              9769612993 | 9870342208 | 7384238713
            </p>
            <p className="text-base md:text-lg opacity-80 mt-4 max-w-sm">
              201, Neelyog Monarch, Pantnagar, Ghatkopar (East), Mumbai - 400075
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-start md:items-end w-full md:w-auto">
          <ul className="flex space-x-6 mb-16 mono text-sm opacity-80">
            <li><a href="https://instagram.com/rahulinteriorsdesign.hub" target="_blank" rel="noreferrer" className="hover:opacity-100 transition-opacity">Instagram</a></li>
          </ul>
          
          <motion.a
            href="mailto:rahulinterior07@gmail.com"
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
