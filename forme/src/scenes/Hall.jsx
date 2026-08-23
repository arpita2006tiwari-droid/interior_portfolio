import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Hall({ mouse = { x: 0, y: 0 }, active = false }) {
  const group = useRef();
  
  const materials = useMemo(() => ({
    wall: new THREE.MeshStandardMaterial({ color: '#EBE5D9', roughness: 0.9, metalness: 0.0 }), // Warm white
    floor: new THREE.MeshStandardMaterial({ color: '#8B6A4F', roughness: 0.8, metalness: 0.1 }), // Wood floor
    base: new THREE.MeshStandardMaterial({ color: '#1E1C19', roughness: 0.6 }),
    consoleWood: new THREE.MeshStandardMaterial({ color: '#3A2C20', roughness: 0.6, metalness: 0.1 }), // Dark wood console
    rug: new THREE.MeshStandardMaterial({ color: '#C8A97E', roughness: 1.0, metalness: 0 }), // Woven rug
    brass: new THREE.MeshStandardMaterial({ color: '#B7965A', roughness: 0.3, metalness: 0.8 }), // Fixtures
    ceramic: new THREE.MeshStandardMaterial({ color: '#F4EFE7', roughness: 0.2, metalness: 0 }),
    plantGreen: new THREE.MeshStandardMaterial({ color: '#4A5D4E', roughness: 0.9, metalness: 0.1 }),
    art: new THREE.MeshStandardMaterial({ color: '#2C3E50', roughness: 0.9 }),
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

      {/* Rug */}
      <mesh receiveShadow position={[0, 0.06, 0]}>
        <boxGeometry args={[2, 0.02, 6]} />
        <primitive object={materials.rug} attach="material" />
      </mesh>

      {/* Console Table */}
      <group position={[1.5, 0.05, -2.8]}>
        <mesh castShadow receiveShadow position={[0, 1.15, 0]}>
          <boxGeometry args={[3.5, 0.1, 0.8]} />
          <primitive object={materials.consoleWood} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[-1.6, 0.55, 0]}>
          <cylinderGeometry args={[0.05, 0.02, 1.1]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[1.6, 0.55, 0]}>
          <cylinderGeometry args={[0.05, 0.02, 1.1]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
        
        <mesh castShadow position={[-0.8, 1.4, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.4]} />
          <primitive object={materials.ceramic} attach="material" />
        </mesh>
        <mesh castShadow position={[1, 1.25, 0]}>
          <boxGeometry args={[0.4, 0.1, 0.3]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
      </group>

      {/* Art Piece */}
      <group position={[1.5, 2.5, -3.2]}>
        <mesh castShadow>
          <boxGeometry args={[2, 2.5, 0.1]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[1.8, 2.3]} />
          <primitive object={materials.art} attach="material" />
        </mesh>
        <mesh position={[0, 0, 0.07]}>
          <circleGeometry args={[0.5, 32]} />
          <meshStandardMaterial color="#E9E1D4" />
        </mesh>
      </group>

      {/* Light */}
      <group position={[0, 3.5, 0]}>
        <mesh castShadow position={[0, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.4, 0.3, 32]} />
          <primitive object={materials.ceramic} attach="material" />
        </mesh>
        <mesh castShadow position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <pointLight position={[0, -0.2, 0]} intensity={0.6} distance={6} color="#ffeedd" />
      </group>
      
      {/* Plant */}
      <group position={[-2.5, 0.05, -2.5]}>
        <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
           <cylinderGeometry args={[0.4, 0.3, 0.8, 32]} />
           <primitive object={materials.ceramic} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 1.5, 0]}>
           <cylinderGeometry args={[0.06, 0.1, 1.5]} />
           <primitive object={materials.consoleWood} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 2.2, 0]}>
           <sphereGeometry args={[0.7, 16, 16]} />
           <primitive object={materials.plantGreen} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0.4, 1.8, 0.2]}>
           <sphereGeometry args={[0.5, 16, 16]} />
           <primitive object={materials.plantGreen} attach="material" />
        </mesh>
      </group>
      
      {/* Bench */}
      <group position={[-2.5, 0.05, 1.5]}>
        <mesh castShadow receiveShadow position={[0, 0.45, 0]}>
          <boxGeometry args={[1, 0.1, 2.5]} />
          <primitive object={materials.consoleWood} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.2, -1]}>
          <boxGeometry args={[0.8, 0.4, 0.1]} />
          <primitive object={materials.consoleWood} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.2, 1]}>
          <boxGeometry args={[0.8, 0.4, 0.1]} />
          <primitive object={materials.consoleWood} attach="material" />
        </mesh>
      </group>
    </group>
  );
}
