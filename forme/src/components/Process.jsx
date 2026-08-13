import React from 'react';
import { motion } from 'framer-motion';

const stages = [
  { num: '01', title: 'Discover' },
  { num: '02', title: 'Concept' },
  { num: '03', title: 'Design' },
  { num: '04', title: 'Realise' },
];

export default function Process() {
  return (
    <section id="process" className="w-full bg-[var(--color-dark)] text-[#f4efe7] py-32 px-6 md:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-1/3">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl lg:text-6xl text-balance leading-tight"
          >
            From first sketch <br />
            <span className="italic-serif text-[var(--color-sage)]">to final detail.</span>
          </motion.h2>
        </div>

        <div className="w-full md:w-2/3 flex flex-col justify-center">
          {stages.map((stage, i) => (
            <div key={stage.num} className="relative py-8 flex items-center group">
              <motion.div 
                className="absolute top-0 left-0 h-[1px] bg-white/20"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.2 }}
              />
              <span className="mono text-sm opacity-50 w-16">{stage.num}</span>
              <span className="text-3xl md:text-5xl font-light transform transition-transform duration-500 group-hover:translate-x-4">
                {stage.title}
              </span>
            </div>
          ))}
          {/* Final bottom line */}
          <motion.div 
            className="h-[1px] bg-white/20 w-full mt-8"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </div>
      </div>
    </section>
  );
}
