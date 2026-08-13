import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ProjectScene({ color, active }) {
  const meshRef = useRef();
  
  const materials = useMemo(() => ({
    base: new THREE.MeshStandardMaterial({ color: color, roughness: 0.8 }),
    accent: new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.2 }),
    wood: new THREE.MeshStandardMaterial({ color: '#8B6A4F', roughness: 0.8 }),
    plant: new THREE.MeshStandardMaterial({ color: '#6D765F', roughness: 0.9 })
  }), [color]);
  
  useFrame((state) => {
    if (meshRef.current) {
      if (active) {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, state.clock.getElapsedTime() * 0.1, 0.05);
      } else {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, Math.PI / 4, 0.05);
      }
    }
  });

  return (
    <group ref={meshRef}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
      
      {/* Diorama Base */}
      <mesh castShadow receiveShadow position={[0, -1, 0]}>
        <boxGeometry args={[3, 0.2, 3]} />
        <primitive object={materials.base} attach="material" />
      </mesh>
      
      {/* Wall with Arch */}
      <group position={[0, 0.5, -1]}>
        <mesh castShadow receiveShadow position={[-0.8, 0, 0]}>
          <boxGeometry args={[1.4, 3, 0.2]} />
          <primitive object={materials.base} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0.8, 0, 0]}>
          <boxGeometry args={[1.4, 3, 0.2]} />
          <primitive object={materials.base} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 1, 0]}>
          <boxGeometry args={[0.2, 1, 0.2]} />
          <primitive object={materials.base} attach="material" />
        </mesh>
        {/* Curved arch top */}
        <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
           <cylinderGeometry args={[0.8, 0.8, 0.2, 32, 1, false, 0, Math.PI]} />
           <primitive object={materials.base} attach="material" />
        </mesh>
      </group>

      {/* Stairs */}
      <group position={[-0.5, -0.9, 0.5]}>
        <mesh castShadow receiveShadow position={[0, 0.1, 0]}>
           <boxGeometry args={[1, 0.2, 0.4]} />
           <primitive object={materials.accent} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.3, -0.4]}>
           <boxGeometry args={[1, 0.2, 0.4]} />
           <primitive object={materials.accent} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.5, -0.8]}>
           <boxGeometry args={[1, 0.2, 0.4]} />
           <primitive object={materials.accent} attach="material" />
        </mesh>
      </group>

      {/* Abstract Plant */}
      <group position={[0.8, -0.8, 0.8]}>
        <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
           <cylinderGeometry args={[0.2, 0.15, 0.4]} />
           <primitive object={materials.wood} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.6, 0]}>
           <sphereGeometry args={[0.3, 16, 16]} />
           <primitive object={materials.plant} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0.1, 0.8, 0.1]}>
           <sphereGeometry args={[0.2, 16, 16]} />
           <primitive object={materials.plant} attach="material" />
        </mesh>
      </group>
    </group>
  );
}
