import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { projects } from '../data/projects';
import LivingRoom from '../scenes/LivingRoom';
import Kitchen from '../scenes/Kitchen';
import Bathroom from '../scenes/Bathroom';
import Hall from '../scenes/Hall';
import WholeHome from '../scenes/WholeHome';
import DiningRoom from '../scenes/DiningRoom';
import { useCursor } from '../context/CursorContext';
import { X } from 'lucide-react';

export default function ProjectGrid() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const { setCursorState } = useCursor();

  const getSceneForProject = (id) => {
    switch (id) {
      case 'casa-aurelia': return WholeHome;
      case 'the-quiet-house': return LivingRoom;
      case 'atelier-47': return Hall;
      case 'olive-kitchen': return Kitchen;
      case 'the-dining-room': return DiningRoom;
      case 'stone-and-steam': return Bathroom;
      default: return LivingRoom;
    }
  };

  // Prevent scroll when overlay is open
  useEffect(() => {
    if (selectedProject) {
      document.documentElement.classList.add('lenis-stopped');
    } else {
      document.documentElement.classList.remove('lenis-stopped');
    }
  }, [selectedProject]);

  return (
    <section id="projects" className="w-full bg-[var(--color-background)] py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl mb-24 text-balance"
        >
          A collection of <br />
          <span className="italic-serif text-[var(--color-sage)]">considered spaces.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id}
              layoutId={`project-container-${project.id}`}
              className={`group cursor-none relative flex flex-col ${idx % 2 !== 0 ? 'md:mt-32' : ''}`}
              onMouseEnter={() => {
                setHoveredProject(project.id);
                setCursorState('EXPLORE');
              }}
              onMouseLeave={() => {
                setHoveredProject(null);
                setCursorState('DEFAULT');
              }}
              onClick={() => {
                setCursorState('DEFAULT');
                setSelectedProject(project);
              }}
            >
              <div className="w-full aspect-[4/5] bg-[var(--color-dark)] relative overflow-hidden mb-6 rounded-sm">
                <motion.div 
                  layoutId={`project-image-${project.id}`}
                  className="w-full h-full"
                >
                  <Canvas shadows camera={{ position: [15, 15, 15], fov: 30 }}>
                    <ambientLight intensity={0.4} color="#f4efe7" />
                    <directionalLight 
                      position={[5, 5, -2]} 
                      intensity={1.2} 
                      castShadow 
                    />
                    <pointLight position={[-2, 3, 2]} intensity={0.5} color="#e9e1d4" />
                    {(() => {
                      const SceneComponent = getSceneForProject(project.id);
                      return <SceneComponent active={hoveredProject === project.id} />;
                    })()}
                  </Canvas>
                </motion.div>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="mono text-xs opacity-50">{project.number}</span>
                    <span className="mono text-xs tracking-widest">{project.category}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-light">{project.title}</h3>
                </div>
                <div className="transform group-hover:rotate-45 transition-transform duration-500">
                  <span className="text-xl">↗</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full-Screen Project Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="fixed inset-0 z-[100] bg-[var(--color-background)] overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <motion.div 
              layoutId={`project-container-${selectedProject.id}`}
              className="min-h-screen w-full relative pt-24 pb-32 px-6 md:px-12 flex flex-col"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 z-50 p-4 mix-blend-difference text-white hover:opacity-70 transition-opacity"
                onMouseEnter={() => setCursorState('VIEW')}
                onMouseLeave={() => setCursorState('DEFAULT')}
              >
                <X size={32} />
              </button>

              <div className="max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
                  <div>
                    <div className="mono text-sm opacity-50 mb-4">{selectedProject.number} — {selectedProject.category}</div>
                    <h2 className="text-5xl md:text-8xl font-light">{selectedProject.title}</h2>
                  </div>
                  <div className="mt-8 md:mt-0 text-right">
                    <div className="mono text-sm mb-2">{selectedProject.location}</div>
                    <div className="mono text-sm opacity-50">{selectedProject.year}</div>
                  </div>
                </div>

                <motion.div 
                  layoutId={`project-image-${selectedProject.id}`}
                  className="w-full h-[60vh] bg-[var(--color-dark)] relative overflow-hidden mb-16 rounded-sm"
                >
                  <Canvas shadows camera={{ position: [15, 15, 15], fov: 30 }}>
                    <ambientLight intensity={0.4} color="#f4efe7" />
                    <directionalLight 
                      position={[5, 5, -2]} 
                      intensity={1.2} 
                      castShadow 
                    />
                    <pointLight position={[-2, 3, 2]} intensity={0.5} color="#e9e1d4" />
                    {(() => {
                      const SceneComponent = getSceneForProject(selectedProject.id);
                      return <SceneComponent active={true} />;
                    })()}
                  </Canvas>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-lg">
                  <div className="md:col-span-4">
                    <h4 className="mono text-xs opacity-50 mb-6">CONCEPT</h4>
                    <p className="opacity-80 leading-relaxed">{selectedProject.concept}</p>
                  </div>
                  <div className="md:col-span-4 md:col-start-9">
                    <h4 className="mono text-xs opacity-50 mb-6">MATERIALS</h4>
                    <ul className="space-y-4 border-t border-black/10 pt-4">
                      {selectedProject.materialPalette.map((mat, i) => (
                        <li key={i} className="flex justify-between border-b border-black/10 pb-4">
                          <span>{mat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
