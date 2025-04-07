
import React from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, Star, MessageSquare, Image, Calendar } from "lucide-react";
import WeEventLogo from "@/components/WeEventLogo";
import WeEventButton from "@/components/WeEventButton";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileOptimizedLayout from "@/components/layouts/MobileOptimizedLayout";

const HomePage = () => {
  const isMobile = useIsMobile();

  const categories = [
    { name: "Traiteurs", icon: <Image size={24} />, count: 42 },
    { name: "Lieux de réception", icon: <Calendar size={24} />, count: 38 },
    { name: "Décoration", icon: <Star size={24} />, count: 29 },
    { name: "Animation", icon: <MessageSquare size={24} />, count: 25 }
  ];

  const testimonials = [
    {
      name: "Marie & Pierre",
      event: "Mariage à Paris",
      text: "We Event a transformé notre mariage en un moment d'exception. L'équipe est à l'écoute et vraiment professionnelle.",
      rating: 5
    },
    {
      name: "Sophie L.",
      event: "Anniversaire d'entreprise",
      text: "Organiser un événement professionnel n'a jamais été aussi simple. Merci pour votre accompagnement !",
      rating: 4.5
    },
    {
      name: "Thomas & Julie",
      event: "Mariage champêtre",
      text: "Des prestataires de qualité et un suivi impeccable. Nous recommandons vivement !",
      rating: 5
    }
  ];

  return (
    <MobileOptimizedLayout fullHeight={true}>
      <div className="min-h-screen bg-we-white flex flex-col">
        <header className="border-b border-we-beige py-4">
          <div className="container flex items-center justify-between">
            <Link to="/">
              <WeEventLogo size={isMobile ? "small" : "medium"} />
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <NavLink href="/" isActive>Accueil</NavLink>
              <NavLink href="/partners">Prestataires</NavLink>
              <NavLink href="/client/pinterbest">Inspirations</NavLink>
              <NavLink href="/partners">Avis</NavLink>
              <NavLink href="/blog">Blog</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link to="/login">
                <WeEventButton variant="outline" size={isMobile ? "xs" : "sm"}>
                  Connexion
                </WeEventButton>
              </Link>
              <div className="md:hidden">
                <button className="text-we-green p-2">
                  <Search size={20} />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative py-12 sm:py-20 bg-gradient-to-b from-we-beige/40 to-we-white text-center">
            <div className="container max-w-4xl mx-auto px-4">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl mb-4 text-we-green">
                Créez des <span className="text-we-gold">événements</span> d'exception
              </h1>
              <p className="font-body text-we-gray-700 mb-8 max-w-2xl mx-auto">
                La plateforme qui connecte les clients avec les meilleurs prestataires pour des événements inoubliables
              </p>
              
              <div className="relative max-w-2xl mx-auto mb-10">
                <div className="flex items-center bg-white rounded-lg shadow-sm border border-we-gray-200 overflow-hidden">
                  <Search className="ml-4 text-we-gray-500" size={20} />
                  <input 
                    type="text"
                    placeholder="Rechercher un prestataire, un lieu..."
                    className="w-full py-3 px-4 outline-none text-we-gray-700 bg-transparent"
                  />
                  <button className="px-6 py-3 bg-we-gold text-white font-medium hover:bg-we-gold/90">
                    Rechercher
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link to="/register-client" className="w-full sm:w-auto">
                  <WeEventButton size={isMobile ? "sm" : "lg"} className="w-full sm:w-auto">
                    Je crée mon événement
                  </WeEventButton>
                </Link>
                <Link to="/register-partner" className="w-full sm:w-auto">
                  <WeEventButton variant="outline" size={isMobile ? "sm" : "lg"} className="w-full sm:w-auto">
                    Devenir prestataire
                  </WeEventButton>
                </Link>
              </div>
            </div>
          </section>

          {/* Categories Section */}
          <section className="py-12 sm:py-16 bg-white">
            <div className="container">
              <div className="text-center mb-10">
                <h2 className="font-display text-2xl sm:text-3xl mb-2 text-we-green">Trouvez le prestataire idéal</h2>
                <p className="text-we-gray-600">Des professionnels sélectionnés pour chaque aspect de votre événement</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {categories.map((category, index) => (
                  <Card key={index} className="border-we-beige hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-1">
                    <CardContent className="p-6 text-center">
                      <div className="bg-we-beige/50 w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-3 text-we-green">
                        {category.icon}
                      </div>
                      <h3 className="font-medium mb-1">{category.name}</h3>
                      <p className="text-sm text-we-gray-500">{category.count} prestataires</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link to="/partners">
                  <WeEventButton variant="ghost" className="inline-flex items-center">
                    Toutes les catégories
                    <ChevronDown size={16} className="ml-1" />
                  </WeEventButton>
                </Link>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-12 sm:py-16 bg-we-beige/30">
            <div className="container">
              <div className="text-center mb-10">
                <h2 className="font-display text-2xl sm:text-3xl mb-2 text-we-green">Ce qu'ils en disent</h2>
                <p className="text-we-gray-600">Des événements réussis et des clients satisfaits</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="border-none shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < Math.floor(testimonial.rating) ? "text-we-gold" : "text-we-gray-300"}
                            fill={i < Math.floor(testimonial.rating) ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                      <p className="text-we-gray-700 mb-4 italic">"{testimonial.text}"</p>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-we-gray-500">{testimonial.event}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link to="/partners">
                  <WeEventButton>
                    Voir tous les avis
                  </WeEventButton>
                </Link>
              </div>
            </div>
          </section>

          {/* Inspirations Preview */}
          <section className="py-12 sm:py-16 bg-white">
            <div className="container">
              <div className="text-center mb-10">
                <h2 className="font-display text-2xl sm:text-3xl mb-2 text-we-green">Inspirations</h2>
                <p className="text-we-gray-600">Trouvez l'inspiration pour votre événement parfait</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="aspect-w-1 aspect-h-1 overflow-hidden rounded-md cursor-pointer group relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <img 
                      src={`https://source.unsplash.com/random/${500 + index}x${500 + index}/?wedding,event`}
                      alt="Inspiration"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link to="/client/pinterbest">
                  <WeEventButton>
                    Découvrir plus d'inspirations
                  </WeEventButton>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <footer className="py-8 border-t border-we-beige bg-white">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <Link to="/">
                <WeEventLogo size="small" />
              </Link>
              <p className="text-we-gray-500 text-sm">
                © {new Date().getFullYear()} We Event. Tous droits réservés.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/partners" className="text-we-gray-600 hover:text-we-gold text-sm">
                  Prestataires
                </Link>
                <Link to="/client/pinterbest" className="text-we-gray-600 hover:text-we-gold text-sm">
                  Inspirations
                </Link>
                <Link to="/privacy" className="text-we-gray-600 hover:text-we-gold text-sm">
                  Confidentialité
                </Link>
                <Link to="/terms" className="text-we-gray-600 hover:text-we-gold text-sm">
                  Conditions
                </Link>
                <Link to="/contact" className="text-we-gray-600 hover:text-we-gold text-sm">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </MobileOptimizedLayout>
  );
};

// Component for navigation links
const NavLink = ({ href, children, isActive = false }) => (
  <Link 
    to={href}
    className={`relative text-sm font-medium pb-1 ${
      isActive ? 'text-we-green' : 'text-we-gray-600 hover:text-we-green'
    }`}
  >
    {children}
    {isActive && (
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-we-gold"></span>
    )}
  </Link>
);

export default HomePage;
