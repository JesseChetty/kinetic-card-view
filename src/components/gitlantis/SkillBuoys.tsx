import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { useGitlantisStore } from '../../hooks/useGitlantisStore';

interface SkillBuoysProps {
  skills: any[];
}

const Buoy = ({ skill, position }: { skill: any; position: [number, number, number] }) => {
  const buoyRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { setHoveredObject } = useGitlantisStore();

  useFrame((state) => {
    if (buoyRef.current) {
      // Bobbing animation
      const time = state.clock.getElapsedTime();
      buoyRef.current.position.y = position[1] + Math.sin(time * 1.5 + position[0]) * 0.2;
      buoyRef.current.rotation.z = Math.sin(time + position[0]) * 0.1;
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
      {/* Buoy Float */}
      <Sphere args={[1]} position={[0, 0, 0]} castShadow>
        <meshStandardMaterial 
          color={hovered ? '#ffffff' : getColorByCategory(skill.category)}
          emissive={hovered ? getColorByCategory(skill.category) : '#000000'}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </Sphere>
      
      {/* Buoy Pole */}
      <Cylinder args={[0.1, 0.1, 2]} position={[0, 1.5, 0]} castShadow>
        <meshStandardMaterial color="#654321" />
      </Cylinder>
      
      {/* Skill Level Indicator */}
      <Cylinder 
        args={[0.15, 0.15, (skill.level / 100) * 2]} 
        position={[0, 1.5 + (skill.level / 100), 0]} 
        castShadow
      >
        <meshStandardMaterial 
          color={getColorByCategory(skill.category)}
          emissive={getColorByCategory(skill.category)}
          emissiveIntensity={0.3}
        />
      </Cylinder>
      
      {/* Skill Name */}
      <Text
        position={[0, 3, 0]}
        fontSize={0.4}
        color={hovered ? getColorByCategory(skill.category) : "#333"}
        anchorX="center"
        anchorY="middle"
      >
        {skill.name}
      </Text>
      
      {/* Skill Level Text */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.3}
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
  return (
    <group>
      {skills.map((skill, index) => (
        <Buoy
          key={skill.name}
          skill={skill}
          position={[
            Math.sin((index / skills.length) * Math.PI * 2) * 15 + Math.random() * 5,
            0,
            Math.cos((index / skills.length) * Math.PI * 2) * 15 + Math.random() * 5
          ]}
        />
      ))}
    </group>
  );
};