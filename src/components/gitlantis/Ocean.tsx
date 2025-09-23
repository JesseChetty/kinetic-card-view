import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Ocean = () => {
  const oceanRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Water shader material for realistic seamless water
  const waterMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0.0 },
      color1: { value: new THREE.Color(0x006994) },
      color2: { value: new THREE.Color(0x0088cc) },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      uniform float time;
      
      // Simple noise function
      float noise(vec2 p) {
        return sin(p.x * 10.0 + time) * sin(p.y * 10.0 + time * 0.8) * 0.1;
      }
      
      void main() {
        vUv = uv;
        vPosition = position;
        
        vec3 pos = position;
        pos.z += noise(uv * 2.0) + noise(uv * 4.0) * 0.5;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec2 vUv;
      
      // Simple noise function
      float noise(vec2 p) {
        return sin(p.x * 8.0 + time * 0.5) * sin(p.y * 8.0 + time * 0.3);
      }
      
      void main() {
        vec2 uv = vUv;
        
        // Create flowing water pattern
        float n1 = noise(uv * 3.0);
        float n2 = noise(uv * 6.0 + vec2(time * 0.1, time * 0.05));
        float pattern = (n1 + n2 * 0.5) * 0.5 + 0.5;
        
        // Mix colors based on pattern
        vec3 color = mix(color1, color2, pattern);
        
        gl_FragColor = vec4(color, 0.9);
      }
    `,
    transparent: true,
  });

  useFrame((state) => {
    if (oceanRef.current && materialRef.current) {
      const time = state.clock.getElapsedTime();
      // Simple wave animation
      oceanRef.current.position.y = Math.sin(time * 0.5) * 0.1;
      // Update shader time
      materialRef.current.uniforms.time.value = time;
    }
  });

  return (
    <mesh
      ref={oceanRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1, 0]}
      receiveShadow
    >
      <planeGeometry args={[200, 200, 100, 100]} />
      <primitive object={waterMaterial} ref={materialRef} />
    </mesh>
  );
};