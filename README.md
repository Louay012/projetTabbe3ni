 Titre du projet : Application Web de Gestion de Budget

## Aperçu
Ce projet est une *application web de gestion de budget* développée avec *React* pour le frontend et *PHP* pour le backend. L'application aide les utilisateurs à gérer leurs finances, y compris le suivi des dépenses, la définition des budgets et la visualisation des rapports financiers.

## Fonctionnalités
- Authentification utilisateur (connexion et inscription)
- Suivi des dépenses
- Gestion des budgets (allocation de fonds aux catégories)
- Tableau de bord pour voir le résumé financier
- Interface mobile-friendly (via Tailwind CSS)
- Données stockées dans MySQL

## Technologies utilisées
- *Frontend* : React, Tailwind CSS
- *Backend* : PHP, MySQL (via PDO)
- *Autres* : XAMPP/MAMP pour le serveur PHP local (optionnel pour les tests)

## Prérequis
Avant de démarrer, vous aurez besoin de ces éléments :
- *Node.js* : (https://nodejs.org/)
- *npm ou yarn* (npm est livré avec Node.js)
- *PHP* : (https://www.php.net/)
- *MySQL* : Une base de données MySQL (via XAMPP/MAMP)

## Étapes d'installation des Prérequis
### 1. *Téléchargez et installez Node.js :*

1.  Suivez les instructions d'installation sur nodejs.org.
2.  Vérifiez l'installation de Node.js et npm :

        Après l'installation de Node.js, ouvrez un terminal et exécutez les commandes suivantes pour vérifier que Node.js et npm sont installés correctement :

            node -v
            npm -v

### 2. *Installez PHP et MySQL (via XAMPP ou MAMP) :*

1. Téléchargez XAMPP depuis Apache Friends ou MAMP depuis MAMP.info.
2. Suivez les instructions d'installation de ces outils pour configurer Apache (serveur web), PHP (serveur de backend), et MySQL (base de données).
3. Testez votre serveur PHP et MySQL :

* Une fois XAMPP ou MAMP installé, lancez les services Apache et MySQL via leur panneau de contrôle respectif. Vous pouvez tester si votre serveur PHP fonctionne en accédant à http://localhost dans votre navigateur.
* Accédez à phpMyAdmin en allant sur http://localhost/phpmyadmin pour gérer vos bases de données.
Téléchargez et configurez MySQL :

4. Si vous n'utilisez pas XAMPP ou MAMP, installez MySQL depuis MySQL.com.
Vous devrez peut-être créer une nouvelle base de données et importer un fichier .sql (fourni dans le projet) pour configurer la base de données avec les bonnes tables.

## Comment démarrer

### 1. *Frontend (Application React)*

#### Étapes :
1. *Clonez le repository* :
    
git clone https://github.com/Louay012/Tabbe3ni.git
cd Tabbe3ni
##### *REMARQUE*: Si vous ne dispose pas de Git, vous devez l'installer à partir https://git-scm.com/

2. *Installez les dépendances* :
    Utilisez npm pour installer les dépendances nécessaires :
    
npm install

3. *Exécutez l'application React* :
    Lancez le serveur de développement React :
            npm start
    
    L'application devrait maintenant être disponible sur http://localhost:3000. Ouvrez cette URL dans votre navigateur.

### 2. *Backend (API PHP)*

#### Étapes :
1. *Configurez le Backend PHP* :
    - Placez les fichiers PHP (qui se trouvent dans le dossier /API) dans le répertoire racine de votre serveur local (par exemple, htdocs pour XAMPP).
    - Assurez-vous que votre fichier php.ini est correctement configuré pour envoyer des emails (si nécessaire) et gérer les connexions à la base de données.

3. *Exécutez l'API PHP* :
    - Si vous utilisez XAMPP, démarrez les services Apache et MySQL depuis le panneau de contrôle XAMPP.


### 3. *Configuration de la base de données* :

1. Importez le fichier tabbe3ni_bd.sql pour configurer les tables nécessaires dans votre base de données MySQL. Ce fichier contient le schéma pour les tables users, categories, budgets, et transactions.



### 4. *Tester l'application* :
Une fois que le frontend et le backend sont configurés, vous pouvez interagir avec l'application. 
- Connectez-vous avec les identifiants fournis ou créez un nouveau compte.
- Utilisez l'application pour ajouter des dépenses, définir des budgets et gérer les catégories financières.



## Notes supplémentaires :
- Assurez-vous que le serveur est en cours d'exécution et accessible via http://localhost pour les deux parties de l'application (React et PHP).

## Dépannage :
- *L'application React ne démarre pas* : Assurez-vous d'avoir exécuté npm install dans le dossier du projet pour installer les dépendances.


