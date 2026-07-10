# MagaSuivi

Tableau de bord de gestion de magasin. Une application web qui permet de suivre les ventes, gérer le stock des produits et appliquer des promotions, pensée comme un outil interne pour un point de vente.

J'ai construit ce projet avec Vue 3 et TypeScript pour m'entraîner sur un cas concret proche de la grande distribution : suivi d'activité, gestion de catalogue et alertes de stock.

## Fonctionnalités

- **Tableau de bord** — vue d'ensemble avec indicateurs clés, graphique des ventes de la semaine, alertes de stock et produits les plus vendus
- **Produits & stock** — catalogue complet avec recherche, filtre par catégorie, et gestion des produits (ajout, modification, suppression)
- **Ventes** — historique des transactions avec filtre par catégorie et récapitulatif dynamique
- **Soldes & promotions** — application d'une remise en temps réel sur les produits, avec aperçu du prix soldé

## Stack technique

- Vue 3 (Composition API, `<script setup>`)
- TypeScript
- Vue Router
- Vitest pour les tests
- CSS classique (variables CSS, scoped styles)
- Vite

## Installation

```bash
git clone https://github.com/Picasseck/MagaSuivi.git
cd MagaSuivi
npm install
npm run dev
```

L'application démarre sur `http://localhost:5173`.

## Tests

```bash
npm run test:run
```

Les tests couvrent la logique métier : calcul du niveau de stock, formatage des prix, alertes, remises, et les opérations du store (ajout, modification, suppression).

## Structure du projet

```
src/
├── components/     Composants réutilisables (cartes, tableau, formulaire, filtres...)
├── views/          Les pages (Dashboard, Products, Sales, Promotions)
├── router/         Configuration de Vue Router
├── stores/         Store réactif pour la gestion des produits
├── data/           Données de démonstration (produits, ventes)
├── types/          Types TypeScript (Product, Sale, StockLevel)
├── utils/          Fonctions utilitaires (stock, prix, dates)
├── assets/styles/  Styles globaux et variables CSS
├── App.vue         Composant racine et mise en page
└── main.ts         Point d'entrée
```

## Choix techniques

Les données sont pour l'instant en local (fichiers TypeScript) plutôt que dans une base de données, afin de me concentrer sur le frontend. La logique d'accès aux produits passe par un store centralisé, ce qui permettra de brancher facilement une vraie API plus tard.

Le design est volontairement sobre — bleu-gris, typographie lisible — pour correspondre à un outil de gestion utilisé au quotidien, où la clarté des données prime sur l'esthétique.

## À propos

Projet réalisé dans le cadre de ma formation en développement web, pour m'exercer sur Vue 3 et TypeScript à travers un cas d'usage métier concret.