export default class Vehicule {
    id?: string;
    marque: string;
    modele: string;
    immatriculation: string;
    etat: string;
    prixJournee: number;
    disponibilite: boolean;
    type: string;

    constructor(
        id?: string,
        marque: string = "",
        modele: string = "",
        immatriculation: string = "",
        etat: string = "",
        prixJournee: number = 0,
        disponibilite: boolean = false,
        type: string = ""
    ) {
        this.id = id;
        this.marque = marque;
        this.modele = modele;
        this.immatriculation = immatriculation;
        this.etat = etat;
        this.prixJournee = prixJournee;
        this.disponibilite = disponibilite;
        this.type = type;
    };
}