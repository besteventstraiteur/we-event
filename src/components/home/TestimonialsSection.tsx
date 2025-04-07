
import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import WeEventButton from "@/components/WeEventButton";

const TestimonialsSection: React.FC = () => {
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
  );
};

export default TestimonialsSection;
