
import React from "react";
import MobileOptimizedLayout from "@/components/layouts/MobileOptimizedLayout";
import HomeHeader from "@/components/home/HomeHeader";
import HeroSection from "@/components/home/HeroSection";
import PresentationSection from "@/components/home/PresentationSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import HomeFooter from "@/components/home/HomeFooter";
import { useLanguage } from "@/contexts/LanguageContext";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const { t } = useLanguage();
  
  return (
    <MobileOptimizedLayout fullHeight={true}>
      <div className="min-h-screen bg-we-white flex flex-col">
        <HomeHeader />

        <main className="flex-1">
          <HeroSection />
          <PresentationSection />
          <CategoriesSection />
          <TestimonialsSection />
        </main>

        <HomeFooter />
      </div>
    </MobileOptimizedLayout>
  );
};

export default HomePage;
