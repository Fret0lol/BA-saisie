# Charte graphique Dyskia

Charte tirée du logo Dyskia et appliquée à l'application de saisie des fiches BA.
Les valeurs font foi dans les variables CSS de `index.html` (bloc `:root`).

## Logo

- **Symbole** : les trois boucles entrelacées (marine, bleu, lagon), sans le mot « DYSKIA ».
  C'est lui qui sert d'icône d'application et de logo dans la barre du haut.
- **Logo complet** (symbole + « DYSKIA ») : à réserver aux grands formats (documents, écrans d'accueil).
- Toujours sur **fond blanc** : sur fond foncé, le symbole est posé sur une pastille blanche aux coins arrondis.
- Marge autour du symbole : au moins 10 % de sa largeur. Ne pas déformer, recolorer ni ajouter d'effet.

Fichiers : `icons/logo.png` (barre du haut), `icons/icon-192.png`, `icons/icon-512.png`, `icons/apple-touch-icon.png`.

## Couleurs

### Couleurs de marque (issues du logo)

| Nom | Valeur | Rôle |
|---|---|---|
| Marine | `#0B3A60` | Couleur d'identité : barre du haut, couleur du thème système, texte sur lagon |
| Bleu | `#0B6AAE` | Action principale : boutons principaux, liens, élément actif, cases cochées |
| Lagon | `#66C2D4` | Accent : repères de section (hexagones), contour de focus clavier, badge « Hors ligne » |

### Couleurs d'interface — thème clair

| Rôle | Valeur |
|---|---|
| Fond de page | `#EEF3F7` |
| Cartes, barres | `#FFFFFF` |
| Champs de saisie | `#F4F7FA` |
| Texte | `#0E2A42` |
| Texte secondaire | `#546B7F` |
| Traits, bordures | `#CCD9E4` |
| Texte secondaire sur marine | `#B7CCDD` |

### Couleurs d'interface — thème sombre

| Rôle | Valeur |
|---|---|
| Fond de page | `#08131F` |
| Cartes, barres (y compris barre du haut) | `#0F2134` |
| Champs de saisie | `#15293F` |
| Texte | `#E4EDF5` |
| Texte secondaire | `#93A9BC` |
| Traits, bordures | `#23405C` |
| Action principale | `#5AB0E6` (texte du bouton `#04172A`) |

### Couleurs d'état (inchangées, indépendantes de la marque)

| Rôle | Clair | Sombre |
|---|---|---|
| Correct / OK | `#1E7A46` sur `#E3F2E8` | `#5CC98A` sur `#173526` |
| Erreur / à réparer / suppression | `#B3261E` sur `#FBE7E5` | `#F2877E` sur `#3A1D1B` |
| Encre de signature | `#12338C` | `#12338C` (sur fond blanc) |

Le vert et le rouge gardent leur sens métier : ne jamais les remplacer par les couleurs de marque.

### Étiquettes de type de fiche (liste « Mes fiches »)

| Type | Clair (texte sur fond) | Sombre (texte sur fond) |
|---|---|---|
| Mise en service | `#0B4A5E` sur `#DDF2F6` (lagon) | `#8FD8E6` sur `#12384A` |
| Maintenance | `#0B4F85` sur `#DCEAF6` (bleu) | `#9CCBF0` sur `#143454` |
| Dépannage | `#8A3B0B` sur `#FBE9DA` (orangé : intervention) | `#F4B98A` sur `#3D2615` |
| Type non choisi | `#546B7F` sur `#E6ECF1` | `#93A9BC` sur `#1B3047` |

### Contrastes vérifiés (WCAG, minimum 4,5:1)

| Association | Rapport |
|---|---|
| Blanc sur bleu (bouton principal) | 5,7:1 |
| Texte sur blanc | 14,7:1 |
| Texte secondaire sur blanc / sur fond | 5,5:1 / 5,0:1 |
| Blanc sur marine (barre du haut) | 11,7:1 |
| Texte secondaire sur marine | 7,1:1 |
| Marine sur lagon (repères) | 5,7:1 |
| Sombre : bouton principal | 7,6:1 |
| Sombre : texte / secondaire sur carte | 13,8:1 / 6,7:1 |

Le lagon ne s'emploie jamais comme couleur de texte sur fond blanc (contraste insuffisant).

## Typographie

- **Atkinson Hyperlegible** (400 et 700), embarquée dans `fonts/`, utilisable hors ligne.
  Choisie pour la lisibilité sur chantier (chiffres et lettres sans ambiguïté), elle s'accorde aux capitales sans empattement du logo.
- Titres de page : 17 px gras. Titres de carte : 20 px gras. Texte courant : 16 px. Champs de saisie : 17 px. Texte secondaire : 13–14 px.

## Formes et composants

- **Arrondis** : 10 px pour les cartes, 8 px pour les champs et boutons, pilule pour les étapes (rappel des boucles du logo).
- **Bouton principal** : fond bleu, texte blanc, un seul par écran.
- **Boutons secondaires** : contour bleu, fond blanc.
- **Zone tactile** : 48 px minimum (52 px pour la barre d'action du bas).
- **Repères de section** : hexagone lagon, numéro en marine.
- **Barre du haut** : marine en thème clair, logo sur pastille blanche, titre en blanc.
