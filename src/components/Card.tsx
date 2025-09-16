import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faUser,
  faCode,
  faBriefcase,
  faComments,
  faEnvelope,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

interface CardProps {
  data: {
    id: string;
    title: string;
    description: string;
    icon: string;
    type: string;
  };
  isFocused: boolean;
  onClick: () => void;
}

const iconMap = {
  star: faStar,
  user: faUser,
  code: faCode,
  briefcase: faBriefcase,
  comments: faComments,
  envelope: faEnvelope
};

export const Card = ({ data, isFocused, onClick }: CardProps) => {
  if (data.type === 'hero') {
    return (
      <div 
        className={`relative w-full max-w-4xl h-[80vh] rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ${
          isFocused ? 'animate-scale-in shadow-glow' : 'opacity-75 scale-95'
        }`}
        onClick={onClick}
      >
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-12">
          <div className="mb-8 animate-glow-pulse">
            <FontAwesomeIcon 
              icon={faStar} 
              className="text-6xl text-primary"
            />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-primary bg-clip-text text-transparent animate-fade-in">
            John Doe
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-8 animate-fade-in-up">
            Full-Stack Developer & UI/UX Designer
          </p>
          <div className="flex items-center space-x-4 text-primary animate-slide-in-right">
            <span className="text-lg">Explore my work</span>
            <FontAwesomeIcon icon={faArrowRight} className="text-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`glass-effect w-full max-w-2xl h-[70vh] rounded-3xl p-8 cursor-pointer hover-lift transition-all duration-500 ${
        isFocused ? 'animate-scale-in shadow-elegant border-primary/30' : 'opacity-80 scale-95'
      }`}
      onClick={onClick}
    >
      <div className="h-full flex flex-col items-center justify-center text-center">
        <div className={`mb-8 transition-all duration-300 ${isFocused ? 'animate-glow-pulse' : ''}`}>
          <FontAwesomeIcon 
            icon={iconMap[data.icon as keyof typeof iconMap]} 
            className="text-5xl text-primary"
          />
        </div>
        
        <h2 className="text-4xl font-bold mb-4 text-foreground">
          {data.title}
        </h2>
        
        <p className="text-xl text-muted-foreground mb-8">
          {data.description}
        </p>
        
        <div className="flex items-center space-x-3 text-primary group">
          <span className="text-lg font-medium">Learn More</span>
          <FontAwesomeIcon 
            icon={faArrowRight} 
            className="text-lg transition-transform group-hover:translate-x-2" 
          />
        </div>
      </div>
    </div>
  );
};