import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import waterTexture from '../../assets/seamless-water.jpg';

export const Ocean = () => {
  const oceanRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, waterTexture);
  
  // Configure texture for seamless tiling
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 8);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  useFrame((state) => {
    if (oceanRef.current) {
      const time = state.clock.getElapsedTime();
      // Simple wave animation
      oceanRef.current.position.y = Math.sin(time * 0.5) * 0.1;
      // Subtle texture animation for flowing water effect
      texture.offset.x = time * 0.003;
      texture.offset.y = time * 0.002;
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
        map={texture}
        transparent
        opacity={0.9}
        roughness={0.2}
        metalness={0.1}
        color="#ffffff"
      />
    </mesh>
  );
};