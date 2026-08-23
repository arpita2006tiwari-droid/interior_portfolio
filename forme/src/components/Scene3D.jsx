import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, BakeShadows, PerspectiveCamera } from '@react-three/drei';
import LivingRoom from '../scenes/LivingRoom';
import Kitchen from '../scenes/Kitchen';
import Bathroom from '../scenes/Bathroom';
import Hall from '../scenes/Hall';
import WholeHome from '../scenes/WholeHome';
import { useMouseParallax } from '../hooks/useMouseParallax';
import { useCursor } from '../context/CursorContext';

export default function Scene3D() {
  const mouse = useMouseParallax(0.5);
  const { setCursorState } = useCursor();
  const [sceneIndex, setSceneIndex] = useState(0);

  const scenes = [
    { component: LivingRoom, name: 'LIVING ROOM' },
    { component: Kitchen, name: 'KITCHEN' },
    { component: Bathroom, name: 'BATHROOM' },
    { component: Hall, name: 'HALL' },
    { component: WholeHome, name: 'WHOLE HOME' }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSceneIndex((prev) => (prev + 1) % scenes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [scenes.length]);

  const CurrentScene = scenes[sceneIndex].component;
  const currentName = scenes[sceneIndex].name;

  return (
    <div 
      className="w-full h-full cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setCursorState('DRAG')}
      onMouseLeave={() => setCursorState('DEFAULT')}
      onMouseDown={() => setCursorState('DRAG')}
      onMouseUp={() => setCursorState('DRAG')}
    >
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[15, 15, 15]} fov={30} />
        <color attach="background" args={['#F5F0E8']} />
        
        {/* Cinematic Lighting */}
        <ambientLight intensity={0.4} color="#f4efe7" />
        <directionalLight 
          position={[5, 5, -2]} 
          intensity={1.2} 
          castShadow 
          shadow-mapSize={1024}
          color="#ffeedd"
        />
        <pointLight position={[-2, 3, 2]} intensity={0.5} color="#e9e1d4" />
        

        
        <Suspense fallback={null}>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />
          <CurrentScene key={sceneIndex} mouse={mouse} />
          <ContactShadows position={[0, -1.49, 0]} opacity={0.4} scale={15} blur={2.5} far={4} />
          <Environment preset="city" blur={0.8} />
          <BakeShadows />
        </Suspense>
      </Canvas>
      
      {/* Scene Label Overlay */}
      <div className="absolute bottom-10 right-10 z-20 pointer-events-none mix-blend-difference text-white">
        <div className="mono text-xs tracking-widest opacity-50 mb-1">CURRENTLY VIEWING</div>
        <div className="text-xl tracking-widest">{currentName}</div>
      </div>
    </div>
  );
}
