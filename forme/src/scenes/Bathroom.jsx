import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Bathroom({ mouse = { x: 0, y: 0 }, active = false }) {
  const group = useRef();
  
  const materials = useMemo(() => ({
    wall: new THREE.MeshStandardMaterial({ color: '#E8EDE7', roughness: 0.9, metalness: 0.0 }), // Light greyish green
    floor: new THREE.MeshStandardMaterial({ color: '#333333', roughness: 0.7, metalness: 0.1 }), // Dark tiles
    base: new THREE.MeshStandardMaterial({ color: '#1E1C19', roughness: 0.6 }),
    wood: new THREE.MeshStandardMaterial({ color: '#6A4F3B', roughness: 0.7, metalness: 0.05 }), // Darker wood for vanity
    ceramic: new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: 0.1, metalness: 0.1 }), // Bathtub, sink
    brass: new THREE.MeshStandardMaterial({ color: '#C0A062', roughness: 0.3, metalness: 0.8 }), // Fixtures
    glass: new THREE.MeshPhysicalMaterial({ color: '#ffffff', transmission: 0.95, opacity: 1, metalness: 0.1, roughness: 0.1, ior: 1.5, thickness: 0.1 }),
    mirror: new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: 0.0, metalness: 1.0 }), // Mirror reflection
    plantGreen: new THREE.MeshStandardMaterial({ color: '#5C6E58', roughness: 0.9, metalness: 0.1 }),
  }), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        -1.5 + Math.sin(t) * 0.05,
        0.05
      );
      if (active) {
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, t * 0.05, 0.05);
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0, 0.05);
      } else {
        group.current.rotation.y = THREE.MathUtils.lerp(
          group.current.rotation.y,
          (mouse.x * Math.PI) / 8 + Math.PI / 4,
          0.05
        );
        group.current.rotation.x = THREE.MathUtils.lerp(
          group.current.rotation.x,
          (mouse.y * Math.PI) / 16,
          0.05
        );
      }
    }
  });

  return (
    <group ref={group} position={[0, -1.5, 0]}>
      <mesh castShadow receiveShadow position={[0, -0.15, 0]}>
        <boxGeometry args={[7.2, 0.3, 7.2]} />
        <primitive object={materials.base} attach="material" />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[7, 0.1, 7]} />
        <primitive object={materials.floor} attach="material" />
      </mesh>

      <mesh castShadow receiveShadow position={[0, 2, -3.4]}>
        <boxGeometry args={[7, 4, 0.2]} />
        <primitive object={materials.wall} attach="material" />
      </mesh>
      <mesh castShadow receiveShadow position={[-3.4, 2, 0]}>
        <boxGeometry args={[0.2, 4, 7]} />
        <primitive object={materials.wall} attach="material" />
      </mesh>

      {/* Freestanding Bathtub */}
      <group position={[-1, 0.45, 1.5]}>
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <cylinderGeometry args={[1, 0.8, 0.8, 32, 1, false, 0, Math.PI * 2]} />
          <primitive object={materials.ceramic} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.2, 32, 1, false, 0, Math.PI * 2]} />
          <primitive object={materials.ceramic} attach="material" />
        </mesh>
        <mesh position={[-1.2, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 1.2]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
        <mesh position={[-1, 1.1, 0]} rotation={[0, 0, -Math.PI/2]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.4]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
        <mesh position={[-0.8, 1.05, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.1]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
      </group>

      {/* Vanity Unit */}
      <group position={[1.5, 0.05, -2.8]}>
        <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
          <boxGeometry args={[2.5, 1, 1]} />
          <primitive object={materials.wood} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.6, 0.5, 0.2, 32]} />
          <primitive object={materials.ceramic} attach="material" />
        </mesh>
        <mesh position={[0, 1.3, -0.3]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.3]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
        <mesh position={[0, 1.45, -0.15]} rotation={[Math.PI/2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.3]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
      </group>

      {/* Mirror */}
      <group position={[1.5, 2.5, -3.2]}>
        <mesh castShadow>
          <cylinderGeometry args={[1, 1, 0.05, 32]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <mesh position={[0, 0, 0.03]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.95, 0.95, 0.02, 32]} />
          <primitive object={materials.mirror} attach="material" />
        </mesh>
      </group>
      
      {/* Sconces */}
      <group position={[1.5, 2.5, -3.2]}>
        <mesh castShadow position={[-1.4, 0, 0.1]}>
          <cylinderGeometry args={[0.05, 0.05, 0.4]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
        <pointLight position={[-1.4, 0, 0.3]} intensity={0.4} distance={3} color="#ffeedd" />
        
        <mesh castShadow position={[1.4, 0, 0.1]}>
          <cylinderGeometry args={[0.05, 0.05, 0.4]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
        <pointLight position={[1.4, 0, 0.3]} intensity={0.4} distance={3} color="#ffeedd" />
      </group>

      {/* Shower Glass */}
      <group position={[-2.2, 2, -1.5]}>
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[0.05, 4, 3]} />
          <primitive object={materials.glass} attach="material" />
        </mesh>
      </group>

      {/* Shower Head */}
      <group position={[-3.3, 3.2, -2.5]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.4]} rotation={[0, 0, Math.PI/2]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
        <mesh castShadow position={[0.2, -0.1, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.05]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
      </group>
      
      {/* Plant */}
      <group position={[2.8, 0.05, 2.8]}>
        <mesh castShadow receiveShadow position={[0, 0.25, 0]}>
           <cylinderGeometry args={[0.3, 0.2, 0.5, 32]} />
           <primitive object={materials.ceramic} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 1.2, 0]}>
           <sphereGeometry args={[0.5, 16, 16]} />
           <primitive object={materials.plantGreen} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.7, 0]}>
           <cylinderGeometry args={[0.05, 0.05, 0.6]} />
           <primitive object={materials.wood} attach="material" />
        </mesh>
      </group>
    </group>
  );
}
