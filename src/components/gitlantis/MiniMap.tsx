interface MiniMapProps {
  boatPosition: [number, number, number];
  projects: any[];
  skills: any[];
}

export const MiniMap = ({ boatPosition, projects, skills }: MiniMapProps) => {
  const scale = 2; // Scale factor for the minimap
  const mapSize = 120; // Size of the minimap in pixels
  
  return (
    <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border shadow-lg">
      <h3 className="text-sm font-semibold text-foreground mb-2 text-center">Navigation</h3>
      
      <div 
        className="relative bg-blue-200/50 rounded border"
        style={{ width: mapSize, height: mapSize }}
      >
        {/* Center crosshairs */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-border/50" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-border/50" />
        
        {/* Boat position */}
        <div
          className="absolute w-2 h-2 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${50 + (boatPosition[0] / scale)}%`,
            top: `${50 + (boatPosition[2] / scale)}%`,
          }}
        />
        
        {/* Project lighthouses */}
        {projects.map((project, index) => {
          const angle = (index / projects.length) * Math.PI * 2;
          const x = Math.sin(angle) * 25;
          const z = Math.cos(angle) * 25;
          
          return (
            <div
              key={project.id}
              className="absolute w-1.5 h-1.5 bg-yellow-500 rounded transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${50 + (x / scale)}%`,
                top: `${50 + (z / scale)}%`,
              }}
              title={project.title}
            />
          );
        })}
        
        {/* Skill buoys */}
        {skills.map((skill, index) => {
          const angle = (index / skills.length) * Math.PI * 2;
          const x = Math.sin(angle) * 15 + Math.random() * 5;
          const z = Math.cos(angle) * 15 + Math.random() * 5;
          
          return (
            <div
              key={skill.name}
              className="absolute w-1 h-1 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${50 + (x / scale)}%`,
                top: `${50 + (z / scale)}%`,
              }}
              title={skill.name}
            />
          );
        })}
      </div>
      
      <div className="mt-2 text-xs text-muted-foreground text-center">
        <div className="flex items-center justify-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span>You</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 bg-yellow-500 rounded" />
            <span>Projects</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-blue-500 rounded-full" />
            <span>Skills</span>
          </div>
        </div>
      </div>
    </div>
  );
};