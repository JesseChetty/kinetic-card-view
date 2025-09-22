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

  const handleFullscreen = () => {
    const explorerElement = document.getElementById('gitlantis-explorer');
    if (explorerElement) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        explorerElement.requestFullscreen();
      }
    }
  };

  return (
    <div 
      id="gitlantis-explorer"
      className="relative w-full h-screen bg-gradient-to-b from-sky-300 via-sky-100 to-blue-500 overflow-hidden"
      style={{ width: '100%', height: '100%' }}
    >
      <SEO 
        title="Portfolio Explorer - Interactive 3D Navigation"
        description="Explore my portfolio projects in an immersive 3D ocean world. Navigate through projects as lighthouses and skills as buoys."
        keywords="3D portfolio, interactive navigation, three.js, React Three Fiber, immersive experience"
        canonicalUrl="https://portfolio.dev/explore"
      />
      
      <Canvas
        camera={{ position: [0, 12, 20], fov: 60 }}
        shadows
        className="w-full h-full"
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
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
      
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={handleFullscreen}
          className="px-4 py-2 bg-background/80 backdrop-blur-sm border border-border rounded-lg hover:bg-background/90 transition-colors"
        >
          ⛶ Fullscreen Explorer
        </button>
      </div>

      <Loading />
    </div>
  );
};