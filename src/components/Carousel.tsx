import { useRef, useEffect } from 'react';
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
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      // Don't update focus during programmatic navigation
      if (isNavigatingRef.current) return;

      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        if (!carousel) return;
        const containerCenter = carousel.scrollLeft + carousel.clientWidth / 2;
        let nearestIndex = 0;
        let minDistance = Infinity;

        itemsRef.current.forEach((item, idx) => {
          if (!item) return;
          const itemCenter = item.offsetLeft + item.offsetWidth / 2;
          const distance = Math.abs(itemCenter - containerCenter);
          if (distance < minDistance) {
            minDistance = distance;
            nearestIndex = idx;
          }
        });

        onFocusChange(nearestIndex);
        rafIdRef.current = null;
      });
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [onFocusChange]);

  const scrollToCard = (index: number) => {
    const item = itemsRef.current[index];
    const carousel = carouselRef.current;
    if (!item || !carousel) return;

    isNavigatingRef.current = true;
    item.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });

    // Reset the flag after scrolling completes
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 600);
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
        className="carousel-snap flex h-full overflow-x-auto overflow-y-hidden scrollbar-hide pl-[10vw] pr-[10vw]"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {windowData.map((data, index) => (
          <div
            key={data.id}
            ref={(el) => { if (el) itemsRef.current[index] = el; }}
            className="carousel-item flex-shrink-0 w-[80vw] h-full flex items-center justify-center"
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