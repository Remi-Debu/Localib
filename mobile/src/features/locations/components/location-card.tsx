import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import { calendarOutline, carOutline, logoEuro } from 'ionicons/icons';
import React from 'react'
import Location from '../models/location';

type Props = {
    location: Location,
    openDetailsForm: any
}

const LocationCard: React.FC<Props> = ({ location, openDetailsForm }) => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>{location.locataire.prenom} {location.locataire.nom}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonList>
                    <IonItem>
                        <IonIcon icon={carOutline}></IonIcon>
                        <IonLabel>{location.vehicule.marque} {location.vehicule.modele}</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonIcon icon={calendarOutline}></IonIcon>
                        <IonLabel>{location.dateDebut} au {location.dateFin}</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonIcon icon={logoEuro}></IonIcon>
                        <IonLabel>{location.prixTotal}</IonLabel>
                    </IonItem>
                </IonList>
            </IonCardContent>

            <IonButton id="open-modal" onClick={(event) => openDetailsForm(event, location)}>Détails</IonButton>
        </IonCard>
    )
}

export default LocationCard;
