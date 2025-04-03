
// Définition des slides de présentation
const PresentationSlides = [
  {
    title: "Bienvenue sur Best Events VIP",
    description: "Best Events VIP est une plateforme complète dédiée à l'organisation d'événements haut de gamme. Notre mission est de connecter clients VIP et prestataires d'exception pour créer des expériences inoubliables.",
    keyFeatures: [
      "Interface intuitive et élégante",
      "Navigation mobile optimisée",
      "Modules spécifiques pour clients, partenaires et invités",
      "Expérience utilisateur premium"
    ],
    path: "/client/dashboard",
    image: "/screenshots/homepage.png"
  },
  // Fonctionnalités Client
  {
    title: "Fonctionnalités Client",
    description: "Notre plateforme offre un ensemble complet d'outils destinés aux clients pour une organisation d'événement sans stress et parfaitement maîtrisée.",
    keyFeatures: [
      "Tableau de bord intuitif",
      "Gestion budgétaire avancée",
      "Organisation des invités simplifiée",
      "Collaboration en temps réel avec les prestataires"
    ],
    path: "/client/dashboard",
    image: "/screenshots/client-features.png"
  },
  {
    title: "Tableau de bord client",
    description: "Votre espace centralisé pour gérer tous les aspects de votre événement. Visualisez l'avancement de votre projet, les tâches à accomplir et les prochaines échéances.",
    keyFeatures: [
      "Vue d'ensemble de votre projet",
      "Suivi des dernières activités",
      "Accès rapide aux fonctionnalités clés",
      "Compteur avant le jour J"
    ],
    path: "/client/dashboard",
    image: "/screenshots/client-dashboard.png"
  },
  {
    title: "Gestion de budget",
    description: "Suivez et contrôlez vos dépenses avec notre outil de gestion de budget intuitif. Répartissez votre budget par catégorie et surveillez vos dépenses en temps réel.",
    keyFeatures: [
      "Répartition automatique du budget",
      "Suivi des dépenses en temps réel",
      "Alertes de dépassement",
      "Rapports détaillés"
    ],
    path: "/client/budget",
    image: "/screenshots/client-budget.png"
  },
  {
    title: "Gestion des invités",
    description: "Gérez facilement votre liste d'invités, les confirmations de présence, et les préférences alimentaires. Créez des tables et assignez vos invités en quelques clics.",
    keyFeatures: [
      "Import/export de listes d'invités",
      "Suivi des réponses",
      "Gestion des régimes spéciaux",
      "Espace dédié pour vos invités"
    ],
    path: "/client/guests",
    image: "/screenshots/client-guests.png"
  },
  {
    title: "Plan de salle",
    description: "Créez et personnalisez votre plan de table avec notre outil de design intuitif. Placez vos invités à table et adaptez la disposition selon vos besoins.",
    keyFeatures: [
      "Interface drag-and-drop",
      "Assistance IA pour les placements",
      "Gestion des conflits entre invités",
      "Prévisualisation en temps réel"
    ],
    path: "/client/floor-plans",
    image: "/screenshots/client-floor-plans.png"
  },
  {
    title: "Marketplace de packages",
    description: "Découvrez et réservez des packages tout-en-un proposés par nos prestataires partenaires. Comparez les offres, les services inclus et les tarifs.",
    keyFeatures: [
      "Packages personnalisés",
      "Filtrage par besoins",
      "Comparatif détaillé",
      "Réservation sécurisée"
    ],
    path: "/client/wedding-packages",
    image: "/screenshots/client-wedding-packages.png"
  },
  {
    title: "Gestion des prestataires (vue client)",
    description: "Découvrez, contactez et gérez vos prestataires en un seul endroit. Consultez les avis, demandez des devis et planifiez des rendez-vous facilement.",
    keyFeatures: [
      "Annuaire de prestataires premium",
      "Système de notation",
      "Messagerie intégrée",
      "Suivi des contrats"
    ],
    path: "/client/partners",
    image: "/screenshots/client-partners.png"
  },
  {
    title: "Créateur de mini-site",
    description: "Créez un site web élégant pour votre événement que vous pourrez partager avec vos invités. Personnalisez le design, les couleurs et les informations affichées.",
    keyFeatures: [
      "Personnalisation complète",
      "Partage facile",
      "Formulaire de réponse intégré",
      "Compteur avant l'événement"
    ],
    path: "/client/mini-site",
    image: "/screenshots/client-mini-site.png"
  },
  {
    title: "Liste de tâches",
    description: "Gérez efficacement votre planning avec notre outil de suivi des tâches. Organisez vos priorités et suivez l'avancement de votre préparation.",
    keyFeatures: [
      "Tâches prédéfinies selon le type d'événement",
      "Suivi d'avancement",
      "Rappels automatiques",
      "Délégation de tâches"
    ],
    path: "/client/todo",
    image: "/screenshots/client-todo.png"
  },
  {
    title: "Pinterbest - Inspiration",
    description: "Trouvez l'inspiration pour votre événement avec notre bibliothèque d'images curatée. Créez des tableaux d'ambiance et partagez vos idées avec vos prestataires.",
    keyFeatures: [
      "Collections thématiques",
      "Enregistrement d'idées",
      "Partage avec prestataires",
      "Suggestions personnalisées"
    ],
    path: "/client/pinterbest",
    image: "/screenshots/client-pinterbest.png"
  },
  // Fonctionnalités Prestataire
  {
    title: "Fonctionnalités Prestataire",
    description: "Notre plateforme offre aux prestataires des outils puissants pour gérer leur activité, présenter leurs services et interagir avec leurs clients.",
    keyFeatures: [
      "Tableau de bord professionnel",
      "Gestion des rendez-vous",
      "Marketing ciblé",
      "Système de gamification"
    ],
    path: "/partner/dashboard",
    image: "/screenshots/partner-features.png"
  },
  {
    title: "Tableau de bord prestataire",
    description: "Centralisez la gestion de votre activité avec notre tableau de bord dédié aux prestataires. Suivez vos performances, gérez vos clients et optimisez votre planning.",
    keyFeatures: [
      "Aperçu des rendez-vous à venir",
      "Statistiques de performance",
      "Notifications en temps réel",
      "Gestion de disponibilité"
    ],
    path: "/partner/dashboard",
    image: "/screenshots/partner-dashboard.png"
  },
  {
    title: "Système de gamification",
    description: "Augmentez votre visibilité et votre crédibilité grâce à notre système de gamification. Gagnez des badges, débloquez des niveaux et améliorez votre classement.",
    keyFeatures: [
      "Badges de compétence",
      "Niveaux d'expertise",
      "Récompenses spéciales",
      "Visibilité prioritaire"
    ],
    path: "/partner/gamification",
    image: "/screenshots/partner-gamification.png"
  },
  {
    title: "Gestion des requêtes client",
    description: "Répondez efficacement aux demandes de vos clients avec notre système de gestion des requêtes. Restez organisé et ne manquez jamais une opportunité.",
    keyFeatures: [
      "Notifications instantanées",
      "Suivi des discussions",
      "Modèles de réponse",
      "Historique complet"
    ],
    path: "/partner/requests",
    image: "/screenshots/partner-requests.png"
  },
  {
    title: "Création de podcasts",
    description: "Partagez votre expertise et développez votre notoriété en créant des podcasts exclusifs. Présentez vos services et donnez des conseils précieux à vos futurs clients.",
    keyFeatures: [
      "Enregistrement simplifié",
      "Outils d'édition intégrés",
      "Diffusion automatique",
      "Statistiques d'audience"
    ],
    path: "/partner/podcasts",
    image: "/screenshots/partner-podcasts.png"
  },
  {
    title: "Talkshows et webinaires",
    description: "Organisez des émissions interactives pour présenter vos services, répondre aux questions et engager directement votre audience cible.",
    keyFeatures: [
      "Programmation de diffusion",
      "Chat en direct avec les spectateurs",
      "Replays automatiques",
      "Promotion intégrée"
    ],
    path: "/partner/talkshows",
    image: "/screenshots/partner-talkshows.png"
  },
  {
    title: "Système de recommandation",
    description: "Développez votre réseau professionnel grâce à notre système de recommandation entre prestataires. Créez des partenariats stratégiques et augmentez vos opportunités.",
    keyFeatures: [
      "Recommandations croisées",
      "Mise en relation facilitée",
      "Partage de clients",
      "Suivi des conversions"
    ],
    path: "/partner/recommendations",
    image: "/screenshots/partner-recommendations.png"
  },
  {
    title: "Communication et médias",
    description: "Découvrez nos contenus exclusifs : podcasts, talkshows et conseils d'experts pour vous accompagner dans l'organisation de votre événement.",
    keyFeatures: [
      "Podcasts spécialisés",
      "Talkshows avec experts",
      "Contenu exclusif",
      "Streaming en direct"
    ],
    path: "/client/talkshows",
    image: "/screenshots/client-communication.png"
  },
  {
    title: "Merci d'avoir suivi cette présentation",
    description: "Vous avez maintenant un aperçu des principales fonctionnalités de Best Events VIP pour les clients et les prestataires. N'hésitez pas à explorer chaque module pour découvrir toutes les possibilités de notre plateforme.",
    keyFeatures: [
      "Support client/prestataire 24/7",
      "Mise à jour régulière des fonctionnalités",
      "Service personnalisé",
      "Confidentialité et sécurité maximales"
    ],
    path: "/client/dashboard",
    image: "/screenshots/thank-you.png"
  }
];

export default PresentationSlides;
