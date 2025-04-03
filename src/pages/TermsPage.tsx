
import React from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import GoldButton from "@/components/GoldButton";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-gray-200 py-4">
        <div className="container flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <GoldButton variant="outline" size="sm">
                Connexion
              </GoldButton>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-vip-black">Conditions Générales d'Utilisation</h1>
          
          <div className="space-y-8 text-vip-gray-600">
            <section>
              <h2 className="text-xl font-semibold text-vip-gold mb-4">1. Acceptation des conditions</h2>
              <p>
                En accédant et en utilisant le service Best Events VIP, vous acceptez d'être lié par les présentes 
                Conditions Générales d'Utilisation. Si vous n'acceptez pas toutes les conditions, vous ne pouvez pas 
                accéder au service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-vip-gold mb-4">2. Description du service</h2>
              <p className="mb-4">
                Best Events VIP est une plateforme exclusive qui met en relation des clients VIP et des partenaires 
                professionnels de l'événementiel. Notre service comprend l'accès à un réseau de partenaires sélectionnés, 
                des conseils d'experts via des podcasts exclusifs, et des avantages tarifaires pour nos membres.
              </p>
              <p>
                Le service est accessible aux utilisateurs enregistrés en tant que clients VIP (gratuit) ou partenaires 
                (abonnement payant).
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-vip-gold mb-4">3. Inscription et compte utilisateur</h2>
              <p className="mb-4">
                Pour utiliser notre service, vous devez créer un compte en fournissant des informations complètes et exactes. 
                Vous êtes responsable du maintien de la confidentialité de votre mot de passe et de toutes les activités qui 
                se produisent sous votre compte.
              </p>
              <p>
                Vous acceptez de nous informer immédiatement de toute utilisation non autorisée de votre compte ou de toute 
                autre violation de la sécurité.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-vip-gold mb-4">4. Abonnement partenaire</h2>
              <p className="mb-4">
                L'abonnement partenaire est facturé annuellement. Le prix de l'abonnement est clairement indiqué avant 
                la validation de votre inscription.
              </p>
              <p className="mb-4">
                Renouvellement automatique : Votre abonnement sera automatiquement renouvelé à la fin de chaque période, 
                sauf si vous le résiliez avant la date de renouvellement.
              </p>
              <p>
                Résiliation : Vous pouvez résilier votre abonnement à tout moment depuis votre compte. La résiliation prendra 
                effet à la fin de la période d'abonnement en cours.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-vip-gold mb-4">5. Contenu du service</h2>
              <p className="mb-4">
                Le contenu disponible via notre service, y compris les podcasts, textes, graphiques, logos, images et vidéos, 
                est la propriété de Best Events VIP ou de ses concédants de licence et est protégé par les lois sur la propriété 
                intellectuelle.
              </p>
              <p>
                Vous ne pouvez pas modifier, publier, transmettre, participer au transfert ou à la vente, créer des œuvres dérivées 
                ou exploiter de quelque manière que ce soit tout contenu du service sans notre autorisation écrite préalable.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-vip-gold mb-4">6. Contenu utilisateur</h2>
              <p className="mb-4">
                En soumettant du contenu sur notre plateforme (podcasts, descriptions, messages), vous nous accordez une licence 
                mondiale, non exclusive, libre de redevance pour utiliser, reproduire, modifier, adapter, publier, traduire et 
                distribuer ce contenu.
              </p>
              <p>
                Vous garantissez que le contenu que vous soumettez ne viole pas les droits de tiers, y compris les droits de 
                propriété intellectuelle, et qu'il n'est pas illégal, obscène, diffamatoire ou autrement répréhensible.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-vip-gold mb-4">7. Mise en relation</h2>
              <p className="mb-4">
                Best Events VIP agit uniquement comme intermédiaire entre les clients et les partenaires. Nous ne sommes pas 
                responsables des services fournis par les partenaires et n'offrons aucune garantie quant à la qualité de ces services.
              </p>
              <p>
                Tout contrat pour la fourniture de services est conclu directement entre le client et le partenaire, 
                Best Events VIP n'étant pas partie à ce contrat.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-vip-gold mb-4">8. Limitation de responsabilité</h2>
              <p>
                Dans toute la mesure permise par la loi applicable, Best Events VIP ne sera pas responsable des dommages 
                indirects, spéciaux, accessoires, consécutifs ou punitifs, y compris la perte de profits ou de revenus, 
                résultant de votre utilisation du service ou de votre incapacité à utiliser le service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-vip-gold mb-4">9. Modification des conditions</h2>
              <p>
                Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prendront effet 
                dès leur publication sur notre site. Il est de votre responsabilité de consulter régulièrement nos conditions.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-vip-gold mb-4">10. Loi applicable</h2>
              <p>
                Les présentes conditions sont régies et interprétées conformément aux lois françaises, sans égard aux 
                principes de conflits de lois.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-vip-gold mb-4">11. Contact</h2>
              <p>
                Pour toute question concernant ces conditions, veuillez nous contacter à l'adresse : 
                contact@best-events-vip.com
              </p>
            </section>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/">
              <GoldButton>Retour à l'accueil</GoldButton>
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t border-gray-200">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/">
              <Logo />
            </Link>
            <p className="text-vip-gray-500 text-sm">
              © {new Date().getFullYear()} Best Events VIP. Tous droits réservés.
            </p>
            <div className="flex gap-4">
              <Link to="/privacy" className="text-vip-gray-500 hover:text-vip-gold text-sm">
                Politique de confidentialité
              </Link>
              <Link to="/terms" className="text-vip-gold hover:underline text-sm">
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TermsPage;
