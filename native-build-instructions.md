
# Instructions pour compiler l'application native

Ce document vous guidera à travers le processus de compilation de l'application Best Events VIP pour iOS et Android.

## Prérequis

### Pour iOS
- Un Mac avec macOS Monterey (12.0) ou plus récent
- Xcode 13 ou plus récent
- Un compte développeur Apple

### Pour Android
- Android Studio Arctic Fox (2020.3.1) ou plus récent
- JDK 11 ou plus récent
- Un compte développeur Google Play

## Étapes générales

1. Clonez le projet depuis GitHub
2. Installez les dépendances: `npm install`
3. Compilez le projet: `npm run build`
4. Synchronisez les ressources web avec les projets natifs: `npx cap sync`

## Compilation iOS

1. Ajoutez la plateforme iOS si ce n'est pas déjà fait: `npx cap add ios`
2. Ouvrez le projet dans Xcode: `npx cap open ios`
3. Dans Xcode, configurez les paramètres de signature et de provisioning profile:
   - Sélectionnez le projet principal dans le navigateur de projet
   - Allez dans l'onglet "Signing & Capabilities"
   - Sélectionnez votre équipe de développement
   - Réglez le Bundle ID sur "app.lovable.ca616c0b2d17467885719db03e397c9e"
4. Ajustez les paramètres d'Info.plist selon les besoins
5. Compilez et déployez avec Xcode

## Compilation Android

1. Ajoutez la plateforme Android si ce n'est pas déjà fait: `npx cap add android`
2. Ouvrez le projet dans Android Studio: `npx cap open android`
3. Dans Android Studio:
   - Configurez le fichier `build.gradle` avec votre keystore pour la signature
   - Vérifiez que l'application ID est bien "app.lovable.ca616c0b2d17467885719db03e397c9e"
4. Ajustez les paramètres AndroidManifest.xml selon les besoins
5. Compilez et déployez avec Android Studio

## Génération des ressources graphiques

Utilisez le plugin cordova-res pour générer automatiquement les icônes et splash screens:

```bash
npm install -g cordova-res
cordova-res ios --skip-config --copy
cordova-res android --skip-config --copy
```

## Publication sur les stores

### App Store (iOS)
1. Utilisez Xcode pour créer une archive de votre application
2. Utilisez App Store Connect pour soumettre l'application
3. Complétez les métadonnées avec les informations du fichier `app-store-metadata.json`

### Google Play (Android)
1. Créez un bundle Android (.aab) avec Android Studio
2. Utilisez la Console Google Play pour soumettre l'application
3. Complétez les métadonnées avec les informations du fichier `app-store-metadata.json`

## Optimisations supplémentaires recommandées

- Mettez en place Firebase Analytics pour suivre les performances de l'application
- Configurez Firebase Crashlytics pour surveiller les problèmes
- Implémentez des tests automatisés pour les fonctionnalités critiques

## Maintenance et mises à jour

Pour les futures mises à jour:
1. Mettez à jour le code source
2. Exécutez `npm run build` suivi de `npx cap sync`
3. Ouvrez les projets natifs et compilez à nouveau
4. Soumettez les mises à jour aux app stores
