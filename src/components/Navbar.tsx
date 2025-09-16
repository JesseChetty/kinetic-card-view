import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { windowData } from '../data/portfolioData';

interface NavbarProps {
  focusedIndex: number;
  onNavigate: (index: number) => void;
}

export const Navbar = ({ focusedIndex, onNavigate }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 glass-effect border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
                Portfolio
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {windowData.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(index)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      index === focusedIndex
                        ? 'gradient-primary text-white shadow-elegant'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-muted-foreground hover:text-foreground p-2"
              >
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm" 
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-64 glass-effect p-6 animate-slide-in-right">
            <div className="flex items-center justify-between mb-8">
              <div className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
                Portfolio
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground p-2"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            
            <div className="space-y-4">
              {windowData.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(index);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                    index === focusedIndex
                      ? 'gradient-primary text-white shadow-elegant'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};