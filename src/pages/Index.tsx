import { useState } from 'react';
import { SEO } from '../components/SEO';
import { Carousel } from '../components/Carousel';
import { Modal } from '../components/Modal';
import { Navbar } from '../components/Navbar';
import { Gitlantis } from '../components/Gitlantis';
import { Button } from '../components/ui/button';
import { KeyboardControls } from '@react-three/drei';
import { Eye, Grid3X3 } from 'lucide-react';

const Index = () => {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [view3D, setView3D] = useState(false);

  const handleCardClick = (data: any) => {
    setModalContent(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handleNavigate = (index: number) => {
    setFocusedIndex(index);
  };

  const keyboardMap = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'right', keys: ['ArrowRight', 'KeyD'] },
  ];

  return (
    <>
      <SEO 
        title="John Doe - Full-Stack Developer & UI/UX Designer"
        description="Experienced full-stack developer specializing in React, Node.js, and modern web technologies. View my portfolio of innovative projects and get in touch."
        keywords="full-stack developer, React developer, Node.js, web development, UI/UX design, portfolio"
        canonicalUrl="https://portfolio.dev"
      />
      
      <main className="min-h-screen gradient-hero relative">
        {/* View Toggle */}
        <div className="absolute top-4 right-4 z-20">
          <Button
            onClick={() => setView3D(!view3D)}
            variant="secondary"
            size="sm"
            className="flex items-center gap-2"
          >
            {view3D ? (
              <>
                <Grid3X3 className="w-4 h-4" />
                Gallery View
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                3D Explorer
              </>
            )}
          </Button>
        </div>

        {view3D ? (
          <KeyboardControls map={keyboardMap}>
            <Gitlantis onProjectSelect={handleCardClick} />
          </KeyboardControls>
        ) : (
          <>
            <Navbar focusedIndex={focusedIndex} onNavigate={handleNavigate} />
            
            <div className="pt-16">
              <Carousel 
                onCardClick={handleCardClick}
                focusedIndex={focusedIndex}
                onFocusChange={setFocusedIndex}
              />
            </div>
          </>
        )}

        <Modal 
          isOpen={isModalOpen}
          content={modalContent}
          onClose={closeModal}
        />
      </main>
    </>
  );
};

export default Index;
