import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Kitchen({ mouse = { x: 0, y: 0 }, active = false }) {
  const group = useRef();

  const materials = useMemo(() => ({
    wall: new THREE.MeshStandardMaterial({ color: '#F4EFE7', roughness: 0.9, metalness: 0.0 }),
    floor: new THREE.MeshStandardMaterial({ color: '#C0C0C0', roughness: 0.8, metalness: 0.1 }),
    base: new THREE.MeshStandardMaterial({ color: '#1E1C19', roughness: 0.6 }),
    wood: new THREE.MeshStandardMaterial({ color: '#8B6A4F', roughness: 0.7, metalness: 0.05 }),
    marble: new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: 0.2, metalness: 0.1 }),
    metal: new THREE.MeshStandardMaterial({ color: '#333333', roughness: 0.3, metalness: 0.8 }),
    glass: new THREE.MeshPhysicalMaterial({ color: '#ffffff', transmission: 0.9, opacity: 1, metalness: 0, roughness: 0, ior: 1.5, thickness: 0.1 }),
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
      {/* Miniature Diorama Base */}
      <mesh castShadow receiveShadow position={[0, -0.15, 0]}>
        <boxGeometry args={[7.2, 0.3, 7.2]} />
        <primitive object={materials.base} attach="material" />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[7, 0.1, 7]} />
        <primitive object={materials.floor} attach="material" />
      </mesh>

      {/* Back Wall */}
      <mesh castShadow receiveShadow position={[0, 2, -3.4]}>
        <boxGeometry args={[7, 4, 0.2]} />
        <primitive object={materials.wall} attach="material" />
      </mesh>

      {/* Left Wall */}
      <mesh castShadow receiveShadow position={[-3.4, 2, 0]}>
        <boxGeometry args={[0.2, 4, 7]} />
        <primitive object={materials.wall} attach="material" />
      </mesh>

      {/* Lower Cabinets */}
      <mesh castShadow receiveShadow position={[1, 0.5, -2.8]}>
        <boxGeometry args={[4.8, 0.9, 1]} />
        <primitive object={materials.wood} attach="material" />
      </mesh>

      {/* Countertop */}
      <mesh castShadow receiveShadow position={[1, 1.0, -2.8]}>
        <boxGeometry args={[4.9, 0.1, 1.1]} />
        <primitive object={materials.marble} attach="material" />
      </mesh>

      {/* Upper Cabinets */}
      <mesh castShadow receiveShadow position={[1, 3, -3]}>
        <boxGeometry args={[4.8, 1.2, 0.6]} />
        <primitive object={materials.wood} attach="material" />
      </mesh>

      {/* Refrigerator */}
      <mesh castShadow receiveShadow position={[-2.2, 1.8, -2.6]}>
        <boxGeometry args={[1.6, 3.5, 1.4]} />
        <primitive object={materials.metal} attach="material" />
      </mesh>

      {/* Kitchen Island */}
      <group position={[1, 0.05, 0]}>
        {/* Island Base */}
        <mesh castShadow receiveShadow position={[0, 0.45, 0]}>
          <boxGeometry args={[4, 0.9, 1.6]} />
          <primitive object={materials.wood} attach="material" />
        </mesh>
        {/* Island Countertop */}
        <mesh castShadow receiveShadow position={[0, 0.95, 0]}>
          <boxGeometry args={[4.2, 0.1, 1.8]} />
          <primitive object={materials.marble} attach="material" />
        </mesh>
        {/* Sink on Island */}
        <mesh position={[-1, 0.975, 0]} castShadow>
          <boxGeometry args={[0.8, 0.05, 0.6]} />
          <primitive object={materials.metal} attach="material" />
        </mesh>
        {/* Faucet */}
        <mesh position={[-1, 1.2, -0.3]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.4]} />
          <primitive object={materials.metal} attach="material" />
        </mesh>
        <mesh position={[-1, 1.4, -0.2]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.2]} />
          <primitive object={materials.metal} attach="material" />
        </mesh>
      </group>

      {/* Stools */}
      <group position={[1, 0.05, 1.5]}>
        <mesh castShadow receiveShadow position={[-1.3, 0.35, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.7]} />
          <meshStandardMaterial color="#4A4A4A" />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.7]} />
          <meshStandardMaterial color="#4A4A4A" />
        </mesh>
        <mesh castShadow receiveShadow position={[1.3, 0.35, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.7]} />
          <meshStandardMaterial color="#4A4A4A" />
        </mesh>
      </group>

      {/* Large Window */}
      <group position={[-3.4, 2, 0.5]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.3, 2, 2.5]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        <mesh position={[0.1, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[2.3, 1.8]} />
          <primitive object={materials.glass} attach="material" />
        </mesh>
      </group>

      {/* Pendant Lights */}
      <group position={[1, 3.5, 0]}>
        <mesh castShadow receiveShadow position={[-1, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
          <primitive object={materials.metal} attach="material" />
        </mesh>
        <mesh castShadow position={[-1, 0.5, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <pointLight position={[-1, -0.2, 0]} intensity={0.5} distance={4} color="#ffeedd" />

        <mesh castShadow receiveShadow position={[1, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
          <primitive object={materials.metal} attach="material" />
        </mesh>
        <mesh castShadow position={[1, 0.5, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <pointLight position={[1, -0.2, 0]} intensity={0.5} distance={4} color="#ffeedd" />
      </group>
    </group>
  );
}
