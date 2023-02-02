import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import React, { useRef } from 'react'
import Location from '../models/location';

type Props = {
    location: Location | undefined,
    showModal: boolean,
    setShowModal: any
};

const LocationDetailsModal: React.FC<Props> = ({ location, showModal, setShowModal }) => {
    const modal = useRef<HTMLIonModalElement>(null);

    /**
     * Lorsque le bouton "annuler" est cliqué, ferme la modale.
     */
    const cancel = () => {
        setShowModal(false);
    }

    return (
        <IonModal ref={modal} isOpen={showModal}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={cancel}>Annuler</IonButton>
                    </IonButtons>

                    <IonTitle>Détails</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonHeader>Location :</IonHeader>
                <IonItem>
                    <IonLabel position="stacked">Date de début :</IonLabel>
                    <IonInput readonly={true} type="text" value={location?.dateDebut} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Date de fin :</IonLabel>
                    <IonInput readonly={true} type="text" value={location?.dateFin} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Coût :</IonLabel>
                    <IonInput readonly={true} type="text" value={(location?.prixTotal)?.toFixed(2)} />
                </IonItem>

                <IonHeader style={{ marginTop: "30px" }}>Locataire :</IonHeader>
                <IonItem>
                    <IonLabel position="stacked">Nom :</IonLabel>
                    <IonInput readonly={true} type="text" value={location?.locataire.nom} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Prénom :</IonLabel>
                    <IonInput readonly={true} type="text" value={location?.locataire.prenom} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Email :</IonLabel>
                    <IonInput readonly={true} type="text" value={location?.locataire.email} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Téléphone :</IonLabel>
                    <IonInput readonly={true} type="text" value={location?.locataire.telephone} />
                </IonItem>

                <IonHeader style={{ marginTop: "30px" }}>Véhicule :</IonHeader>
                <IonItem>
                    <IonLabel position="stacked">Marque :</IonLabel>
                    <IonInput readonly={true} type="text" value={location?.vehicule.marque} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Modèle :</IonLabel>
                    <IonInput readonly={true} type="text" value={location?.vehicule.modele} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Immatriculation :</IonLabel>
                    <IonInput readonly={true} type="text" value={location?.vehicule.immatriculation} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">État :</IonLabel>
                    <IonInput readonly={true} type="text" value={location?.vehicule.etat} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Disponible :</IonLabel>
                    <IonInput readonly={true} type="text" value={location?.vehicule.disponibilite ? "Oui" : "Non"} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Type :</IonLabel>
                    <IonInput readonly={true} type="text" value={location?.vehicule.type} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Prix :</IonLabel>
                    <IonInput readonly={true} type="number" value={location?.vehicule.prixJournee} />
                </IonItem>
            </IonContent>
        </IonModal>
    )
}

export default LocationDetailsModal;
