
import React from 'react';
import { Button } from '@/components/ui/button';

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-we-green text-center mb-4">
          Ce qu'ils en disent
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Des événements réussis et des clients satisfaits
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-we-gold mb-2">★★★★★</div>
            <p className="text-gray-600 italic mb-4">
              "We Event a transformé notre mariage en un moment d'exception. L'équipe est à l'écoute et vraiment professionnelle."
            </p>
            <div>
              <p className="font-semibold">Marie & Pierre</p>
              <p className="text-sm text-gray-500">Mariage à Paris</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-we-gold mb-2">★★★★★</div>
            <p className="text-gray-600 italic mb-4">
              "L'organisation de notre séminaire d'entreprise a été un véritable succès grâce à We Event. Un service impeccable !"
            </p>
            <div>
              <p className="font-semibold">Sophie L.</p>
              <p className="text-sm text-gray-500">Séminaire d'entreprise</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-we-gold mb-2">★★★★★</div>
            <p className="text-gray-600 italic mb-4">
              "Une fête d'anniversaire mémorable ! Les prestataires étaient parfaits et la coordination sans faille."
            </p>
            <div>
              <p className="font-semibold">Thomas D.</p>
              <p className="text-sm text-gray-500">Anniversaire 40 ans</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button variant="outline" className="border-we-gold text-we-gold hover:bg-we-gold/10">
            Voir tous les avis
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
