import React from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import GoldButton from "@/components/GoldButton";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-vip-gray-200 py-4">
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
          <h1 className="text-3xl font-bold mb-8 text-vip-black">Politique de Confidentialité</h1>
          
          <div className="space-y-8 text-vip-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-vip-gold mb-4">1. Introduction</h2>
              <p className="mb-4">
                La présente Politique de Confidentialité décrit comment Best Events VIP recueille, utilise et protège 
                les informations personnelles que vous nous fournissez lorsque vous utilisez notre service.
              </p>
              <p>
                Nous nous engageons à assurer la protection de votre vie privée. Si nous vous demandons de fournir 
                certaines informations permettant de vous identifier lors de l'utilisation de notre service, 
                vous pouvez être assuré qu'elles ne seront utilisées que conformément à la présente déclaration de confidentialité.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-vip-gold mb-4">2. Collecte d'informations</h2>
              <p className="mb-4">
                Nous pouvons collecter les informations suivantes :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nom et prénom</li>
                <li>Informations de contact, y compris l'adresse e-mail et le numéro de téléphone</li>
                <li>Informations démographiques telles que l'adresse postale</li>
                <li>Informations sur votre entreprise (pour les partenaires)</li>
                <li>Autres informations pertinentes pour les enquêtes client et/ou les offres</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-vip-gold mb-4">3. Utilisation des informations</h2>
              <p className="mb-4">
                Nous utilisons ces informations pour comprendre vos besoins et vous fournir un meilleur service, 
                et en particulier pour les raisons suivantes :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Conservation interne des enregistrements</li>
                <li>Amélioration de nos produits et services</li>
                <li>Envoi périodique d'e-mails promotionnels concernant de nouveaux produits, offres spéciales ou autres 
                    informations que nous pensons susceptibles de vous intéresser</li>
                <li>Pour vous contacter à des fins d'études de marché</li>
                <li>Pour personnaliser notre site web en fonction de vos intérêts</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-vip-gold mb-4">4. Sécurité</h2>
              <p>
                Nous nous engageons à assurer la sécurité de vos informations. Afin d'empêcher tout accès non autorisé 
                ou divulgation, nous avons mis en place des procédures physiques, électroniques et managériales appropriées 
                pour sauvegarder et sécuriser les informations que nous recueillons en ligne.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-vip-gold mb-4">5. Cookies</h2>
              <p className="mb-4">
                Un cookie est un petit fichier qui demande l'autorisation d'être placé sur le disque dur de votre ordinateur. 
                Une fois que vous avez accepté, le fichier est ajouté et le cookie permet d'analyser le trafic web ou vous 
                signale lorsque vous visitez un site particulier.
              </p>
              <p>
                Nous utilisons des cookies de trafic pour identifier les pages utilisées. Cela nous aide à analyser les données 
                concernant le trafic des pages web et à améliorer notre site afin de l'adapter aux besoins des clients. 
                Nous n'utilisons ces informations qu'à des fins d'analyse statistique, puis les données sont supprimées du système.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-vip-gold mb-4">6. Liens vers d'autres sites web</h2>
              <p>
                Notre site web peut contenir des liens vers d'autres sites web d'intérêt. Cependant, une fois que vous avez 
                utilisé ces liens pour quitter notre site, vous devez noter que nous n'avons aucun contrôle sur cet autre site web. 
                Par conséquent, nous ne pouvons être responsables de la protection et de la confidentialité des informations que 
                vous fournissez lors de la visite de ces sites et ces sites ne sont pas régis par la présente déclaration de 
                confidentialité. Vous devez faire preuve de prudence et consulter la déclaration de confidentialité applicable au 
                site web en question.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-vip-gold mb-4">7. Contrôle de vos informations personnelles</h2>
              <p className="mb-4">
                Vous pouvez choisir de restreindre la collecte ou l'utilisation de vos informations personnelles de la manière suivante :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Si vous avez précédemment accepté que nous utilisions vos informations personnelles à des fins de marketing direct, 
                    vous pouvez changer d'avis à tout moment en nous contactant via notre formulaire de contact.</li>
                <li>Nous ne vendrons, ne distribuerons ni ne louerons vos informations personnelles à des tiers, sauf si nous avons 
                    votre permission ou si la loi nous y oblige.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-vip-gold mb-4">8. Contact</h2>
              <p>
                Pour toute question concernant cette politique ou pour exercer vos droits en matière de protection des données, 
                veuillez nous contacter à l'adresse email suivante : privacy@best-events-vip.com
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-vip-gold mb-4">9. Mises à jour</h2>
              <p>
                Cette politique de confidentialité a été mise à jour le 1er janvier 2023. Nous nous réservons le droit de la 
                modifier à tout moment. Les modifications prendront effet dès leur publication sur cette page.
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

      <footer className="py-8 border-t border-vip-gray-200">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/">
              <Logo />
            </Link>
            <p className="text-vip-gray-500 text-sm">
              © {new Date().getFullYear()} Best Events VIP. Tous droits réservés.
            </p>
            <div className="flex gap-4">
              <Link to="/privacy" className="text-vip-gold hover:underline text-sm">
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

export default PrivacyPage;
