import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import * as THREE from 'three';

export const Ocean = () => {
  const oceanRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (oceanRef.current) {
      const time = state.clock.getElapsedTime();
      // Create gentle wave animation
      if (oceanRef.current.material instanceof THREE.ShaderMaterial) {
        oceanRef.current.material.uniforms.time.value = time;
      }
    }
  });

  const oceanMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      colorA: { value: new THREE.Color(0x0077be) },
      colorB: { value: new THREE.Color(0x00a8cc) },
    },
    vertexShader: `
      uniform float time;
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vPosition = position;
        
        vec3 pos = position;
        pos.z += sin(pos.x * 0.1 + time * 0.5) * 0.3;
        pos.z += cos(pos.y * 0.1 + time * 0.3) * 0.2;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 colorA;
      uniform vec3 colorB;
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vec2 uv = vUv;
        float wave1 = sin(uv.x * 10.0 + time * 0.5) * 0.1;
        float wave2 = cos(uv.y * 15.0 + time * 0.3) * 0.1;
        float mixValue = (wave1 + wave2 + 1.0) * 0.5;
        
        vec3 color = mix(colorA, colorB, mixValue);
        gl_FragColor = vec4(color, 0.8);
      }
    `,
    transparent: true,
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