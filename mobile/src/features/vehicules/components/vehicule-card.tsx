import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonItem, IonLabel, IonList, useIonAlert } from '@ionic/react';
import { bandageOutline, carOutline, eyeOutline, languageOutline, logoEuro } from 'ionicons/icons';
import React from 'react'
import Vehicule from '../models/vehicule';

type Props = {
    vehicule: Vehicule,
    openModalLocation: any,
    openModalVehicule: any,
    deleteVehicule: any
}

const VehiculeCard: React.FC<Props> = ({ vehicule, openModalLocation, openModalVehicule, deleteVehicule }) => {
    const [presentAlert] = useIonAlert();

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>{vehicule.marque} {vehicule.modele}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonList>
                    <IonItem>
                        <IonIcon icon={languageOutline}></IonIcon>
                        <IonLabel>{vehicule.immatriculation}</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonIcon icon={bandageOutline}></IonIcon>
                        <IonLabel>{vehicule.etat}</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonIcon icon={eyeOutline}></IonIcon>
                        {vehicule.disponibilite ?
                            <IonLabel>Oui</IonLabel>
                            :
                            <IonLabel>Non</IonLabel>
                        }
                    </IonItem>

                    <IonItem>
                        <IonIcon icon={carOutline}></IonIcon>
                        <IonLabel>{vehicule.type}</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonIcon icon={logoEuro}></IonIcon>
                        <IonLabel>{vehicule.prixJournee}</IonLabel>
                    </IonItem>
                </IonList>
            </IonCardContent>

            {vehicule.disponibilite &&
                <IonButton onClick={(event) => openModalLocation(event, vehicule)}>
                    Louer
                </IonButton>
            }

            <IonButton color="warning" onClick={(event) => openModalVehicule(event, vehicule)}>
                Modifier
            </IonButton>

            <IonButton color="danger" onClick={() =>
                presentAlert({
                    header: `Souhaitez-vous supprimer, ${vehicule.marque} ${vehicule.modele}  ?`,
                    buttons: [
                        {
                            text: 'Annuler',
                            role: 'cancel'
                        },
                        {
                            text: 'OK',
                            role: 'confirm',
                            handler: () => deleteVehicule(vehicule)
                        },
                    ]
                })
            }>
                Supprimer
            </IonButton>
        </IonCard>
    )
}

export default VehiculeCard;
