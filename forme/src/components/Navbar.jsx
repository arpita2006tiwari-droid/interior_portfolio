import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useCursor } from '../context/CursorContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setCursorState } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Projects', 'Studio', 'Process', 'Contact'];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-[110] transition-all duration-500 flex items-center justify-between px-6 md:px-12 py-6 ${
          scrolled && !mobileMenuOpen ? 'bg-[var(--color-background)]/80 backdrop-blur-md border-b border-black/5' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1 }}
      >
        <div className={`text-2xl tracking-widest font-light transition-colors duration-500 ${mobileMenuOpen ? 'text-[var(--color-primary)]' : ''}`}>Rahul Interiors</div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-12">
          <ul className="flex space-x-8 text-sm mono">
            {navLinks.map((link) => (
              <li key={link}>
                <a 
                  href={`#${link.toLowerCase()}`} 
                  className="relative group py-1"
                  onMouseEnter={() => setCursorState('VIEW')}
                  onMouseLeave={() => setCursorState('DEFAULT')}
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:opacity-70">{link}</span>
                  <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black origin-left transform scale-x-0 transition-transform duration-300 ease-[0.76,0,0.24,1] group-hover:scale-x-100 z-20"></span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="group relative overflow-hidden text-xs uppercase tracking-wider mono border border-black/20 px-6 py-3 rounded-full transition-colors flex items-center space-x-2"
            onMouseEnter={() => setCursorState('VIEW')}
            onMouseLeave={() => setCursorState('DEFAULT')}
          >
            <span className="absolute inset-0 bg-black transform scale-y-0 origin-bottom transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:scale-y-100"></span>
            <span className="relative z-10 group-hover:text-[var(--color-primary)] transition-colors duration-500">Start a project</span>
            <span className="relative z-10 text-[10px] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500 group-hover:text-[var(--color-primary)]">↗</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden z-[120] relative p-2 -mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} color="#f5f0e8" /> : <Menu size={28} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[105] bg-[var(--color-dark)] text-[var(--color-primary)] flex flex-col justify-center px-12"
          >
            <ul className="flex flex-col space-y-8 text-4xl font-light">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  <a 
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:italic transition-all"
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-16 text-sm mono border-b border-[var(--color-beige)] pb-2 inline-block w-max opacity-80"
            >
              Start a project ↗
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
