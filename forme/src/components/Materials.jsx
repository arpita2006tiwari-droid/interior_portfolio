import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const materials = [
  { id: 'stone', name: 'Natural Stone', color: '#D7C8B4' },
  { id: 'wood', name: 'Walnut Wood', color: '#4A3B2C' },
  { id: 'linen', name: 'Belgian Linen', color: '#E9E1D4' },
  { id: 'plaster', name: 'Limewash Plaster', color: '#F4EFE7' },
  { id: 'brass', name: 'Aged Brass', color: '#B7965A' },
];

export default function Materials() {
  const [activeMat, setActiveMat] = useState(materials[0]);

  return (
    <section className="relative w-full h-screen flex flex-col justify-center px-6 md:px-24 transition-colors duration-1000" style={{ backgroundColor: activeMat.color }}>
      <div className="absolute inset-0 bg-black/5 pointer-events-none" />
      
      <div className="z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="w-full md:w-1/2 mb-16 md:mb-0">
          <h3 className="mono text-sm tracking-widest mb-12 mix-blend-difference text-white opacity-60">MATERIALITY</h3>
          <ul className="space-y-6">
            {materials.map((mat) => (
              <li 
                key={mat.id}
                onMouseEnter={() => setActiveMat(mat)}
                className="cursor-none"
              >
                <motion.span 
                  className={`text-4xl md:text-6xl lg:text-7xl font-light transition-all duration-500 mix-blend-difference text-white ${activeMat.id === mat.id ? 'opacity-100 pl-4 md:pl-8 italic-serif' : 'opacity-40'}`}
                >
                  {mat.name}
                </motion.span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="w-full md:w-1/3 flex justify-end pr-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMat.id}
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.6 }}
              className="w-48 h-64 md:w-64 md:h-80 bg-white/10 backdrop-blur-md rounded-sm border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden"
            >
              {/* Fake a texture depending on the material, using CSS gradient/noise */}
              <div 
                className="w-full h-full opacity-50 mix-blend-overlay"
                style={{
                  background: activeMat.id === 'wood' ? 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)' : 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
