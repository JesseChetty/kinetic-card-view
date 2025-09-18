import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import * as THREE from 'three';

export const Ocean = () => {
  const oceanRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (oceanRef.current) {
      const time = state.clock.getElapsedTime();
      // Simple rotation animation
      oceanRef.current.rotation.z = Math.sin(time * 0.1) * 0.02;
    }
  });

  // Simplified ocean material to avoid WebGL context issues
  const oceanMaterial = new THREE.MeshStandardMaterial({
    color: 0x0077be,
    transparent: true,
    opacity: 0.8,
    roughness: 0.1,
    metalness: 0.1,
  });

  return (
    <Plane
      ref={oceanRef}
      args={[200, 200]}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1, 0]}
      material={oceanMaterial}
      receiveShadow
    />
  );
};