
# Guide de développement et déploiement natif

## Introduction

Ce document fournit des détails sur le développement natif de l'application Best Events VIP, qui utilise Capacitor pour créer des applications natives iOS et Android à partir du code web React.

## Structure du projet

```
best-events-vip-platform/
├── src/                     # Code source React
├── public/                  # Ressources statiques 
├── ios/                     # Code natif iOS (généré via Capacitor)
├── android/                 # Code natif Android (généré via Capacitor)
├── capacitor.config.ts      # Configuration Capacitor
└── app-store-metadata.json  # Métadonnées pour les app stores
```

## Hooks et composants mobiles importants

- `src/hooks/use-mobile.tsx` - Hooks pour la détection d'appareils mobiles
- `src/hooks/useBiometricAuth.tsx` - Authentification biométrique
- `src/components/mobile/` - Composants optimisés pour les appareils mobiles

## Capacitor Plugins recommandés

Nous recommandons l'ajout des plugins suivants pour une expérience mobile complète:

```bash
# Fonctionnalités essentielles
npm install @capacitor/device
npm install @capacitor/app
npm install @capacitor/splash-screen
npm install @capacitor/haptics
npm install @capacitor/keyboard
npm install @capacitor/status-bar

# Stockage et données
npm install @capacitor/storage
npm install @capacitor/preferences

# Authentification et sécurité 
npm install @capacitor/biometric

# Notifications et engagement
npm install @capacitor/push-notifications
npm install @capacitor/local-notifications

# Intégrations matérielles
npm install @capacitor/camera
npm install @capacitor/geolocation
npm install @capacitor/share
```

Pour chaque plugin installé, exécutez `npx cap sync` pour synchroniser le code natif.

## Directives de développement natif

### Navigation adaptative

Utilisez la navigation adaptative qui fonctionne différemment selon la plateforme:

- Sur iOS, privilégiez les transitions par glissement
- Sur Android, respectez les modèles de navigation Material Design

### Authentification biométrique

Nous utilisons `useBiometricAuth.tsx` pour implémenter l'authentification par empreinte digitale ou Face ID.

### Stratégie hors ligne

L'application prend en charge le mode hors ligne grâce à:
- La détection de l'état de la connexion
- Le stockage local des données
- Des indicateurs visuels clairs

### Performance mobile

Pour optimiser les performances:
- Utilisez `useCallback` et `useMemo` pour les fonctions et calculs coûteux
- Utilisez des images webp et implémentez le chargement différé
- Limitez les animations complexes
- Testez sur des appareils bas de gamme pour garantir la fluidité

## Personnalisation spécifique à la plateforme

### iOS

Pour personnaliser l'application iOS, modifiez:
- `ios/App/App/Info.plist` - Configuration générale
- `ios/App/App/AppDelegate.swift` - Point d'entrée de l'application

### Android

Pour personnaliser l'application Android, modifiez:
- `android/app/src/main/AndroidManifest.xml` - Configuration générale
- `android/app/src/main/java/.../MainActivity.java` - Point d'entrée de l'application
- `android/app/src/main/res/values/styles.xml` - Thèmes et styles

## Tests natifs

Il est recommandé de tester sur des appareils physiques et des émulateurs:

- iOS: iPhones de différentes tailles (SE, 11, 13 Pro Max)
- Android: Appareils bas, milieu et haut de gamme avec différentes tailles d'écran

## Processus de publication

1. Incrémentez les numéros de version dans:
   - `capacitor.config.ts`
   - `public/manifest.json`
   
2. Pour iOS:
   - Mettez à jour les certificats et profils de provisionnement
   - Créez une archive via Xcode
   - Soumettez via App Store Connect

3. Pour Android:
   - Vérifiez la configuration de signature dans `android/app/build.gradle`
   - Créez un bundle Android (.aab) via Android Studio
   - Soumettez via Google Play Console

## Considérations de sécurité

- Stockez les informations sensibles dans le Keychain (iOS) ou KeyStore (Android)
- Implémentez l'authentification biométrique pour les données sensibles
- Utilisez HTTPS pour toutes les communications réseau
- Désactivez les captures d'écran pour les écrans contenant des données sensibles

## Ressources et liens

- [Documentation Capacitor](https://capacitorjs.com/docs)
- [Guide de publication App Store](https://developer.apple.com/app-store/submitting/)
- [Guide de publication Google Play](https://developer.android.com/distribute/best-practices/launch)
