import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function DiningRoom({ mouse = { x: 0, y: 0 }, active = false }) {
  const group = useRef();
  
  const materials = useMemo(() => ({
    wall: new THREE.MeshStandardMaterial({ color: '#1E1C19', roughness: 0.9, metalness: 0.0 }), // Dark Moody Walls
    floor: new THREE.MeshStandardMaterial({ color: '#A95E47', roughness: 0.9, metalness: 0.0 }), // Terracotta Floor
    base: new THREE.MeshStandardMaterial({ color: '#D7C8B4', roughness: 0.6 }), // Light base for contrast
    woodDark: new THREE.MeshStandardMaterial({ color: '#3A2C20', roughness: 0.7, metalness: 0.1 }), // Dining Table
    woodLight: new THREE.MeshStandardMaterial({ color: '#8B6A4F', roughness: 0.8, metalness: 0.05 }), // Chairs
    glass: new THREE.MeshPhysicalMaterial({ color: '#ffffff', transmission: 0.8, opacity: 1, metalness: 0.2, roughness: 0.1, ior: 1.5, thickness: 0.1 }), // Wine glasses/Vase
    ceramic: new THREE.MeshStandardMaterial({ color: '#F4EFE7', roughness: 0.2 }), // Plates
    brass: new THREE.MeshStandardMaterial({ color: '#C0A062', roughness: 0.3, metalness: 0.8 }), // Chandelier
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

      {/* Table */}
      <group position={[0.5, 0.05, 0]}>
        <mesh castShadow receiveShadow position={[0, 0.85, 0]}>
          <boxGeometry args={[4.6, 0.1, 2.0]} />
          <primitive object={materials.woodDark} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[-1.8, 0.4, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.8, 32]} />
          <primitive object={materials.woodDark} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[1.8, 0.4, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.8, 32]} />
          <primitive object={materials.woodDark} attach="material" />
        </mesh>

        {[[-1.4, 0.6], [0, 0.6], [1.4, 0.6], [-1.4, -0.6], [0, -0.6], [1.4, -0.6]].map((pos, idx) => (
          <group key={idx} position={[pos[0], 0.91, pos[1]]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.15, 0.12, 0.02, 32]} />
              <primitive object={materials.ceramic} attach="material" />
            </mesh>
            <mesh castShadow position={[0.25, 0.05, 0.15]}>
              <cylinderGeometry args={[0.04, 0.03, 0.1, 16]} />
              <primitive object={materials.glass} attach="material" />
            </mesh>
          </group>
        ))}

        <mesh castShadow receiveShadow position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.1, 0.2, 0.4, 32]} />
          <primitive object={materials.ceramic} attach="material" />
        </mesh>
      </group>

      {/* Chairs */}
      <group position={[0.5, 0.05, 0]}>
        {[
          [-1.4, 1.3, 0], [0, 1.3, 0], [1.4, 1.3, 0], 
          [-1.4, -1.3, Math.PI], [0, -1.3, Math.PI], [1.4, -1.3, Math.PI]
        ].map((pos, idx) => (
          <group key={idx} position={[pos[0], 0, pos[1]]} rotation={[0, pos[2], 0]}>
            <mesh castShadow receiveShadow position={[0, 0.25, 0]}>
              <cylinderGeometry args={[0.25, 0.25, 0.5, 32]} />
              <primitive object={materials.woodLight} attach="material" />
            </mesh>
            <mesh castShadow receiveShadow position={[0, 0.7, -0.15]}>
              <boxGeometry args={[0.4, 0.4, 0.05]} />
              <primitive object={materials.woodLight} attach="material" />
            </mesh>
          </group>
        ))}
      </group>

      {/* Chandelier */}
      <group position={[0.5, 3, 0]}>
        <mesh castShadow position={[0, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1.5]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
        <mesh castShadow position={[0, -0.7, 0]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 2.5]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
        
        {[-1.6, -0.8, 0, 0.8, 1.6].map((x, idx) => (
          <group key={idx} position={[x, -0.7, 0]}>
            <mesh castShadow position={[0, 0.1, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.15]} />
              <primitive object={materials.glass} attach="material" />
            </mesh>
            <pointLight position={[0, 0.2, 0]} intensity={0.4} distance={4} color="#ffeedd" />
          </group>
        ))}
      </group>

      {/* Mirror */}
      <group position={[-3.3, 1.8, 0]}>
        <mesh castShadow>
           <boxGeometry args={[0.1, 2, 3]} />
           <primitive object={materials.woodDark} attach="material" />
        </mesh>
        <mesh position={[0.06, 0, 0]} rotation={[0, Math.PI/2, 0]}>
           <planeGeometry args={[2.8, 1.8]} />
           <meshPhysicalMaterial color="#ffffff" metalness={1} roughness={0} />
        </mesh>
      </group>
    </group>
  );
}
