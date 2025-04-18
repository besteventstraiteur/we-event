
# Architecture de We Event

## Structure Modulaire

Notre application est construite avec une architecture modulaire qui permet un chargement dynamique et optimisé des composants.

### Modules Principaux

- **Public Routes**: Pages accessibles sans authentification
- **Client Routes**: Fonctionnalités pour les clients
- **Partner Routes**: Fonctionnalités pour les partenaires
- **Admin Routes**: Fonctionnalités administratives

### Stratégie de Chargement

Nous utilisons `React.lazy()` et `Suspense` pour charger les modules et composants à la demande, ce qui permet de :

- Réduire la taille du bundle initial
- Améliorer les performances de chargement
- Optimiser l'expérience utilisateur

### Exemple de Chargement Dynamique

```typescript
const PublicRoutes = React.lazy(() => import("@/routes/PublicRoutes"));

<Suspense fallback={<LoadingFallback />}>
  <Routes>
    <Route path="/*" element={<PublicRoutes />} />
  </Routes>
</Suspense>
```

### Principes Clés

- Séparation claire des domaines fonctionnels
- Chargement paresseux des composants
- Utilisation de composants de chargement pendant les imports
- Isolation des responsabilités par module

