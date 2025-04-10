
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import VideoPresentation from "@/components/video-presentation/VideoPresentation";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PresentationSectionProps {}

const PresentationSection: React.FC<PresentationSectionProps> = () => {
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  
  return (
    <section className="py-12 bg-we-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="max-w-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-we-green mb-4">
              {t('home.presentationTitle')}
            </h2>
            <p className="text-we-gray-700 mb-6">
              {t('home.presentationDescription')}
            </p>
            <VideoPresentation buttonText={t('home.watchPresentation')} />
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="/images/platform-preview.jpg"
              alt={t('home.platformPreviewAlt')}
              className="rounded-lg shadow-md"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/600x400?text=We+Event+Platform';
              }}
            />
          </div>
        </div>
        
        {/* Client and Partner Presentations Side by Side */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Client Presentation */}
          <div className="bg-we-beige/20 rounded-lg p-6 text-center flex flex-col items-center justify-between h-full shadow-sm">
            <div>
              <h3 className="text-xl font-semibold text-we-green mb-3">{t('home.clientPresentationTitle')}</h3>
              <p className="text-we-gray-700 mb-6">
                {t('home.clientPresentationDescription')}
              </p>
            </div>
            <VideoPresentation buttonText={t('home.watchClientPresentation')} />
          </div>
          
          {/* Partner Presentation */}
          <div className="bg-we-beige/20 rounded-lg p-6 text-center flex flex-col items-center justify-between h-full shadow-sm">
            <div>
              <h3 className="text-xl font-semibold text-we-green mb-3">{t('home.partnerPresentationTitle')}</h3>
              <p className="text-we-gray-700 mb-6">
                {t('home.partnerPresentationDescription')}
              </p>
            </div>
            <VideoPresentation buttonText={t('home.watchPartnerPresentation')} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PresentationSection;
