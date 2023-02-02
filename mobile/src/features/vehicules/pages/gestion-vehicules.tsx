import React, { useState, useEffect } from 'react'
import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import VehiculeService from '../services/vehicule-service';
import Vehicule from '../models/vehicule';
import VehiculeCard from '../components/vehicule-card';
import VehiculeModal from '../components/vehicule-modal';
import LouerModal from '../components/louer-modal';

const GestionVehicules: React.FC = () => {
    const [vehicules, setVehicules] = useState<Vehicule[]>([]);
    const [vehicule, setVehicule] = useState<Vehicule>(new Vehicule());
    const [showModalLocation, setShowModalLocation] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEditForm, setIsEditForm] = useState<boolean>(false);

    const [marque, setMarque] = useState<string>("");
    const [modele, setModele] = useState<string>("");
    const [immatriculation, setImmatriculation] = useState<string>("");
    const [etat, setEtat] = useState<string>("");
    const [prixJournee, setPrixJournee] = useState<number>(0);
    const [disponibilite, setDisponibilite] = useState<boolean>(false);
    const [type, setType] = useState<string>("");

    useEffect(() => {
        VehiculeService.getVehicules().then(vehicules => setVehicules(vehicules));
    }, []);

    /**
     * Ajoute un véhicule
     */
    const addVehicule = (event: any, vehicule: Vehicule) => {
        event.preventDefault();
        setVehicules([...vehicules, vehicule]);
        VehiculeService.addVehicule(vehicule);
    }

    /**
     * Modifie un véhicule
     */
    const updateVehicule = (event: any, vehicule: Vehicule) => {
        event.preventDefault();
        VehiculeService.updateVehicule(vehicule);
    }

    /**
     * Supprime le véhicule
     */
    const deleteVehicule = (vehicule: Vehicule) => {
        let _vehicules = vehicules.filter(vec => vec.id !== vehicule.id);
        setVehicules(_vehicules);
        VehiculeService.deleteVehicule(vehicule);
    }

    /**
     * Lorsque l'utilisateur clique sur le bouton "louer", le formulaire de location s'affiche avec les données du
     * véhicule sélectionné.
     * @param {any} event - any
     * @param {Vehicule} vehicule - Vehicule 
     */
    const openModalLocation = (event: any, vehicule: Vehicule) => {
        event.preventDefault();
        setVehicule(vehicule);

        setMarque(vehicule.marque);
        setModele(vehicule.modele);
        setImmatriculation(vehicule.immatriculation);
        setEtat(vehicule.etat);
        setPrixJournee(vehicule.prixJournee);
        setDisponibilite(vehicule.disponibilite);
        setType(vehicule.type);

        setShowModalLocation(true);
    }


    /**
     * Lorsque l'utilisateur clique sur le bouton "modifier", le formulaire d'édition s'affiche avec les données du
     * véhicule sélectionné.
     * @param {any} event - any
     * @param {Vehicule} vehicule - Vehicule 
     */
    const openModalVehicule = (event: any, vehicule: Vehicule) => {
        event.preventDefault();
        setVehicule(vehicule);

        setMarque(vehicule.marque);
        setModele(vehicule.modele);
        setImmatriculation(vehicule.immatriculation);
        setEtat(vehicule.etat);
        setPrixJournee(vehicule.prixJournee);
        setDisponibilite(vehicule.disponibilite);
        setType(vehicule.type);

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
                    <IonTitle>Gestion Véhicules</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonButton expand='block' color="success" onClick={() => {
                    setShowModal(true);
                    setIsEditForm(false);
                }}>
                    Ajouter
                </IonButton>

                {vehicules.map((data, index) => (
                    <VehiculeCard key={index} vehicule={data} openModalLocation={openModalLocation} openModalVehicule={openModalVehicule} deleteVehicule={deleteVehicule} />
                ))}

                <VehiculeModal
                    vehicule={vehicule}

                    marque={marque}
                    modele={modele}
                    immatriculation={immatriculation}
                    etat={etat}
                    prixJournee={prixJournee}
                    disponibilite={disponibilite}
                    type={type}

                    setMarque={setMarque}
                    setModele={setModele}
                    setImmatriculation={setImmatriculation}
                    setEtat={setEtat}
                    setPrixJournee={setPrixJournee}
                    setDisponibilite={setDisponibilite}
                    setType={setType}

                    showModal={showModal}
                    setShowModal={setShowModal}
                    isEditForm={isEditForm}

                    addVehicule={addVehicule}
                    updateVehicule={updateVehicule}
                />

                <LouerModal
                    vehicule={vehicule}
                    showModalLocation={showModalLocation}
                    setShowModalLocation={setShowModalLocation}
                />
            </IonContent>
        </IonPage>
    );

}

export default GestionVehicules;
