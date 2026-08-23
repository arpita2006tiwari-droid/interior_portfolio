import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const Stat = ({ num, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(num);
      if (start === end) return;
      
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / end));
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, stepTime);
      
      return () => clearInterval(timer);
    }
  }, [isInView, num]);

  return (
    <div ref={ref} className="flex flex-col border-t border-black/10 pt-4">
      <div className="text-4xl md:text-5xl font-light mb-2">
        {count.toString().padStart(2, '0')}
      </div>
      <div className="mono text-xs opacity-60 tracking-widest">{label}</div>
    </div>
  );
};

export default function About() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <section id="studio" className="w-full bg-[var(--color-background)] py-32 px-6 md:px-24">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16">
        {/* Left text */}
        <div className="w-full lg:w-1/2" ref={ref}>
          <motion.h2 
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="text-5xl md:text-7xl leading-tight text-balance mb-8"
          >
            We are a <br />
            <span className="italic-serif text-[var(--color-sage)]">team</span>
            <br />
            united by <br />
            <span className="italic-serif text-[var(--color-terracotta)]">design.</span>
          </motion.h2>
        </div>

        {/* Right Stats */}
        <div className="w-full lg:w-5/12 flex flex-col justify-end">
          <motion.div 
            className="grid grid-cols-2 gap-x-12 gap-y-16"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
            }}
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <Stat num="100" label="PROJECTS" />
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <Stat num="35" label="YEARS" />
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <Stat num="3" label="CITIES" />
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <Stat num="12" label="AWARDS" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
