
import React from "react";
import { SlideType } from "../presentation-types";
import SlideContent from "./SlideContent";

interface SlidesContainerProps {
  slides: SlideType[];
  currentSlide: number;
  navigateToFeature: () => void;
}

const SlidesContainer: React.FC<SlidesContainerProps> = ({
  slides,
  currentSlide,
  navigateToFeature
}) => {
  return (
    <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-500 ${
            index === currentSlide
              ? "translate-x-0 opacity-100"
              : index < currentSlide
              ? "-translate-x-full opacity-0"
              : "translate-x-full opacity-0"
          }`}
        >
          <SlideContent 
            slide={slide} 
            currentIndex={currentSlide} 
            totalSlides={slides.length} 
            onNavigate={navigateToFeature} 
          />
        </div>
      ))}
    </div>
  );
};

export default SlidesContainer;
