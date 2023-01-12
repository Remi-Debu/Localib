import Vehicule from './vehicule';
import Locataire from './locataire';

export default class Location {
    id: number;
    vehicule: Vehicule;
    locataire: Locataire;
    dateDebut: string;
    dateFin: string;
    cout: number

    constructor(
        id: number,
        vehicule: Vehicule,
        locataire: Locataire,
        dateDebut: string,
        dateFin: string,
        cout: number
    ) {
        this.id = id;
        this.vehicule = vehicule;
        this.locataire = locataire;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.cout = cout;
    };
}
