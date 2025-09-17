import { useState } from 'react';
import { SEO } from '../components/SEO';
import { Carousel } from '../components/Carousel';
import { Modal } from '../components/Modal';
import { Navbar } from '../components/Navbar';

const Index = () => {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

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

  return (
    <>
      <SEO 
        title="John Doe - Full-Stack Developer & UI/UX Designer"
        description="Experienced full-stack developer specializing in React, Node.js, and modern web technologies. View my portfolio of innovative projects and get in touch."
        keywords="full-stack developer, React developer, Node.js, web development, UI/UX design, portfolio"
        canonicalUrl="https://portfolio.dev"
      />
      
      <main className="min-h-screen gradient-hero">
        <Navbar focusedIndex={focusedIndex} onNavigate={handleNavigate} />
        
        <div className="pt-16">
          <Carousel 
            onCardClick={handleCardClick}
            focusedIndex={focusedIndex}
            onFocusChange={setFocusedIndex}
          />
        </div>

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
