import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { Vector3 } from 'three';
import * as THREE from 'three';
import { useGitlantisStore } from '../../hooks/useGitlantisStore';

const KEYS = {
  forward: 'KeyW',
  backward: 'KeyS',
  left: 'KeyA',
  right: 'KeyD',
};

export const Boat = () => {
  const boatRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const { boatPosition, boatRotation, setBoatPosition, setBoatRotation, cameraFollow } = useGitlantisStore();
  
  const [, getKeys] = useKeyboardControls();
  const velocity = useRef(new Vector3());
  const speed = 0.1;
  const rotationSpeed = 0.02;

  useFrame((state) => {
    if (!boatRef.current) return;

    const keys = getKeys();
    let moved = false;

    // Handle rotation
    if (keys.left) {
      boatRef.current.rotation.y += rotationSpeed;
      setBoatRotation([boatRef.current.rotation.x, boatRef.current.rotation.y, boatRef.current.rotation.z]);
      moved = true;
    }
    if (keys.right) {
      boatRef.current.rotation.y -= rotationSpeed;
      setBoatRotation([boatRef.current.rotation.x, boatRef.current.rotation.y, boatRef.current.rotation.z]);
      moved = true;
    }

    // Handle movement
    const direction = new Vector3();
    
    if (keys.forward) {
      direction.z = -speed;
      moved = true;
    }
    if (keys.backward) {
      direction.z = speed;
      moved = true;
    }

    if (moved) {
      // Apply rotation to movement direction
      direction.applyEuler(boatRef.current.rotation);
      
      boatRef.current.position.add(direction);
      setBoatPosition([boatRef.current.position.x, boatRef.current.position.y, boatRef.current.position.z]);
    }

    // Add gentle bobbing animation
    const time = state.clock.getElapsedTime();
    boatRef.current.position.y = Math.sin(time * 2) * 0.1;

    // Camera follow boat
    if (cameraFollow) {
      const idealCameraPosition = new Vector3(
        boatRef.current.position.x + Math.sin(boatRef.current.rotation.y + Math.PI) * 10,
        boatRef.current.position.y + 8,
        boatRef.current.position.z + Math.cos(boatRef.current.rotation.y + Math.PI) * 10
      );
      
      camera.position.lerp(idealCameraPosition, 0.05);
      camera.lookAt(boatRef.current.position);
    }
  });

  useEffect(() => {
    // Set initial boat position
    if (boatRef.current) {
      boatRef.current.position.set(...boatPosition);
      boatRef.current.rotation.set(...boatRotation);
    }
  }, []);

  return (
    <group ref={boatRef} castShadow>
      {/* Boat Hull */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[2, 0.5, 4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Boat Mast */}
      <mesh position={[0, 2, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 4]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      {/* Sail */}
      <mesh position={[1, 2, 0]} castShadow>
        <planeGeometry args={[2, 3]} />
        <meshStandardMaterial color="#ffffff" side={2} />
      </mesh>
    </group>
  );
};