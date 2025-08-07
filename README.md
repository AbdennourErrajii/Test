# Gestion de Produits - Test Technique Full-Stack

Ceci est une application web full-stack qui permet de gérer un catalogue de produits. L'application est composée d'un back-end en **Java/Spring Boot** et d'un front-end en **Angular**.

## Objectif

L'application permet de :
*   Créer, afficher, modifier et supprimer des produits.
*   Adapter dynamiquement les champs obligatoires du formulaire en fonction de la catégorie du produit choisie.
*   Associer un fichier (image, document...) à chaque produit de manière optionnelle.

---

## Stack Technique

**Back-end :**
*   Java 17
*   Spring Boot 3.x
*   Spring Data JPA / Hibernate
*   Maven
*   MySQL

**Front-end :**
*   Angular 17+
*   TypeScript
*   Bootstrap 5
*   Bootstrap Icons

---

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants sur votre machine :

*   **Java JDK 17** ou une version supérieure.
*   **Maven 3.8+** (souvent inclus dans les IDE comme IntelliJ).
*   **Node.js 18.x** ou une version LTS plus récente.
*   **Angular CLI** : `npm install -g @angular/cli`
*   Un serveur de base de données **MySQL** en cours d'exécution.
*   Un éditeur de code comme **Visual Studio Code** ou **IntelliJ IDEA**.

---

## Installation et Lancement

Suivez ces étapes pour lancer l'application en local.

### 1. Cloner le dépôt

```bash
git clone [URL_DE_VOTRE_REPO]
cd Test_VPS
```

### 2. Lancer le Back-end (Spring Boot)

1.  **Configuration de la base de données :**
    *   Ouvrez le projet `store-back_vps` dans votre IDE (ex: IntelliJ).
    *   Allez dans le fichier `src/main/resources/application.properties`.
    *   Assurez-vous que la base de données MySQL `store_db` existe ou modifiez la configuration pour qu'elle corresponde à votre environnement local (URL, nom d'utilisateur, mot de passe).
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/store_db?createDatabaseIfNotExist=true
    spring.datasource.username=root
    spring.datasource.password=VOTRE_MOT_DE_PASSE_MYSQL
    ```

2.  **Lancer l'application :**
    *   Vous pouvez lancer l'application directement depuis votre IDE en exécutant la classe `StoreBackVpsApplication`.
    *   Ou via le terminal, en vous plaçant dans le dossier `store-back_vps` :
    ```bash
    ./mvnw spring-boot:run
    ```

> ✅ Le back-end devrait maintenant tourner sur **`http://localhost:8090`**.

### 3. Lancer le Front-end (Angular)

1.  **Ouvrez un NOUVEAU terminal.**
2.  Placez-vous dans le dossier du projet front-end :
    ```bash
    cd store-front-vps
    ```

3.  **Installez les dépendances** (cette étape n'est à faire qu'une seule fois) :
    ```bash
    npm install
    ```

4.  **Lancez le serveur de développement :**
    ```bash
    ng serve
    ```

> ✅ L'application front-end est maintenant accessible sur **`http://localhost:4200`**. Le navigateur devrait s'ouvrir automatiquement.

---

## Structure du Dépôt

Ce dépôt est un "monorepo" contenant deux projets distincts :

*   **`/store-back_vps`** : Contient toute la logique de l'API REST avec Spring Boot.
*   **`/store-front-vps`** : Contient l'interface utilisateur développée avec Angular.

Chaque dossier a ses propres dépendances et doit être exécuté dans son propre terminal.
