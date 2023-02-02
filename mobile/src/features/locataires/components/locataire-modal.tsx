import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import React, { useRef } from 'react'
import Locataire from '../models/locataire';

type Props = {
    locataire: Locataire,

    nom: string,
    prenom: string,
    email: string,
    telephone: string,

    setNom: any,
    setPrenom: any,
    setEmail: any,
    setTelephone: any,

    showModal: boolean,
    setShowModal: any,
    isEditForm: boolean,

    addLocataire: any,
    updateLocataire: any
};

const LocataireModal: React.FC<Props> = ({
    locataire,
    nom,
    prenom,
    email,
    telephone,
    setNom,
    setPrenom,
    setEmail,
    setTelephone,
    showModal,
    setShowModal,
    isEditForm,
    addLocataire,
    updateLocataire }) => {
    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);
    const [presentAlert] = useIonAlert();

    /**
     * Cette fonction ferme la modale en appelant la méthode dismiss sur l'objet modal.current avec les arguments input.current?.value et confirm. 
     * Elle met également à jour le state "showModal" en le mettant à false.
     */
    const valider = () => {
        modal.current?.dismiss(input.current?.value, 'confirm');
        setShowModal(false);
    }

    /**
     * Cette fonction gère les événements de fermeture de la modale. 
     * Si le rôle de l'événement déclenché est "confirm", 
     * les informations du locataire sont mises à jour avec ses valeurs. 
     * Ensuite, si "isEditForm" est vrai, la fonction "updateLocataire" est appelée avec les arguments "event" et "locataire", 
     * sinon la fonction "addLocataire" est appelée avec les mêmes arguments.
     * @param event 
     */
    const onWillDismiss = (event: any) => {
        if (event.detail.role === 'confirm') {
            locataire.nom = nom;
            locataire.prenom = prenom;
            locataire.email = email;
            locataire.telephone = telephone;
            isEditForm ? updateLocataire(event, locataire) : addLocataire(event, locataire);
        }
    }

    /**
     * Lorsque le bouton "annuler" est cliqué, 
     * la modale est fermée et les states sont réinitialisés à vides.
     */
    const cancel = () => {
        setNom("");
        setPrenom("");
        setEmail("");
        setTelephone("");
        setShowModal(false);
    }

    return (
        <IonModal ref={modal} isOpen={showModal} onWillDismiss={(event) => onWillDismiss(event)}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={cancel}>Annuler</IonButton>
                    </IonButtons>

                    <IonTitle>
                        {isEditForm ? "Modifier" : "Ajouter"}
                    </IonTitle>

                    <IonButtons slot="end">
                        {isEditForm ?
                            <IonButton strong={true} onClick={() =>
                                presentAlert({
                                    header: `Souhaitez-vous modifier, ${prenom} ${nom} ?`,
                                    buttons: [
                                        {
                                            text: 'Annuler',
                                            role: 'cancel'
                                        },
                                        {
                                            text: 'OK',
                                            role: 'confirm',
                                            handler: () => valider()
                                        },
                                    ]
                                })}>Valider</IonButton>
                            :
                            <IonButton strong={true} onClick={() =>
                                presentAlert({
                                    header: `Souhaitez-vous ajouter, ${prenom} ${nom} ?`,
                                    buttons: [
                                        {
                                            text: 'Annuler',
                                            role: 'cancel'
                                        },
                                        {
                                            text: 'OK',
                                            role: 'confirm',
                                            handler: () => valider()
                                        },
                                    ]
                                })}>Valider</IonButton>}
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel position="stacked">Nom :</IonLabel>
                    <IonInput ref={input} clearInput={true} type="text" placeholder="Votre nom..." value={nom} onIonChange={e => setNom(e.detail.value!)} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Prénom :</IonLabel>
                    <IonInput ref={input} clearInput={true} type="text" placeholder="Votre prénom..." value={prenom} onIonChange={e => setPrenom(e.detail.value!)} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Email :</IonLabel>
                    <IonInput ref={input} clearInput={true} type="text" placeholder="Votre email..." value={email} onIonChange={e => setEmail(e.detail.value!)} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Téléphone :</IonLabel>
                    <IonInput ref={input} clearInput={true} type="number" placeholder="Votre téléphone..." value={telephone} onIonChange={e => setTelephone(e.detail.value!)} />
                </IonItem>
            </IonContent>
        </IonModal>
    )
}

export default LocataireModal;
