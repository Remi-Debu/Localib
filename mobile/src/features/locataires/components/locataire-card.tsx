import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonItem, IonLabel, IonList, useIonAlert } from '@ionic/react';
import { callOutline, mailOutline } from 'ionicons/icons';
import React from 'react'
import Locataire from '../models/locataire';

type Props = {
    locataire: Locataire;
    openEditForm: any;
    deleteLocataire: any;
}

const LocataireCard: React.FC<Props> = ({ locataire, openEditForm, deleteLocataire }) => {
    const [presentAlert] = useIonAlert();

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>{locataire.prenom} {locataire.nom}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonList>
                    <IonItem>
                        <IonIcon icon={mailOutline}></IonIcon>
                        <IonLabel>{locataire.email}</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonIcon icon={callOutline}></IonIcon>
                        <IonLabel>{locataire.telephone}</IonLabel>
                    </IonItem>
                </IonList>
            </IonCardContent>

            <IonButton id="open-modal" color="warning" onClick={(event) => {
                openEditForm(event, locataire);
            }}>
                Modifier
            </IonButton>

            <IonButton color="danger" onClick={() =>
                presentAlert({
                    header: `Souhaitez-vous supprimer, ${locataire.prenom} ${locataire.nom}  ?`,
                    buttons: [
                        {
                            text: 'Annuler',
                            role: 'cancel'
                        },
                        {
                            text: 'OK',
                            role: 'confirm',
                            handler: () => deleteLocataire(locataire)
                        },
                    ]
                })
            }>
                Supprimer
            </IonButton>
        </IonCard>
    )
}

export default LocataireCard;
