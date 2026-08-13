import React from 'react';
import { motion } from 'framer-motion';

export default function Philosophy() {
  return (
    <section className="w-full bg-[var(--color-background)] py-40 px-6 flex items-center justify-center text-center">
      <motion.h2 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
        className="text-4xl md:text-6xl lg:text-8xl leading-snug"
      >
        <motion.span 
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}
          className="block font-light"
        >
          "The best interiors don't ask
        </motion.span>
        <motion.span 
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}
          className="block font-light"
        >
          to be noticed.
        </motion.span>
        <br />
        <motion.span 
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}
          className="block italic-serif text-[var(--color-terracotta)]"
        >
          They make you
        </motion.span>
        <motion.span 
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}
          className="block italic-serif text-[var(--color-terracotta)]"
        >
          want to stay."
        </motion.span>
      </motion.h2>
    </section>
  );
}
