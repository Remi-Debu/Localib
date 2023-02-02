import { IonButton, IonButtons, IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar, useIonAlert, useIonPicker } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react'
import Locataire from '../../locataires/models/locataire';
import LocataireService from '../../locataires/services/locataire-service';
import Location from '../../locations/models/location';
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
        calculCout();
    }, [dateDebut, dateFin]);

    /**
     * Si dateDebut, dateFin et vehicule sont définis, 
     * calcule la différence de jours entre dateDebut et dateFin, 
     * multiplie cette différence par le prix par jour du véhicule 
     * et définit le résultat sur la variable cout.
     */
    const calculCout = () => {
        let result = 0;

        if (dateDebut && dateFin && vehicule) {
            if (dateDebut <= dateFin) {
                let date1 = new Date(dateDebut.toString());
                let date2 = new Date(dateFin.toString());

                let DifferenceInTime = date2.getTime() - date1.getTime();
                let DifferenceInDays = (DifferenceInTime / (1000 * 3600 * 24)) + 1;

                result = vehicule.prixJournee * DifferenceInDays;
                result = parseFloat(result.toFixed(2));
            }
        }
        setCout(result);
    }

    /**
     * Cette fonction ferme la modale en appelant la méthode dismiss sur l'objet modal.current avec les arguments input.current?.value et confirm. 
     * Elle met également à jour le state "showModal" en le mettant à false.
     */
    const valider = () => {
        modal.current?.dismiss(input.current?.value, 'confirm');
        setShowModalLocation(false);
    }

    /**
     * Cette fonction gère les événements de fermeture de la modale. 
     * Si le rôle de l'événement déclenché est "confirm" et "locataire" existe, 
     * les informations de la location sont mises à jour avec ses valeurs. 
     * Ensuite, la fonction "addLocation" est appelée.
     * @param event 
     */
    const onWillDismiss = (event: any) => {
        if (event.detail.role === 'confirm' && locataire) {
            let formatDateDebut: string = dateDebut.substring(0, 10);
            let formatDateFin: string = dateFin.substring(0, 10);

            let louer: Location = new Location(locataire, vehicule, formatDateDebut, formatDateFin);
            LocationService.addLocation(louer);
        }
    }

    /**
     * Lorsque le bouton "annuler" est cliqué, 
     * la modale est fermée et les states sont réinitialisés à vides.
     */
    const cancel = () => {
        setShowModalLocation(false);
    }

    /**
     * Cette fonction prend une liste de locataires et la transforme en une liste d'options pour le sélecteur. 
     * Elle passe ces options à la méthode "present" avec une configuration pour les boutons "Cancel" et "Valider". 
     * Lorsque l'utilisateur clique sur le bouton "Valider", la fonction "handler" est déclenchée avec la valeur sélectionnée, 
     * qui est passée à la fonction "selectLocat" pour sélectionner le locataire correspondant.
     */
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
    }

    /**
     * Cette fonction sélectionne un locataire en utilisant son identifiant (id). 
     * appelle "getLocataire" de l'objet "LocataireService" pour obtenir le locataire correspondant à l'identifiant donné. 
     * Si la requête est réussie, elle utilise la fonction "setLocataire" pour mettre à jour l'état avec le locataire retourné.
     * @param id 
     */
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
