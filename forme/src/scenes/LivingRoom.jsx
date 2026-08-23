import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function LivingRoom({ mouse = { x: 0, y: 0 }, active = false }) {
  const group = useRef();
  
  // Custom materials for a stylized, pastel architectural illustration look
  const materials = useMemo(() => ({
    wall: new THREE.MeshStandardMaterial({ color: '#F4EFE7', roughness: 0.9, metalness: 0.0 }),
    floor: new THREE.MeshStandardMaterial({ color: '#D7C8B4', roughness: 0.8, metalness: 0.1 }),
    base: new THREE.MeshStandardMaterial({ color: '#1E1C19', roughness: 0.6 }),
    wood: new THREE.MeshStandardMaterial({ color: '#8B6A4F', roughness: 0.7, metalness: 0.05 }),
    fabricLight: new THREE.MeshStandardMaterial({ color: '#E9E1D4', roughness: 1.0, metalness: 0.0 }),
    fabricTerracotta: new THREE.MeshStandardMaterial({ color: '#A95E47', roughness: 1.0, metalness: 0.0 }),
    plantGreen: new THREE.MeshStandardMaterial({ color: '#6D765F', roughness: 0.9, metalness: 0.1 }),
    brass: new THREE.MeshStandardMaterial({ color: '#B7965A', roughness: 0.3, metalness: 0.8 }),
    glass: new THREE.MeshPhysicalMaterial({ color: '#ffffff', transmission: 0.9, opacity: 1, metalness: 0, roughness: 0, ior: 1.5, thickness: 0.1 }),
    book1: new THREE.MeshStandardMaterial({ color: '#A95E47', roughness: 0.8 }),
    book2: new THREE.MeshStandardMaterial({ color: '#6D765F', roughness: 0.8 }),
  }), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      // Gentle floating and mouse parallax
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

      {/* Back Wall (Right in iso) */}
      <mesh castShadow receiveShadow position={[0, 2, -3.4]}>
        <boxGeometry args={[7, 4, 0.2]} />
        <primitive object={materials.wall} attach="material" />
      </mesh>
      
      {/* Left Wall (Left in iso) */}
      <mesh castShadow receiveShadow position={[-3.4, 2, 0]}>
        <boxGeometry args={[0.2, 4, 7]} />
        <primitive object={materials.wall} attach="material" />
      </mesh>

      {/* Architectural Archway Cutout (Left Wall) */}
      <group position={[-3.4, 1.5, 1]}>
         <mesh castShadow receiveShadow position={[0, 1.5, 0]}>
           <boxGeometry args={[0.25, 1, 3]} />
           <primitive object={materials.wall} attach="material" />
         </mesh>
         <mesh castShadow receiveShadow position={[0, -0.5, 2]}>
           <boxGeometry args={[0.25, 3, 1]} />
           <primitive object={materials.wall} attach="material" />
         </mesh>
         <mesh castShadow receiveShadow position={[0, -0.5, -2]}>
           <boxGeometry args={[0.25, 3, 1]} />
           <primitive object={materials.wall} attach="material" />
         </mesh>
      </group>

      {/* Large Window (Back Wall) */}
      <group position={[1.5, 1.8, -3.4]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.2, 2.6, 0.3]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        <mesh position={[0, 0, 0.1]}>
           <planeGeometry args={[3, 2.4]} />
           <primitive object={materials.glass} attach="material" />
        </mesh>
        <mesh position={[0, 0, 0.15]} castShadow>
          <boxGeometry args={[0.05, 2.4, 0.05]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        <mesh position={[0, 0, 0.15]} castShadow>
          <boxGeometry args={[3, 0.05, 0.05]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
      </group>

      {/* Curved Sofa */}
      <group position={[0.5, 0.25, 0.5]} rotation={[0, -Math.PI / 8, 0]}>
        {/* Base */}
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.4, 32, 1, false, 0, Math.PI]} />
          <primitive object={materials.fabricLight} attach="material" />
        </mesh>
        {/* Backrest */}
        <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.6, 32, 1, false, 0, Math.PI]} />
          <primitive object={materials.fabricLight} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
          <cylinderGeometry args={[1.1, 1.1, 0.6, 32, 1, false, 0, Math.PI]} />
          <meshStandardMaterial color="#F5F0E8" />
        </mesh>
        {/* Cushions */}
        <mesh castShadow receiveShadow position={[-0.8, 0.4, 0.8]} rotation={[0, Math.PI/4, 0]}>
          <boxGeometry args={[0.5, 0.4, 0.2]} />
          <primitive object={materials.fabricTerracotta} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0.8, 0.4, 0.8]} rotation={[0, -Math.PI/4, 0]}>
          <boxGeometry args={[0.5, 0.4, 0.2]} />
          <primitive object={materials.plantGreen} attach="material" />
        </mesh>
      </group>

      {/* Rug */}
      <mesh receiveShadow position={[0.5, 0.06, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.2, 32]} />
        <meshStandardMaterial color="#e0d7cb" roughness={1} />
      </mesh>

      {/* Coffee Table */}
      <group position={[0.5, 0.05, 2.0]}>
        <mesh castShadow receiveShadow position={[0, 0.44, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 0.08, 32]} />
          <primitive object={materials.wood} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.3, 0.4, 0.4, 32]} />
          <primitive object={materials.wood} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[-0.2, 0.50, 0]} rotation={[0, 0.2, 0]}>
          <boxGeometry args={[0.4, 0.05, 0.3]} />
          <primitive object={materials.book1} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[-0.2, 0.56, 0.02]} rotation={[0, -0.1, 0]}>
          <boxGeometry args={[0.35, 0.04, 0.25]} />
          <primitive object={materials.book2} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0.2, 0.58, -0.1]}>
          <cylinderGeometry args={[0.08, 0.12, 0.2, 16]} />
          <meshStandardMaterial color="#F4EFE7" roughness={0.2} />
        </mesh>
      </group>

      {/* Bookshelf / Wall Unit */}
      <group position={[-2.8, 1.55, -2]}>
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[1, 3, 2.5]} />
          <primitive object={materials.wood} attach="material" />
        </mesh>
        <mesh position={[0.4, 0, 0]} castShadow>
          <boxGeometry args={[0.22, 2.8, 2.3]} />
          <meshStandardMaterial color="#3A2C20" />
        </mesh>
        <mesh castShadow receiveShadow position={[0.5, -0.5, 0]}>
          <boxGeometry args={[0.2, 0.05, 2.3]} />
          <primitive object={materials.wood} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0.5, 0.5, 0]}>
          <boxGeometry args={[0.2, 0.05, 2.3]} />
          <primitive object={materials.wood} attach="material" />
        </mesh>
        <group position={[0.5, 0.65, -0.5]}>
          <mesh castShadow receiveShadow position={[0, 0, 0]}>
             <boxGeometry args={[0.15, 0.25, 0.05]} />
             <primitive object={materials.book1} attach="material" />
          </mesh>
          <mesh castShadow receiveShadow position={[0, 0, 0.06]}>
             <boxGeometry args={[0.15, 0.25, 0.05]} />
             <primitive object={materials.fabricLight} attach="material" />
          </mesh>
          <mesh castShadow receiveShadow position={[0, 0, 0.12]} rotation={[0.1, 0, 0]}>
             <boxGeometry args={[0.15, 0.25, 0.05]} />
             <primitive object={materials.book2} attach="material" />
          </mesh>
        </group>
      </group>

      {/* Statement Floor Lamp */}
      <group position={[-2.4, 0.05, 2.8]}>
        <mesh castShadow receiveShadow position={[0, 1.5, 0]}>
          <cylinderGeometry args={[0.03, 0.06, 3]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 3, 0.5]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 1]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 3, 1]}>
          <cylinderGeometry args={[0.3, 0.4, 0.3, 32]} />
          <meshStandardMaterial color="#1a1a1a" side={THREE.DoubleSide} />
        </mesh>
        <pointLight position={[0, 2.8, 1]} intensity={0.8} distance={5} color="#ffeedd" />
      </group>
      
      {/* Large Potted Olive Tree */}
      <group position={[2.8, 0.05, 2.8]}>
        <mesh castShadow receiveShadow position={[0, 0.3, 0]}>
           <cylinderGeometry args={[0.4, 0.3, 0.6, 32]} />
           <primitive object={materials.wall} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 1, 0]}>
           <cylinderGeometry args={[0.05, 0.08, 1.2]} />
           <primitive object={materials.wood} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0.1, 1.2, 0]} rotation={[0, 0, -0.2]}>
           <cylinderGeometry args={[0.03, 0.05, 0.6]} />
           <primitive object={materials.wood} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 1.6, 0]}>
           <sphereGeometry args={[0.6, 16, 16]} />
           <primitive object={materials.plantGreen} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0.4, 1.8, 0.2]}>
           <sphereGeometry args={[0.4, 16, 16]} />
           <primitive object={materials.plantGreen} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[-0.3, 1.5, -0.3]}>
           <sphereGeometry args={[0.45, 16, 16]} />
           <primitive object={materials.plantGreen} attach="material" />
        </mesh>
      </group>
      
      {/* Wall Art */}
      <group position={[-3.25, 2.2, -1.2]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.5, 2, 0.05]} />
          <primitive object={materials.wood} attach="material" />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.3, 1.8]} />
          <meshStandardMaterial color="#E9E1D4" />
        </mesh>
        <mesh position={[0, 0, 0.04]}>
          <circleGeometry args={[0.4, 32]} />
          <primitive object={materials.fabricTerracotta} attach="material" />
        </mesh>
      </group>
    </group>
  );
}
