import Vehicule from "../../vehicules/models/vehicule";
import Locataire from "../../locataires/models/locataire";

export default class Location {
    id?: string;
    dateDebut: string;
    dateFin: string;
    locataire: Locataire;
    vehicule: Vehicule;
    prixTotal?: number

    constructor(
        locataire: Locataire,
        vehicule: Vehicule,
        dateDebut: string,
        dateFin: string,
    ) {
        this.vehicule = vehicule;
        this.locataire = locataire;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
    };
}