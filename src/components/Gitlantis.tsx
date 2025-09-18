import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Ocean } from './gitlantis/Ocean';
import { Boat } from './gitlantis/Boat';
import { ProjectLighthouses } from './gitlantis/ProjectLighthouses';
import { SkillBuoys } from './gitlantis/SkillBuoys';
import { Compass } from './gitlantis/Compass';
import { MiniMap } from './gitlantis/MiniMap';
import { BreadcrumbTrail } from './gitlantis/BreadcrumbTrail';
import { Loading } from './gitlantis/Loading';
import { useGitlantisStore } from '../hooks/useGitlantisStore';
import { projectsData, skillsData } from '../data/portfolioData';
import { SEO } from './SEO';

interface GitlantisProps {
  onProjectSelect: (project: any) => void;
}

export const Gitlantis = ({ onProjectSelect }: GitlantisProps) => {
  const { selectedProject, boatPosition } = useGitlantisStore();

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-sky-400 via-sky-200 to-blue-600 overflow-hidden">
      <SEO 
        title="Portfolio Explorer - Interactive 3D Navigation"
        description="Explore my portfolio projects in an immersive 3D ocean world. Navigate through projects as lighthouses and skills as buoys."
        keywords="3D portfolio, interactive navigation, three.js, React Three Fiber, immersive experience"
        canonicalUrl="https://portfolio.dev/explore"
      />
      
      <Canvas
        camera={{ position: [0, 8, 15], fov: 75 }}
        shadows
        className="w-full h-full"
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[10, 20, 10]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          
          {/* 3D World */}
          <Ocean />
          <Boat />
          <ProjectLighthouses 
            projects={projectsData} 
            onProjectSelect={onProjectSelect}
          />
          <SkillBuoys skills={skillsData} />
        </Suspense>
      </Canvas>

      {/* UI Overlays */}
      <div className="absolute top-4 right-4 z-10">
        <Compass boatPosition={boatPosition} />
      </div>
      
      <div className="absolute bottom-4 right-4 z-10">
        <MiniMap 
          boatPosition={boatPosition}
          projects={projectsData}
          skills={skillsData}
        />
      </div>
      
      <div className="absolute top-4 left-4 z-10">
        <BreadcrumbTrail selectedProject={selectedProject} />
      </div>

      <Loading />
    </div>
  );
};