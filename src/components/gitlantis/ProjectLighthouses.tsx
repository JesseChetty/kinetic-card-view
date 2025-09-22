import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Cylinder, Cone } from '@react-three/drei';
import * as THREE from 'three';
import { useGitlantisStore } from '../../hooks/useGitlantisStore';
import { getAssetConfig } from '../../data/assets';
import { GLTFAsset } from './GLTFAsset';

interface ProjectLighthousesProps {
  projects: any[];
  onProjectSelect: (project: any) => void;
}

const Lighthouse = ({ project, position, onSelect }: { project: any; position: [number, number, number]; onSelect: (project: any) => void }) => {
  const lighthouseRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.Group>(null);
  const textRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { setSelectedProject, setHoveredObject, boatPosition } = useGitlantisStore();
  const lighthouseConfig = getAssetConfig('lighthouse');

  useFrame((state) => {
    if (lightRef.current) {
      // Rotating lighthouse light
      lightRef.current.rotation.y += 0.02;
    }
    
    if (lighthouseRef.current && hovered) {
      // Gentle floating animation when hovered
      lighthouseRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
    }

    // Make text face the boat
    if (textRef.current) {
      const boatPos = new THREE.Vector3(...boatPosition);
      const textPos = new THREE.Vector3(position[0], position[1] + (lighthouseConfig?.path ? 8 : 14), position[2]);
      textRef.current.lookAt(boatPos);
    }
  });

  const handleClick = () => {
    setSelectedProject(project);
    onSelect(project);
  };

  return (
    <group
      ref={lighthouseRef}
      position={position}
      onPointerEnter={() => {
        setHovered(true);
        setHoveredObject(project.title);
        document.body.style.cursor = 'pointer';
      }}
      onPointerLeave={() => {
        setHovered(false);
        setHoveredObject(null);
        document.body.style.cursor = 'auto';
      }}
      onClick={handleClick}
    >
      {/* Render GLB model if available, otherwise show default lighthouse */}
      {lighthouseConfig?.path ? (
        <>
          {/* GLB Lighthouse Model */}
          <GLTFAsset config={lighthouseConfig} />
          
          {/* Rotating Light for GLB model */}
          <group ref={lightRef} position={[0, 4, 0]}>
            <mesh position={[0, 0, 0.8]}>
              <boxGeometry args={[0.2, 0.5, 0.2]} />
              <meshStandardMaterial color="#ffffff" emissive="#ffff00" emissiveIntensity={0.5} />
            </mesh>
          </group>
          
          {/* Project Title for GLB model */}
          <Text
            ref={textRef}
            position={[0, 8, 0]}
            fontSize={0.8}
            color={hovered ? "#ff6b6b" : "#333"}
            anchorX="center"
            anchorY="middle"
          >
            {project.title}
          </Text>
          
          {/* Featured indicator for GLB model */}
          {project.featured && (
            <mesh position={[0, 7.5, 0]}>
              <sphereGeometry args={[0.3]} />
              <meshStandardMaterial color="#ffd700" emissive="#ffa500" emissiveIntensity={0.3} />
            </mesh>
          )}
        </>
      ) : (
        <>
          {/* Default Geometric Lighthouse */}
          <Cylinder args={[1.5, 2, 8]} position={[0, 4, 0]} castShadow>
            <meshStandardMaterial color={hovered ? "#ff6b6b" : "#e0e0e0"} />
          </Cylinder>
          <Cylinder args={[1.51, 2.01, 1]} position={[0, 2, 0]} castShadow>
            <meshStandardMaterial color="#ff4757" />
          </Cylinder>
          <Cylinder args={[1.51, 2.01, 1]} position={[0, 6, 0]} castShadow>
            <meshStandardMaterial color="#ff4757" />
          </Cylinder>
          <Cylinder args={[1, 1, 1.5]} position={[0, 9, 0]} castShadow>
            <meshStandardMaterial color="#ffd700" />
          </Cylinder>
          <Cone args={[1.2, 2]} position={[0, 11, 0]} castShadow>
            <meshStandardMaterial color="#8B0000" />
          </Cone>
          
          {/* Rotating Light for default lighthouse */}
          <group ref={lightRef} position={[0, 9, 0]}>
            <mesh position={[0, 0, 0.8]}>
              <boxGeometry args={[0.2, 0.5, 0.2]} />
              <meshStandardMaterial color="#ffffff" emissive="#ffff00" emissiveIntensity={0.5} />
            </mesh>
          </group>
          
          {/* Project Title for default lighthouse */}
          <Text
            ref={textRef}
            position={[0, 14, 0]}
            fontSize={0.8}
            color={hovered ? "#ff6b6b" : "#333"}
            anchorX="center"
            anchorY="middle"
          >
            {project.title}
          </Text>
          
          {/* Featured indicator for default lighthouse */}
          {project.featured && (
            <mesh position={[0, 13.5, 0]}>
              <sphereGeometry args={[0.3]} />
              <meshStandardMaterial color="#ffd700" emissive="#ffa500" emissiveIntensity={0.3} />
            </mesh>
          )}
        </>
      )}
    </group>
  );
};

export const ProjectLighthouses = ({ projects, onProjectSelect }: ProjectLighthousesProps) => {
  return (
    <group>
      {projects.map((project, index) => (
        <Lighthouse
          key={project.id}
          project={project}
          position={[
            Math.sin((index / projects.length) * Math.PI * 2) * 25,
            0,
            Math.cos((index / projects.length) * Math.PI * 2) * 25
          ]}
          onSelect={onProjectSelect}
        />
      ))}
    </group>
  );
};