import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function WholeHome({ mouse = { x: 0, y: 0 }, active = false }) {
  const group = useRef();
  
  const materials = useMemo(() => ({
    ground: new THREE.MeshStandardMaterial({ color: '#A0AF91', roughness: 0.9, metalness: 0.0 }), // Grass
    base: new THREE.MeshStandardMaterial({ color: '#1E1C19', roughness: 0.6 }),
    wall: new THREE.MeshStandardMaterial({ color: '#F4EFE7', roughness: 0.9, metalness: 0.0 }),
    roof: new THREE.MeshStandardMaterial({ color: '#4A4A4A', roughness: 0.8, metalness: 0.1 }),
    wood: new THREE.MeshStandardMaterial({ color: '#8B6A4F', roughness: 0.8, metalness: 0.05 }), // Door/accents
    glass: new THREE.MeshPhysicalMaterial({ color: '#88CCEE', transmission: 0.5, opacity: 0.8, metalness: 0.2, roughness: 0.1 }),
    pathway: new THREE.MeshStandardMaterial({ color: '#C8C4B7', roughness: 0.9 }),
    plantGreen: new THREE.MeshStandardMaterial({ color: '#5C6E58', roughness: 0.9 }),
    plantDark: new THREE.MeshStandardMaterial({ color: '#3A4D39', roughness: 0.9 }),
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
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0.1, 0.05);
      } else {
        group.current.rotation.y = THREE.MathUtils.lerp(
          group.current.rotation.y,
          (mouse.x * Math.PI) / 6 + Math.PI / 4,
          0.05
        );
        group.current.rotation.x = THREE.MathUtils.lerp(
          group.current.rotation.x,
          (mouse.y * Math.PI) / 12 + 0.1, // tilt slightly down
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
        <primitive object={materials.ground} attach="material" />
      </mesh>

      <mesh receiveShadow position={[1, 0.06, 1]}>
        <boxGeometry args={[1.5, 0.02, 5]} />
        <primitive object={materials.pathway} attach="material" />
      </mesh>

      {/* Main House */}
      <group position={[-0.5, 0.05, -1]}>
        <mesh castShadow receiveShadow position={[0, 1, 0]}>
          <boxGeometry args={[4, 2, 3]} />
          <primitive object={materials.wall} attach="material" />
        </mesh>
        
        <mesh castShadow receiveShadow position={[0.5, 2.75, 0]}>
          <boxGeometry args={[3.5, 1.5, 3.5]} />
          <primitive object={materials.wall} attach="material" />
        </mesh>

        <mesh castShadow receiveShadow position={[0.5, 3.55, 0]}>
          <boxGeometry args={[3.8, 0.1, 3.8]} />
          <primitive object={materials.roof} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 2.05, 0]}>
          <boxGeometry args={[4.2, 0.1, 3.2]} />
          <primitive object={materials.roof} attach="material" />
        </mesh>

        <mesh castShadow position={[1, 0.7, 1.51]}>
          <boxGeometry args={[0.8, 1.4, 0.05]} />
          <primitive object={materials.wood} attach="material" />
        </mesh>

        <group position={[-1, 1, 1.5]}>
          <mesh castShadow>
             <boxGeometry args={[1.2, 1.2, 0.1]} />
             <meshStandardMaterial color="#222" />
          </mesh>
          <mesh position={[0, 0, 0.06]}>
             <planeGeometry args={[1.1, 1.1]} />
             <primitive object={materials.glass} attach="material" />
          </mesh>
        </group>

        <group position={[1.5, 2.5, 1.75]}>
          <mesh castShadow>
             <boxGeometry args={[1.5, 1.2, 0.1]} />
             <meshStandardMaterial color="#222" />
          </mesh>
          <mesh position={[0, 0, 0.06]}>
             <planeGeometry args={[1.4, 1.1]} />
             <primitive object={materials.glass} attach="material" />
          </mesh>
          <mesh position={[0, 0, 0.07]}>
             <boxGeometry args={[0.05, 1.1, 0.02]} />
             <meshStandardMaterial color="#222" />
          </mesh>
        </group>
      </group>

      {/* Trees */}
      <group position={[-2.5, 0.05, 1.5]}>
        <mesh castShadow receiveShadow position={[0, 0.8, 0]}>
           <cylinderGeometry args={[0.08, 0.15, 1.6]} />
           <primitive object={materials.wood} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 2, 0]}>
           <sphereGeometry args={[1, 16, 16]} />
           <primitive object={materials.plantDark} attach="material" />
        </mesh>
      </group>

      <group position={[2.5, 0.05, -2]}>
        <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
           <cylinderGeometry args={[0.05, 0.1, 1]} />
           <primitive object={materials.wood} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 1.3, 0]}>
           <sphereGeometry args={[0.7, 16, 16]} />
           <primitive object={materials.plantGreen} attach="material" />
        </mesh>
        <mesh castShadow receiveShadow position={[0.4, 1, 0.4]}>
           <sphereGeometry args={[0.5, 16, 16]} />
           <primitive object={materials.plantGreen} attach="material" />
        </mesh>
      </group>

      <mesh castShadow receiveShadow position={[2, 0.35, 2]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <primitive object={materials.plantDark} attach="material" />
      </mesh>
      <mesh castShadow receiveShadow position={[0.2, 0.25, 2.5]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <primitive object={materials.plantGreen} attach="material" />
      </mesh>
    </group>
  );
}
