# Back-end projet Groupomania 
***
Ce projet est une application intranet de Groupomania qui permet aux employés de communiquer plus facilement entre eux.  

**Fonctionnalités**
Les utilisateurs doivent s'identifier sur la page de connexion pour accéder à l'application.  
Ce réseau social d'entreprise permet aux utilisateurs de créer des publications et de les partager sur le réseau. Ils peuvent modifier ou supprimer leurs posts, et liker ou disliker les posts des autres utilisateurs.  
Un rôle d'administrateur permet de vérifier le contenu et d'agir sur les commentaires en cas de débordement.
***

## Installation et lancement du projet:  

*Pré-requis: Utiliser et avoir installer node.js*  

**1) Cloner le repository suivant dans un dossier de votre PC:**  
https://github.com/CarolineOwen/P7.git  
  -  
  Renommer le fichier ".env.exemple" en ".env" (le fichier est à la racine du projet) et remplacer les "xxxx" par votre identifiant et mot de passe MongoDB, ce qui assurera le lien avec la base de données.
  

**2) Exécuter "npm install" à la racine du projet (dans le terminal commande: "cd P7")**  

**3) Lancer le server en éxécutant "node server" ou "nodemon server"**  
le serveur doit tourner sur le port 3000

Pour cela il faut remplacer les variables d'environnement

**4) Contrôle du bon fonctionnement de serveur: le terminal de commandes doit afficher:**  
*Listening on port 3000*  
*Connexion à MongoDB réussie !*

**5) Installez et lancer le front-end**
Le front-end est disponible sur le repo suivant:  
https://github.com/CarolineOwen/Groupo_front.git  
Penser à utiliser le port 3001 pour le front

*Note: la base de donnée utilisée pour ce projet est MongoDB*
