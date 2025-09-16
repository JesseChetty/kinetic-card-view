import { useRef, useEffect, useState } from 'react';
import { Card } from './Card';
import { windowData } from '../data/portfolioData';

interface CarouselProps {
  onCardClick: (data: any) => void;
  focusedIndex: number;
  onFocusChange: (index: number) => void;
}

export const Carousel = ({ onCardClick, focusedIndex, onFocusChange }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      // Don't update focus during programmatic navigation
      if (isNavigatingRef.current) return;
      
      const scrollLeft = carousel.scrollLeft;
      const cardWidth = carousel.clientWidth * 0.8;
      const newIndex = Math.round(scrollLeft / cardWidth);
      const clampedIndex = Math.min(Math.max(newIndex, 0), windowData.length - 1);
      console.log('Scroll event - updating focus to:', clampedIndex);
      onFocusChange(clampedIndex);
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [onFocusChange]);

  const scrollToCard = (index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    console.log('Scrolling to card:', index);
    isNavigatingRef.current = true;
    
    const cardWidth = carousel.clientWidth * 0.8;
    carousel.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });

    // Reset the flag after scrolling completes
    setTimeout(() => {
      isNavigatingRef.current = false;
      console.log('Navigation complete, re-enabling scroll listener');
    }, 500);
  };

  // Scroll to card when focusedIndex changes externally (from navbar)
  useEffect(() => {
    console.log('focusedIndex changed to:', focusedIndex);
    scrollToCard(focusedIndex);
  }, [focusedIndex]);

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        ref={carouselRef}
        className="carousel-snap flex h-full overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {windowData.map((data, index) => (
          <div
            key={data.id}
            className="carousel-item flex-shrink-0 w-[80vw] h-full flex items-center justify-center px-4"
          >
            <Card
              data={data}
              isFocused={index === focusedIndex}
              onClick={() => onCardClick(data)}
            />
          </div>
        ))}
      </div>

      {/* Navigation indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {windowData.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToCard(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === focusedIndex
                ? 'bg-primary shadow-glow'
                : 'bg-muted hover:bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};