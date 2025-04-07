
import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Star, MessageSquare, Image, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import WeEventButton from "@/components/WeEventButton";

const CategoriesSection: React.FC = () => {
  const categories = [
    { name: "Traiteurs", icon: <Image size={24} />, count: 42 },
    { name: "Lieux de réception", icon: <Calendar size={24} />, count: 38 },
    { name: "Décoration", icon: <Star size={24} />, count: 29 },
    { name: "Animation", icon: <MessageSquare size={24} />, count: 25 }
  ];

  return (
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
  );
};

export default CategoriesSection;
