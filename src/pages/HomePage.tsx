import React from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import GoldButton from "@/components/GoldButton";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-vip-gray-200 py-4">
        <div className="container flex items-center justify-between">
          <Logo />
          <div className="flex items-center space-x-4">
            <Link to="/partners" className="text-vip-gray-700 hover:text-vip-gold">
              Nos Partenaires
            </Link>
            <Link to="/login">
              <GoldButton variant="outline" size="sm">
                Connexion
              </GoldButton>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden bg-white">
          <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-vip-gold via-transparent to-transparent"></div>
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="gold-gradient">Club Privé</span>{" "}
                <span className="text-vip-black">Best Events VIP</span>
              </h1>
              <p className="text-xl text-vip-gray-700 leading-relaxed">
                Accédez à des avantages exclusifs, des conseils gratuits, des tarifs négociés et 
                un réseau de partenaires sélectionnés pour vos événements exceptionnels.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Link to="/register-client">
                  <GoldButton size="lg" className="w-full sm:w-auto">
                    Inscription Client VIP
                  </GoldButton>
                </Link>
                <Link to="/register-partner">
                  <GoldButton variant="outline" size="lg" className="w-full sm:w-auto">
                    Inscription Partenaire VIP
                  </GoldButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-vip-gray-100">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="gold-gradient">Avantages Exclusifs</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg border border-vip-gray-200 shadow-lg">
                <h3 className="text-xl font-semibold text-vip-gold mb-4">Conseils Gratuits</h3>
                <p className="text-vip-gray-600">
                  Accédez à des conseils d'experts pour l'organisation de vos événements 
                  exceptionnels avec nos podcasts exclusifs.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-vip-gray-200 shadow-lg">
                <h3 className="text-xl font-semibold text-vip-gold mb-4">Tarifs Négociés</h3>
                <p className="text-vip-gray-600">
                  Bénéficiez de réductions exceptionnelles chez nos partenaires 
                  triés sur le volet pour chaque aspect de votre événement.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-vip-gray-200 shadow-lg">
                <h3 className="text-xl font-semibold text-vip-gold mb-4">Réseau Premium</h3>
                <p className="text-vip-gray-600">
                  Accédez à un réseau de partenaires d'exception, sélectionnés pour 
                  leur professionnalisme et la qualité de leurs services.
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link to="/partners">
                <GoldButton variant="outline">
                  Découvrir nos partenaires
                </GoldButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="gold-gradient">Ils nous font confiance</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-vip-gray-100 p-6 rounded-lg border border-vip-gray-200">
                <p className="text-vip-gray-700 italic mb-4">
                  "Grâce au Club VIP Best Events, nous avons économisé plus de 20% sur 
                  l'organisation de notre mariage tout en bénéficiant de prestataires exceptionnels."
                </p>
                <p className="text-vip-gold font-semibold">Sophie & Thomas</p>
              </div>
              <div className="bg-vip-gray-100 p-6 rounded-lg border border-vip-gray-200">
                <p className="text-vip-gray-700 italic mb-4">
                  "Devenir partenaire VIP nous a permis d'augmenter notre visibilité et 
                  d'acquérir une clientèle fidèle et qualifiée. Un investissement rentabilisé en quelques mois!"
                </p>
                <p className="text-vip-gold font-semibold">Marie - Fleuriste Événementiel</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-vip-gray-200">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Logo />
            <p className="text-vip-gray-500 text-sm">
              © {new Date().getFullYear()} Best Events VIP. Tous droits réservés.
            </p>
            <div className="flex gap-4">
              <Link to="/partners" className="text-vip-gray-600 hover:text-vip-gold text-sm">
                Nos Partenaires
              </Link>
              <Link to="/privacy" className="text-vip-gray-600 hover:text-vip-gold text-sm">
                Politique de confidentialité
              </Link>
              <Link to="/terms" className="text-vip-gray-600 hover:text-vip-gold text-sm">
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
