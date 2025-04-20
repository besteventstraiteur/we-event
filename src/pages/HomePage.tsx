
import React from 'react';
import MetaTags from '@/components/seo/MetaTags';
import WeEventLogo from '@/components/WeEventLogo';
import HomeHeader from '@/components/home/HomeHeader';
import HomeFooter from '@/components/home/HomeFooter';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HomePage: React.FC = () => {
  console.log('HomePage component rendering');
  return (
    <>
      <MetaTags
        title="Planifiez votre mariage de rêve"
        description="WeEvent est la plateforme tout-en-un pour organiser votre mariage. Trouvez les meilleurs prestataires, gérez vos invités et créez un événement inoubliable."
      />
      <HomeHeader />
      <main className="bg-gradient-to-r from-gray-800 to-black text-white min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center mb-12">
          <WeEventLogo size="large" asButton={false} withText={true} />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-6">
            Planifiez le mariage de <span className="text-yellow-400">vos rêves</span>
          </h1>
          <p className="text-xl mt-4 max-w-2xl mx-auto text-gray-300">
            Une expérience tout-en-un pour organiser un événement inoubliable
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Link to="/register-client">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition-all">
              Commencer gratuitement
            </Button>
          </Link>
          <Link to="/partners">
            <Button variant="outline" className="bg-transparent hover:bg-white/10 border border-white text-white font-bold py-3 px-6 rounded-lg transition-all">
              Découvrir nos prestataires
            </Button>
          </Link>
        </div>
      </main>
      <HomeFooter />
    </>
  );
};

export default HomePage;
