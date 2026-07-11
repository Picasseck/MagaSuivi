# MagaSuivi

Application web full-stack de gestion de magasin. Elle permet de suivre les ventes, gérer le stock des produits et appliquer des promotions, pensée comme un outil interne pour un point de vente.

Le projet est composé d'un frontend en Vue 3 et d'un backend en Node.js avec une base de données PostgreSQL, pour couvrir l'ensemble d'une application moderne : interface, API REST et persistance des données.


## Fonctionnalités

- **Tableau de bord** — vue d'ensemble avec indicateurs clés, graphique des ventes de la semaine, alertes de stock et produits les plus vendus
- **Produits & stock** — catalogue complet avec recherche, filtre par catégorie, et gestion des produits (ajout, modification, suppression)
- **Ventes** — historique des transactions avec filtre par catégorie et récapitulatif dynamique
- **Soldes & promotions** — application d'une remise en temps réel sur les produits, avec aperçu du prix soldé

## Stack technique

**Frontend**
- Vue 3 (Composition API, `<script setup>`)
- TypeScript
- Vue Router
- Vitest (avec simulation d'API pour les tests)
- CSS classique (variables CSS, scoped styles)
- Vite

**Backend**
- Node.js avec Express
- API REST
- PostgreSQL
- Prisma (ORM)

## Installation

### Prérequis
- Node.js
- PostgreSQL installé et démarré

### 1. Cloner le projet

```bash
git clone https://github.com/Picasseck/MagaSuivi.git
cd MagaSuivi
```

### 2. Installer et lancer le frontend

```bash
npm install
npm run dev
```

Le frontend démarre sur `http://localhost:5173`.

### 3. Installer et configurer le backend

```bash
cd server
npm install
```

Créer un fichier `.env` dans le dossier `server` avec l'URL de connexion à la base :

```
DATABASE_URL="postgresql://postgres:VOTRE_MOT_DE_PASSE@localhost:5432/magasuivi?schema=public"
```

Créer la table et remplir la base avec les données de démonstration :

```bash
npx prisma migrate dev
npx tsx prisma/seed.ts
```

Lancer le serveur :

```bash
npx tsx src/index.ts
```

Le backend démarre sur `http://localhost:3000`.

## API REST

Le backend expose les routes suivantes pour la gestion des produits :

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/products` | Récupérer tous les produits |
| GET | `/api/products/:id` | Récupérer un produit |
| POST | `/api/products` | Créer un produit |
| PUT | `/api/products/:id` | Modifier un produit |
| DELETE | `/api/products/:id` | Supprimer un produit |

## Tests

```bash
npm run test:run
```

Les tests couvrent la logique métier : calcul du niveau de stock, formatage des prix, alertes, remises, et les opérations du store (ajout, modification, suppression).

## Structure du projet

```
magasuivi/
├── src/                Frontend Vue
│   ├── api/            Appels vers l'API backend
│   ├── components/     Composants réutilisables
│   ├── views/          Les pages
│   ├── router/         Configuration de Vue Router
│   ├── stores/         Store de gestion des produits
│   ├── types/          Types TypeScript
│   └── utils/          Fonctions utilitaires
│
└── server/             Backend Node.js
    ├── src/            Serveur Express et routes
    └── prisma/         Schéma de base de données et seed
```

## Choix techniques

Le frontend et le backend sont séparés en deux parties distinctes qui communiquent via une API REST. Les produits sont stockés dans PostgreSQL et manipulés côté serveur avec Prisma, ce qui garantit la persistance des données.

Le design est volontairement sobre — bleu-gris, typographie lisible — pour correspondre à un outil de gestion utilisé au quotidien, où la clarté des données prime sur l'esthétique.

## À propos

Projet réalisé dans le cadre de ma formation en développement web, pour m'exercer sur une application full-stack complète avec Vue, Node.js et PostgreSQL.