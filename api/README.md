# ECF Back-End Localib

## Description
Application de location de véhicule.


## Prérequis
- Java 11+
- Docker Desktop
- Postman
- Spring
-  IDE (IntelliJ, Eclipse)

## Installation

### Base de données :

Lancer la commande :
```
docker-compose up -d
```

### Lancement de l'application sans IDE :
Lancer la commande :
```
./mvn spring-boot:run
```

### Lancement de l'application avec IntelliJ :
Lancer la classe : `LocalibApplication`

### Chemins des requêtes

LOCATAIRES :
```
- find All : /locataires (GET)
- find Id : /locataires/{id} (GET)
- find Nom : /locataires/nom/{nom} (GET)
- find Prenom : /locataires/prenom/{prenom} (GET)
- find Email : /locataires/email/{email} (GET)
- find Telephone : /locataires/telephone/{telephone} (GET)

- save : /locataires (POST)
- update : /locataires/{id} (PUT)
- delete Id : /locataires/{id} (DELETE)
```

VEHICULES :
```
- find All : /vehicules (GET)
- find Id : /vehicules/{id} (GET)
- find Marque : /vehicules/marque/{marque} (GET)
- find Modele : /vehicules/modele/{modele} (GET)
- find Immatriculation : /vehicules/immatriculation/{immatriculation} (GET)
- find Etat : /vehicules/etat/{etat} (GET)
- find Disponibilite : /vehicules/disponibilite/{disponibilite} (GET)
- find Type : /vehicules/type/{type} (GET)
- find All Vehicule Prix Superieur : /vehicules/prixSuperieur (GET)
- find All Vehicule Prix Inferieur : /vehicules/prixInferieur (GET)

- save : /vehicules (POST)
- delete Id : /vehicules/{id} (DELETE)
- update : /vehicules/{id} (PUT)
```

LOCATIONS :
```
- find All : /locations (GET)
- find Id : /locations/{id} (GET)
- save : /locations (POST)
- delete Id : /locations/{id} (DELETE)
```