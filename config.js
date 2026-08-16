/* ============================================================================
   LA TABLE DU BOULANGER — CONFIGURATION DU SITE
   ----------------------------------------------------------------------------
   Toutes les informations affichées sur le site sont centralisées ici.
   Pour mettre le site à jour, modifiez UNIQUEMENT les valeurs ci-dessous :
   le reste du site (en-tête, hero, infos pratiques, pied de page…) se mettra
   à jour automatiquement.
   ============================================================================ */

const RESTAURANT_CONFIG = {

  /* --- Identité ------------------------------------------------------------ */
  name: "La Table du Boulanger",
  subtitle: "Restaurant traditionnel à Bertrichamps",
  type: "Restaurant français · Cuisine traditionnelle",

  /* --- Adresse --------------------------------------------------------------- */
  address: {
    street: "51 Rue du Général Leclerc",
    postalCode: "54120",
    city: "Bertrichamps",
    country: "France",
    get full() {
      return this.street + ", " + this.postalCode + " " + this.city + ", " + this.country;
    }
  },

  /* --- Téléphone --------------------------------------------------------------
     display       : numéro tel qu'il est affiché aux visiteurs
     international : format international sans espaces (utilisé pour les
                     liens « Appeler » — tel: )                                   */
  phone: {
    display: "+33 3 83 75 42 64",
    international: "+33383754264"
  },

  /* --- Horaires ---------------------------------------------------------------- */
  hours: [
    { days: "Lundi – Samedi", time: "08h00 – 14h00", closed: false },
    { days: "Dimanche",       time: "Fermé",         closed: true  }
  ],

  /* --- Note Google --------------------------------------------------------------- */
  rating: {
    score: 4.5,     /* utilisé pour dessiner les étoiles */
    display: "4,5",
    max: 5,
    reviewsLabel: "environ 321 avis Google"
  },

  /* --- Liens externes --------------------------------------------------------------- */
  links: {
    /* Laisser vide ("") tant que la page n'existe pas : le lien affichera
       « à venir » dans le pied de page et ne pointera nulle part.
       Exemple : "https://www.facebook.com/LaTableDuBoulanger" */
    facebookUrl: ""
  },

  /* --- Menu ------------------------------------------------------------------------ */
  /* Tant que « categories » est vide, la section Menu affiche :
     « Menu du jour — informations à venir ».
     Pour publier la carte, remplacez « categories: [] » par vos catégories,
     par exemple :

     categories: [
       {
         title: "Entrées",
         items: [
           { name: "Nom de l'entrée", description: "Courte description du plat", price: "9,50 €" }
         ]
       },
       {
         title: "Plats",
         items: [
           { name: "Nom du plat", description: "Accompagnement, sauce…", price: "16 €" }
         ]
       }
     ]
     Les champs « description » et « price » sont optionnels.                       */
  menu: {
    categories: []
  }
};
