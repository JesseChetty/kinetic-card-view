import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Ocean = () => {
  const oceanRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (oceanRef.current) {
      const time = state.clock.getElapsedTime();
      // Simple wave animation
      oceanRef.current.position.y = Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <mesh
      ref={oceanRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1, 0]}
      receiveShadow
    >
      <planeGeometry args={[200, 200, 50, 50]} />
      <meshStandardMaterial
        color="#0077be"
        transparent
        opacity={0.8}
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
};