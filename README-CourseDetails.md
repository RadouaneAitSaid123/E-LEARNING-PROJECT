# Documentation - Implémentation de la Page de Détails de Cours Dynamique

## Aperçu

Cette documentation explique comment la page de détails de cours a été rendue dynamique en connectant le frontend React avec le backend Spring Boot.

## Modifications Apportées

### 1. Service API

Un nouveau service API a été créé pour gérer les communications avec le backend :

- **Fichier** : `src/services/api.js`
- **Fonctionnalités** :
  - Configuration d'Axios avec intercepteur pour les tokens d'authentification
  - Services pour les cours (getAllCourses, getCourseById, etc.)
  - Services pour les inscriptions
  - Services pour l'authentification

### 2. Composant CourseDetails

Le composant `CourseDetails.jsx` a été modifié pour :

- Utiliser `useEffect` pour charger les données du cours depuis l'API au chargement du composant
- Gérer les états de chargement et d'erreur
- Afficher dynamiquement les informations du cours récupérées depuis le backend
- Convertir les sections du cours en modules affichables
- Gérer la redirection vers la page de connexion si un utilisateur non authentifié tente de s'inscrire

## Comment Ça Marche

1. Lorsque la page de détails du cours est chargée, le composant récupère l'ID du cours depuis les paramètres d'URL ou l'état de navigation
2. Une requête API est envoyée au backend pour récupérer les détails du cours avec cet ID
3. Pendant le chargement, un indicateur de chargement est affiché
4. Une fois les données récupérées, elles sont affichées dans l'interface utilisateur
5. Si une erreur se produit, un message d'erreur est affiché

## Endpoints API Utilisés

- `GET /api/courses/available/{id}` - Récupère les détails d'un cours spécifique

## Dépendances

- Axios pour les requêtes HTTP
- React Router pour la navigation et la récupération des paramètres d'URL
- Context API pour la gestion de l'authentification

## Tests

Pour tester cette fonctionnalité :

1. Assurez-vous que le backend Spring Boot est en cours d'exécution
2. Démarrez l'application frontend avec `npm run dev`
3. Accédez à la page de détails d'un cours via l'URL `/course-details/{id}` où `{id}` est l'ID d'un cours existant

## Améliorations Futures

- Ajouter des fonctionnalités de notation et d'avis
- Améliorer l'affichage des sections et des modules
- Implémenter un système de prévisualisation pour les cours
- Ajouter des statistiques plus détaillées sur les cours