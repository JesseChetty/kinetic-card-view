import { useProgress } from '@react-three/drei';
import { useEffect, useState } from 'react';

export const Loading = () => {
  const { progress, loaded, total } = useProgress();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => setIsVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card p-8 rounded-lg shadow-xl border border-border max-w-sm w-full mx-4">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          
          <h2 className="text-xl font-bold text-foreground mb-2">
            Loading Ocean World
          </h2>
          
          <p className="text-muted-foreground mb-4">
            Preparing your portfolio adventure...
          </p>
          
          <div className="w-full bg-muted rounded-full h-2 mb-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="text-sm text-muted-foreground">
            {loaded} / {total} assets loaded ({Math.round(progress)}%)
          </div>
        </div>
      </div>
    </div>
  );
};