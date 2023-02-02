import { IonButton, IonButtons, IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar, useIonAlert, useIonPicker } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react'
import Locataire from '../../locataires/models/locataire';
import LocataireService from '../../locataires/services/locataire-service';
import LocationService from '../../locations/services/location-service';
import Vehicule from '../models/vehicule';

type Props = {
    vehicule: Vehicule,
    showModalLocation: boolean,
    setShowModalLocation: any
};

const LouerModal: React.FC<Props> = ({
    vehicule,
    showModalLocation,
    setShowModalLocation }) => {
    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);
    const [presentAlert] = useIonAlert();
    const [present] = useIonPicker();
    const [locataires, setLocataires] = useState<Locataire[]>([]);
    const [locataire, setLocataire] = useState<Locataire | null>();
    const [dateDebut, setDateDebut] = useState<any>();
    const [dateFin, setDateFin] = useState<any>();
    const [cout, setCout] = useState<number>(0);

    useEffect(() => {
        LocataireService.getLocataires().then(locataires => setLocataires(locataires));
        // calculCout();
    }, [dateDebut, dateFin]);

    const valider = () => {
        modal.current?.dismiss(input.current?.value, 'confirm');
        setShowModalLocation(false);
    }

    const onWillDismiss = (event: any) => {
        if (event.detail.role === 'confirm' && locataire) {
            const id: number = new Date().getTime();
            // let louer: Location = new Location(id, vehicule, locataire, dateDebut, dateFin, cout);

            // LocationService.addLocation(louer);
        }
    }

    /**
     * Lorsque le bouton "annuler" est cliqué, 
     * la modale est fermée et les states sont réinitialisés à vides.
     */
    const cancel = () => {
        setShowModalLocation(false);
    }

    const openPicker = async () => {
        const options = locataires.map(loc => {
            return { text: loc.email, value: loc.id };
        });

        present({
            columns: [
                {
                    name: 'languages',
                    options: options,
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                },
                {
                    text: 'Valider',
                    handler: (value) => selectLocat(value.languages.value),
                },
            ],
        });
    };

    const selectLocat = (id: number) => {
        LocataireService.getLocataire(id).then((loc) => {
            setLocataire(loc);
        });
    }

    return (
        <IonModal ref={modal} isOpen={showModalLocation} onWillDismiss={(event) => onWillDismiss(event)}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={cancel}>Annuler</IonButton>
                    </IonButtons>

                    <IonTitle>Louer</IonTitle>

                    <IonButtons slot="end">
                        <IonButton strong={true} onClick={() =>
                            presentAlert({
                                header: `Souhaitez-vous louer, ${vehicule.marque} ${vehicule.modele} ?`,
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
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                {/* Location */}
                <IonHeader>Location :</IonHeader>
                <IonItem>
                    <IonLabel position="stacked">Date de début :</IonLabel>
                    <IonDatetimeButton datetime="dateDebut"></IonDatetimeButton>

                    <IonModal keepContentsMounted={true} >
                        <IonDatetime id="dateDebut" presentation="date" onIonChange={e => setDateDebut(e.target.value)}></IonDatetime>
                    </IonModal>
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Date de fin :</IonLabel>
                    <IonDatetimeButton datetime="dateFin"></IonDatetimeButton>

                    <IonModal keepContentsMounted={true}>
                        <IonDatetime id="dateFin" presentation="date" onIonChange={e => setDateFin(e.target.value)}></IonDatetime>
                    </IonModal>
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Coût :</IonLabel>
                    <IonInput readonly={true} type="number" value={cout} />
                </IonItem>

                {/* Locataire */}
                <IonHeader style={{ marginTop: "30px" }}>Locataire :</IonHeader>
                <IonButton expand='block' onClick={openPicker}>Selectionner un locataire</IonButton>

                {locataire &&
                    <>
                        <IonItem>
                            <IonLabel position="stacked">Nom :</IonLabel>
                            <IonInput readonly={true} type="text" value={locataire.nom} />
                        </IonItem>

                        <IonItem>
                            <IonLabel position="stacked">Prénom :</IonLabel>
                            <IonInput readonly={true} type="text" value={locataire.prenom} />
                        </IonItem>

                        <IonItem>
                            <IonLabel position="stacked">Email :</IonLabel>
                            <IonInput readonly={true} type="text" value={locataire.email} />
                        </IonItem>

                        <IonItem>
                            <IonLabel position="stacked">Téléphone :</IonLabel>
                            <IonInput readonly={true} type="text" value={locataire.telephone} />
                        </IonItem>
                    </>
                }

                {/* Vehicule */}
                <IonHeader style={{ marginTop: "30px" }}>Véhicule :</IonHeader>
                <IonItem>
                    <IonLabel position="stacked">Marque :</IonLabel>
                    <IonInput readonly={true} type="text" value={vehicule.marque} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Modèle :</IonLabel>
                    <IonInput readonly={true} type="text" value={vehicule.modele} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Immatriculation :</IonLabel>
                    <IonInput readonly={true} type="text" value={vehicule.immatriculation} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">État :</IonLabel>
                    <IonInput readonly={true} type="text" value={vehicule.etat} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Disponible :</IonLabel>
                    <IonInput readonly={true} type="text" value={vehicule.disponibilite ? "Oui" : "Non"} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Type :</IonLabel>
                    <IonInput readonly={true} type="text" value={vehicule.type} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Prix :</IonLabel>
                    <IonInput readonly={true} type="number" value={vehicule.prixJournee} />
                </IonItem>
            </IonContent>
        </IonModal >
    )
}

export default LouerModal;
