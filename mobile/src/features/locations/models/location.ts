import Vehicule from "../../vehicules/models/vehicule";
import Locataire from "../../locataires/models/locataire";

export default class Location {
    id: string;
    dateDebut: string;
    dateFin: string;
    locataire: Locataire;
    vehicule: Vehicule;
    prixTotal: number

    constructor(
        id: string,
        locataire: Locataire,
        vehicule: Vehicule,
        dateDebut: string,
        dateFin: string,
        prixTotal: number
    ) {
        this.id = id;
        this.vehicule = vehicule;
        this.locataire = locataire;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.prixTotal = prixTotal;
    };
}