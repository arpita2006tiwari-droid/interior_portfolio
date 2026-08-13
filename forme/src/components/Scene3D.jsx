import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, BakeShadows } from '@react-three/drei';
import LivingRoom from '../scenes/LivingRoom';
import { useMouseParallax } from '../hooks/useMouseParallax';
import { useCursor } from '../context/CursorContext';

export default function Scene3D() {
  const mouse = useMouseParallax(0.5);
  const { setCursorState } = useCursor();

  return (
    <div 
      className="w-full h-full cursor-none"
      onMouseEnter={() => setCursorState('DRAG')}
      onMouseLeave={() => setCursorState('DEFAULT')}
      onMouseDown={() => setCursorState('DRAG')}
      onMouseUp={() => setCursorState('DRAG')}
    >
      <Canvas shadows camera={{ position: [15, 15, 15], fov: 20 }}>
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
          <LivingRoom mouse={mouse} />
          <ContactShadows position={[0, -1.49, 0]} opacity={0.4} scale={15} blur={2.5} far={4} />
          <Environment preset="city" blur={0.8} />
          <BakeShadows />
        </Suspense>
      </Canvas>
    </div>
  );
}
