
import React from "react";
import MobileOptimizedLayout from "@/components/layouts/MobileOptimizedLayout";
import HomeHeader from "@/components/home/HomeHeader";
import HeroSection from "@/components/home/HeroSection";
import PresentationSection from "@/components/home/PresentationSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import HomeFooter from "@/components/home/HomeFooter";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <MobileOptimizedLayout fullHeight={true}>
      <div className="min-h-screen bg-we-white flex flex-col">
        <HomeHeader />

        <main className="flex-1">
          {/* Hero Section */}
          <HeroSection />

          {/* Présentation Section */}
          <section className="py-12 sm:py-16 bg-white">
            <div className="container">
              <PresentationSection />
            </div>
          </section>

          {/* Categories Section */}
          <CategoriesSection />

          {/* Testimonials Section */}
          <TestimonialsSection />
        </main>

        <HomeFooter />
      </div>
    </MobileOptimizedLayout>
  );
};

export default HomePage;
