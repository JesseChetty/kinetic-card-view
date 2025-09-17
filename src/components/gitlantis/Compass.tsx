import { useGitlantisStore } from '../../hooks/useGitlantisStore';

interface CompassProps {
  boatPosition: [number, number, number];
}

export const Compass = ({ boatPosition }: CompassProps) => {
  const { boatRotation } = useGitlantisStore();
  
  // Convert boat rotation to compass bearing
  const bearing = (((-boatRotation[1] * 180) / Math.PI + 360) % 360);
  
  const getDirectionText = (bearing: number) => {
    if (bearing >= 337.5 || bearing < 22.5) return 'N';
    if (bearing >= 22.5 && bearing < 67.5) return 'NE';
    if (bearing >= 67.5 && bearing < 112.5) return 'E';
    if (bearing >= 112.5 && bearing < 157.5) return 'SE';
    if (bearing >= 157.5 && bearing < 202.5) return 'S';
    if (bearing >= 202.5 && bearing < 247.5) return 'SW';
    if (bearing >= 247.5 && bearing < 292.5) return 'W';
    if (bearing >= 292.5 && bearing < 337.5) return 'NW';
    return 'N';
  };

  return (
    <div className="bg-background/90 backdrop-blur-sm rounded-lg p-4 border border-border shadow-lg">
      <div className="flex flex-col items-center space-y-2">
        <h3 className="text-sm font-semibold text-foreground">Compass</h3>
        
        {/* Compass Rose */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-2 border-border bg-card">
            {/* Cardinal directions */}
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-red-500">N</div>
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-bold">S</div>
            <div className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs font-bold">E</div>
            <div className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs font-bold">W</div>
            
            {/* Compass Needle */}
            <div 
              className="absolute top-1/2 left-1/2 w-0.5 h-8 bg-red-500 origin-bottom transform -translate-x-1/2 -translate-y-full"
              style={{ 
                transform: `translate(-50%, -100%) rotate(${bearing}deg)`,
                transformOrigin: 'bottom center'
              }}
            />
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-bold text-primary">{getDirectionText(bearing)}</div>
          <div className="text-xs text-muted-foreground">{bearing.toFixed(0)}°</div>
        </div>
        
        <div className="text-xs text-muted-foreground text-center">
          <div>X: {boatPosition[0].toFixed(1)}</div>
          <div>Z: {boatPosition[2].toFixed(1)}</div>
        </div>
      </div>
    </div>
  );
};