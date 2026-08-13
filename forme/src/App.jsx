import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { CursorProvider } from './context/CursorContext';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import ProjectGrid from './components/ProjectGrid';
import Materials from './components/Materials';
import Process from './components/Process';
import Philosophy from './components/Philosophy';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

    // Stop Lenis while loading
    if (loading) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  return (
    <CursorProvider>
      <div className="w-full min-h-screen relative text-balance">
        <CustomCursor />
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
        
        <Navbar />
        
        <main>
          <Hero />
          <Marquee />
          <About />
          <ProjectGrid />
          <Materials />
          <Process />
          <Philosophy />
          <Contact />
        </main>
        
        <Footer />
        
        {/* Global Noise Overlay */}
        <div className="noise" />
      </div>
    </CursorProvider>
  );
}

export default App;
