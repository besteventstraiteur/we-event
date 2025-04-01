
# Mise à jour des routes pour les Talkshows

Pour activer les fonctionnalités de talkshows, il faut ajouter les routes suivantes à `src/App.tsx` :

```tsx
// Dans le composant App, à l'intérieur de Routes, ajoutez ces nouvelles routes pour les talkshows

{/* Nouvelles routes pour les talkshows côté client */}
<Route path="/client/talkshows" element={<ClientTalkshows />} />

{/* Nouvelles routes pour les talkshows côté partenaire */}
<Route path="/partner/talkshows" element={<PartnerTalkshows />} />

{/* Nouvelles routes pour les talkshows côté admin */}
<Route path="/admin/talkshows" element={<AdminTalkshows />} />
```

N'oubliez pas d'importer les composants correspondants en haut du fichier :

```tsx
import ClientTalkshows from "./pages/client/ClientTalkshows";
import PartnerTalkshows from "./pages/partner/PartnerTalkshows";
import AdminTalkshows from "./pages/admin/AdminTalkshows";
```
