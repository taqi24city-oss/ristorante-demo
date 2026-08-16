# La Table du Boulanger — Site vitrine (démo)

Site statique une page pour le restaurant **La Table du Boulanger**
(Restaurant traditionnel à Bertrichamps).

- Aucune dépendance externe (pas de bibliothèque, pas de police distante,
  pas d'image téléchargée) : le site fonctionne même hors ligne.
- Données du restaurant **centralisées dans un seul fichier** : `config.js`.
- Contenu volontairement limité aux informations vérifiées fournies par le
  propriétaire (pas de plats, prix, récompenses, historique ou avis inventés).

## Fichiers

| Fichier       | Rôle                                                             |
| ------------- | ---------------------------------------------------------------- |
| `index.html`  | Structure de la page (HTML sémantique, contenu injecté en JS)     |
| `styles.css`  | Styles — mobile first, contrastes WCAG AA                         |
| `config.js`   | **Toutes les informations du restaurant** (à modifier ici)        |
| `app.js`      | Injection des données, menu mobile, animations légères            |

## Modifier les informations

Tout se fait dans **`config.js`** : nom, sous-titre, type de cuisine,
adresse, téléphone, horaires, note Google, lien Facebook. Les liens
« Appeler » (`tel:`) et « Voir sur Google Maps » sont générés
automatiquement à partir de ces valeurs — rien d'autre à toucher.

### Publier le menu

Tant que `menu.categories` est vide, la section affiche
« Menu du jour — informations à venir ». Pour publier la carte :

```js
menu: {
  categories: [
    {
      title: "Entrées",
      items: [
        { name: "Nom de l'entrée", description: "Courte description", price: "9,50 €" }
      ]
    }
  ]
}
```

`description` et `price` sont optionnels. Le menu s'affiche alors
automatiquement avec la mise en page prévue (catégories, pointillés, prix).

### Activer le lien Facebook

Renseigner l'URL dans `links.facebookUrl` — la mention « à venir » disparaît
d'elle-même.

### Remplacer la galerie

Les six vignettes sont des emplacements réservés. Pour ajouter une photo,
placez le fichier image à côté des fichiers du site puis remplacez, dans
`index.html`, le contenu du bloc `<div class="photo-thumb">…</div>` par :

```html
<img src="photos/la-facade.jpg" alt="La façade du restaurant" width="800" height="600">
```

et supprimez `role="img"` du `<figure>` correspondant. Gardez des images
d'environ 800×600 px (ratio 4:3) pour un rendu homogène.

## Tester & déployer

- **Tester** : double-cliquer sur `index.html` (aucun serveur requis).
- **Déployer** : copier les quatre fichiers sur n'importe quel hébergement
  statique (OVH, Netlify, GitHub Pages, o2switch…).

## Notes design & accessibilité

- HTML sémantique (`header`, `nav`, `main`, `section`, `footer`, `address`),
  un seul `h1`, liens d'évitement, navigation clavier complète.
- Contrastes texte/fond vérifiés WCAG AA (crème / encre / bordeaux / or).
- Cibles tactiles ≥ 44–48 px ; boutons « Appeler » et « Réserver » très visibles.
- Animations discrètes, désactivées si `prefers-reduced-motion` est actif.
- Pied de page : mention « Site de démonstration » tant que le menu et les
  photos ne sont pas publiés — à retirer le moment venu.
