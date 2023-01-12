export default class Vehicule {
    id: number;
    marque: string;
    modele: string;
    immatriculation: string;
    etat: string;
    prix: number;
    disponibilite: string;
    type: string;

    constructor(
        id: number,
        marque: string = "",
        modele: string = "",
        immatriculation: string = "",
        etat: string = "",
        prix: number = 0,
        disponibilite: string = "",
        type: string = ""
    ) {
        this.id = id;
        this.marque = marque;
        this.modele = modele;
        this.immatriculation = immatriculation;
        this.etat = etat;
        this.prix = prix;
        this.disponibilite = disponibilite;
        this.type = type;
    };
}