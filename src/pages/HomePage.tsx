import React from 'react';
import MetaTags from '@/components/seo/MetaTags';
import HomeHeader from '@/components/home/HomeHeader';
import HomeFooter from '@/components/home/HomeFooter';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import GenerateDocumentationButton from '@/components/documentation/GenerateDocumentationButton';

const HomePage: React.FC = () => {
  console.log('HomePage component rendering');
  return (
    <div className="min-h-screen bg-gray-50">
      <MetaTags
        title="Bienvenue sur We Event"
        description="WeEvent est la plateforme tout-en-un pour organiser vos événements. Mariages, anniversaires, séminaires d'entreprise - créez des moments inoubliables avec nos meilleurs prestataires."
      />
      <HomeHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif text-we-green mb-6">
            Créez des Événements Exceptionnels
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Mariages, anniversaires, séminaires d'entreprise - nous vous accompagnons dans l'organisation de tous vos événements
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register-client">
              <Button className="bg-we-gold hover:bg-we-gold/90 text-black font-medium px-8 py-2">
                Je suis un client
              </Button>
            </Link>
            <Link to="/register-partner">
              <Button variant="outline" className="border-we-gold text-we-gold hover:bg-we-gold/10 px-8 py-2">
                Je suis un prestataire
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Documentation Button - Add this near the top after hero */}
      <div className="container mx-auto px-4 py-6">
        <GenerateDocumentationButton className="mx-auto" />
      </div>
      
      {/* Platform Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-we-green text-center mb-16">
            Découvrez la plateforme We Event
          </h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="text-center">
              <h3 className="text-2xl font-serif text-we-green mb-4">Pour les clients</h3>
              <p className="text-gray-600 mb-6">
                Une plateforme intuitive pour organiser vos événements en toute simplicité. Trouvez les meilleurs prestataires et gérez tous les aspects de votre projet.
              </p>
              <Link to="/register-client">
                <Button className="bg-we-gold hover:bg-we-gold/90 text-black">
                  Fonctionnalités client
                </Button>
              </Link>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-serif text-we-green mb-4">Pour les prestataires</h3>
              <p className="text-gray-600 mb-6">
                Développez votre activité en rejoignant notre réseau de professionnels de l'événementiel. Gagnez en visibilité et trouvez de nouveaux clients.
              </p>
              <Link to="/register-partner">
                <Button className="bg-we-gold hover:bg-we-gold/90 text-black">
                  Fonctionnalités prestataire
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <TestimonialsSection />
      
      <HomeFooter />
    </div>
  );
};

export default HomePage;
