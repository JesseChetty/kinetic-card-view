import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useGitlantisStore } from '../../hooks/useGitlantisStore';
import { getAssetConfig } from '../../data/assets';
import { GLTFAsset } from './GLTFAsset';

interface SkillBuoysProps {
  skills: any[];
}

const Buoy = ({ skill, position }: { skill: any; position: [number, number, number] }) => {
  const buoyRef = useRef<THREE.Group>(null);
  const nameTextRef = useRef<THREE.Mesh>(null);
  const levelTextRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { setHoveredObject, boatPosition } = useGitlantisStore();
  
  const buoyConfig = getAssetConfig('buoy');

  useFrame((state) => {
    if (buoyRef.current) {
      // Simplified bobbing animation
      const time = state.clock.getElapsedTime();
      buoyRef.current.position.y = Math.sin(time * 1.5 + position[0]) * 0.3;
    }

    // Make text face the boat
    if (nameTextRef.current) {
      const boatPos = new THREE.Vector3(...boatPosition);
      nameTextRef.current.lookAt(boatPos);
    }
    if (levelTextRef.current) {
      const boatPos = new THREE.Vector3(...boatPosition);
      levelTextRef.current.lookAt(boatPos);
    }
  });

  const getColorByCategory = (category: string) => {
    const colors = {
      'Frontend': '#61dafb',
      'Backend': '#68a063',
      'Language': '#f7df1e',
      'Framework': '#ff6b6b',
      'Styling': '#06b6d4',
      'Database': '#336791'
    };
    return colors[category as keyof typeof colors] || '#gray';
  };

  return (
    <group
      ref={buoyRef}
      position={position}
      onPointerEnter={() => {
        setHovered(true);
        setHoveredObject(skill.name);
        document.body.style.cursor = 'pointer';
      }}
      onPointerLeave={() => {
        setHovered(false);
        setHoveredObject(null);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Buoy Body */}
      <GLTFAsset config={buoyConfig!}>
        {/* Default Buoy - only shows when no GLB model */}
        {!buoyConfig?.path && (
          <>
            {/* Buoy Float */}
            <mesh position={[0, 0, 0]} castShadow>
              <sphereGeometry args={[1]} />
              <meshStandardMaterial 
                color={hovered ? '#ffffff' : getColorByCategory(skill.category)}
              />
            </mesh>
            
            {/* Buoy Pole */}
            <mesh position={[0, 1.5, 0]} castShadow>
              <cylinderGeometry args={[0.1, 0.1, 2]} />
              <meshStandardMaterial color="#654321" />
            </mesh>
            
            {/* Skill Level Indicator */}
            <mesh position={[0, 1.5 + (skill.level / 100), 0]} castShadow>
              <cylinderGeometry args={[0.15, 0.15, (skill.level / 100) * 2]} />
              <meshStandardMaterial color={getColorByCategory(skill.category)} />
            </mesh>
          </>
        )}
      </GLTFAsset>
      
      {/* Skill Name (always shows) */}
      <Text
        ref={nameTextRef}
        position={[0, 4, 0]}
        fontSize={0.5}
        color={hovered ? getColorByCategory(skill.category) : "#333"}
        anchorX="center"
        anchorY="middle"
      >
        {skill.name}
      </Text>
      
      {/* Skill Level Text (always shows) */}
      <Text
        ref={levelTextRef}
        position={[0, 3.3, 0]}
        fontSize={0.4}
        color="#666"
        anchorX="center"
        anchorY="middle"
      >
        {skill.level}%
      </Text>
    </group>
  );
};

export const SkillBuoys = ({ skills }: SkillBuoysProps) => {
  // Generate fixed positions to prevent repositioning on re-renders
  const buoyPositions = skills.map((_, index) => {
    const angle = (index / skills.length) * Math.PI * 2;
    const radius = 15;
    const offsetX = Math.sin(index * 1.234) * 5; // Fixed pseudo-random offset
    const offsetZ = Math.cos(index * 2.345) * 5; // Fixed pseudo-random offset
    
    return [
      Math.sin(angle) * radius + offsetX,
      0,
      Math.cos(angle) * radius + offsetZ
    ] as [number, number, number];
  });

  return (
    <group>
      {skills.map((skill, index) => (
        <Buoy
          key={skill.name}
          skill={skill}
          position={buoyPositions[index]}
        />
      ))}
    </group>
  );
};