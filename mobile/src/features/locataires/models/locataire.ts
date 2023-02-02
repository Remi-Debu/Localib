export default class Locataire {
    id?: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;

    constructor(
        id?: string,
        nom: string = "",
        prenom: string = "",
        email: string = "",
        telephone: string = ""
    ) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.telephone = telephone;
    }
}