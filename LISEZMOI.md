# Fiche disconnecteur BA – application mobile hors ligne

Application web installable (PWA) pour remplir la fiche CSTB « Disconnecteur de type BA » (Modif 24)
sur téléphone, sans connexion, et exporter le PDF rempli.

## Mise en ligne (une seule fois)
L'application doit être servie en **HTTPS** pour fonctionner hors ligne. Il suffit de déposer
le contenu de ce dossier sur n'importe quel hébergement statique, par exemple :
- Netlify Drop (app.netlify.com/drop) : glisser-déposer le dossier ;
- GitHub Pages, OVH, o2switch, ou le serveur web de l'entreprise.

### Déploiement automatique via GitHub Pages
Un workflow GitHub Actions (`.github/workflows/deploy.yml`) publie automatiquement le site
à chaque `push` sur `main`. Il exclut les fichiers réservés au développement
(`package.json`, `scripts/`, `tests/`…) listés dans `.github/pages-exclude.txt`.

À faire une seule fois, dans les réglages du dépôt GitHub :
1. **Settings > Pages > Build and deployment > Source** : choisir **GitHub Actions**
   (pas « Deploy from a branch »).
2. Pousser un commit sur `main` (ou lancer le workflow manuellement depuis l'onglet
   **Actions > Déploiement GitHub Pages > Run workflow**).
3. L'adresse du site apparaît dans **Settings > Pages** une fois le déploiement terminé
   (généralement `https://<utilisateur>.github.io/<dépôt>/`).

Ensuite, chaque `push` sur `main` republie automatiquement le site à jour.

**Erreur « Get Pages site failed... Not Found » au premier déploiement ?**
Cela signifie que Pages n'a encore jamais été activé sur ce dépôt.
Le workflow essaie de l'activer lui-même (`enablement: true`), mais si l'erreur persiste,
faites l'étape 1 manuellement dans **Settings > Pages** puis relancez le workflow
(**Actions > Déploiement GitHub Pages > Run workflow**, ou repoussez un commit).

## Installation sur les téléphones
1. Ouvrir l'adresse une première fois avec une connexion (tout est alors mis en cache).
2. iPhone : Safari > Partager > « Sur l'écran d'accueil ». Android : Chrome > menu > « Installer l'application ».
3. Ensuite l'application s'ouvre et fonctionne sans réseau.

## Fichiers
- `index.html` : interface de saisie, sauvegarde automatique sur le téléphone, export.
- `fill.js` : coordonnées de chaque champ sur le PDF et remplissage (pdf-lib).
- `BA.pdf` : modèle vierge. `sw.js` : cache hors ligne. `manifest.webmanifest`, `icons/`, `fonts/`.

## Mises à jour
Après toute modification d'un fichier, changer `VERSION` en haut de `sw.js`
pour que les téléphones récupèrent la nouvelle version à la prochaine connexion.

## Données
Les fiches restent uniquement dans le téléphone (stockage local du navigateur).
Désinstaller l'application ou vider les données du navigateur les efface :
pensez à exporter les PDF.
