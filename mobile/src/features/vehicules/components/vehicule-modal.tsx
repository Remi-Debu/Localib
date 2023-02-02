import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonModal, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import React, { useRef } from 'react'
import Vehicule from '../models/vehicule';

type Props = {
    vehicule: Vehicule,

    marque: string;
    modele: string;
    immatriculation: string;
    etat: string;
    prixJournee: number;
    disponibilite: boolean;
    type: string;

    setMarque: any,
    setModele: any,
    setImmatriculation: any,
    setEtat: any,
    setPrixJournee: any,
    setDisponibilite: any,
    setType: any

    showModal: boolean,
    setShowModal: any,
    isEditForm: boolean,

    addVehicule: any,
    updateVehicule: any
};

const VehiculeModal: React.FC<Props> = ({
    vehicule,
    marque,
    modele,
    immatriculation,
    etat,
    prixJournee,
    disponibilite,
    type,
    setMarque,
    setModele,
    setImmatriculation,
    setEtat,
    setPrixJournee,
    setDisponibilite,
    setType,
    showModal,
    setShowModal,
    isEditForm,
    addVehicule,
    updateVehicule }) => {
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
     * les informations du véhicule sont mises à jour avec ses valeurs. 
     * Ensuite, si "isEditForm" est vrai, la fonction "updateVehicule" est appelée avec les arguments "event" et "vehicule", 
     * sinon la fonction "addVehicule" est appelée avec les mêmes arguments.
     * @param event 
     */
    const onWillDismiss = (event: any) => {
        if (event.detail.role === 'confirm') {
            vehicule.marque = marque;
            vehicule.modele = modele;
            vehicule.immatriculation = immatriculation;
            vehicule.etat = etat;
            vehicule.prixJournee = prixJournee;
            vehicule.disponibilite = disponibilite;
            vehicule.type = type;
            isEditForm ? updateVehicule(event, vehicule) : addVehicule(event, vehicule);
            setMarque("");
            setModele("");
            setImmatriculation("");
            setEtat("");
            setPrixJournee(0);
            setDisponibilite("");
            setType("");
        }
    }

    /**
     * Lorsque le bouton "annuler" est cliqué, 
     * la modale est fermée et les states sont réinitialisés à vides.
     */
    const cancel = () => {
        setMarque("");
        setModele("");
        setImmatriculation("");
        setEtat("");
        setPrixJournee(0);
        setDisponibilite("");
        setType("");
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
                                    header: `Souhaitez-vous modifier, ${marque} ${modele} ?`,
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
                                    header: `Souhaitez-vous ajouter, ${marque} ${modele} ?`,
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
                    <IonLabel position="stacked">Marque :</IonLabel>
                    <IonInput ref={input} clearInput={true} type="text" placeholder="Marque..." value={marque} onIonChange={e => setMarque(e.detail.value!)} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Modèle :</IonLabel>
                    <IonInput ref={input} clearInput={true} type="text" placeholder="Modèle..." value={modele} onIonChange={e => setModele(e.detail.value!)} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Immatriculation :</IonLabel>
                    <IonInput ref={input} clearInput={true} type="text" placeholder="Immatriculation..." value={immatriculation} onIonChange={e => setImmatriculation(e.detail.value!)} />
                </IonItem>

                <IonList>
                    <IonItem>
                        <IonLabel>État :</IonLabel>
                        <IonSelect placeholder="État" value={etat} onIonChange={e => setEtat(e.detail.value!)}>
                            <IonSelectOption value="A">A</IonSelectOption>
                            <IonSelectOption value="B">B</IonSelectOption>
                            <IonSelectOption value="C">C</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                </IonList>

                <IonList>
                    <IonItem>
                        <IonLabel>Disponible :</IonLabel>

                        <IonSelect placeholder="Disponible" value={disponibilite ? "Oui" : "Non"} onIonChange={e => {
                            if (e.detail.value === "Oui") {
                                setDisponibilite(true);
                            } else {
                                setDisponibilite(false);
                            }
                        }}>
                            <IonSelectOption value="Oui">Oui</IonSelectOption>
                            <IonSelectOption value="Non">Non</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                </IonList>

                <IonList>
                    <IonItem>
                        <IonLabel>Type :</IonLabel>
                        <IonSelect placeholder="Type" value={type} onIonChange={e => setType(e.detail.value!)}>
                            <IonSelectOption value="Voiture">Voiture</IonSelectOption>
                            <IonSelectOption value="Camion">Camion</IonSelectOption>
                            <IonSelectOption value="Moto">Moto</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                </IonList>

                <IonItem>
                    <IonLabel position="stacked">Prix :</IonLabel>
                    <IonInput ref={input} clearInput={true} type="number" value={prixJournee} onIonChange={e => setPrixJournee(parseFloat(e.detail.value!))} />
                </IonItem>
            </IonContent>
        </IonModal>
    )
}

export default VehiculeModal;
