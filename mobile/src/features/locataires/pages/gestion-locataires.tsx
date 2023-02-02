import React, { useState, useEffect } from 'react'
import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Locataire from '../models/locataire';
import LocataireService from '../services/locataire-service';
import LocataireCard from '../components/locataire-card';
import LocataireModal from '../components/locataire-modal';

const GestionLocataires: React.FC = () => {
    const [locataires, setLocataires] = useState<Locataire[]>([]);
    const [locataire, setLocataire] = useState<Locataire>(new Locataire());
    const [showModal, setShowModal] = useState(false);
    const [isEditForm, setIsEditForm] = useState<boolean>(false);

    const [nom, setNom] = useState<string>("");
    const [prenom, setPrenom] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [telephone, setTelephone] = useState<string>("");

    useEffect(() => {
        LocataireService.getLocataires().then(locataires => setLocataires(locataires));
    }, []);

    /**
     * Ajoute un locataire
     */
    const addLocataire = (event: any, locataire: Locataire) => {
        event.preventDefault();
        setLocataires([...locataires, locataire]);
        LocataireService.addLocataire(locataire);
    }

    /**
     * Modifie un locataire
     */
    const updateLocataire = (event: any, locataire: Locataire) => {
        event.preventDefault();
        LocataireService.updateLocataire(locataire);
    }

    /**
     * Supprime le locataire
     */
    const deleteLocataire = (locataire: Locataire) => {
        let _locataires = locataires.filter(loc => loc.id !== locataire.id);
        setLocataires(_locataires);
        LocataireService.deleteLocataire(locataire);
    }


    /**
     * Lorsque l'utilisateur clique sur le bouton "modifier", le formulaire d'édition s'affiche avec les données du
     * locataire sélectionné.
     * @param {any} event - any
     * @param {Locataire} locataire - Locataire 
     */
    const openEditForm = (event: any, locataire: Locataire) => {
        event.preventDefault();
        setLocataire(locataire);

        setNom(locataire.nom);
        setPrenom(locataire.prenom);
        setEmail(locataire.email);
        setTelephone(locataire.telephone);

        setIsEditForm(true);
        setShowModal(true);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Gestion Locataires</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonButton expand='block' color="success" onClick={() => {
                    setShowModal(true);
                    setIsEditForm(false);
                }}>
                    Ajouter
                </IonButton>

                {locataires.map((data, index) => (
                    <LocataireCard key={index} locataire={data} openEditForm={openEditForm} deleteLocataire={deleteLocataire} />
                ))}

                <LocataireModal
                    locataire={locataire}

                    nom={nom}
                    prenom={prenom}
                    email={email}
                    telephone={telephone}

                    setNom={setNom}
                    setPrenom={setPrenom}
                    setEmail={setEmail}
                    setTelephone={setTelephone}

                    showModal={showModal}
                    setShowModal={setShowModal}
                    isEditForm={isEditForm}

                    addLocataire={addLocataire}
                    updateLocataire={updateLocataire}
                />
            </IonContent>
        </IonPage>
    );

}

export default GestionLocataires;
