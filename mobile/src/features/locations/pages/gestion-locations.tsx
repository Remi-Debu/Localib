import React, { useState, useEffect } from 'react'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Location from '../models/location';
import LocationService from '../services/location-service';
import LocationCard from '../components/location-card';
import LocationDetailsModal from '../components/location-details-modal';

const GestionLocations: React.FC = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [location, setLocation] = useState<Location>();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        LocationService.getLocations().then(locations => setLocations(locations));
    }, []);

    /**
    * Lorsque l'utilisateur clique sur le bouton "Détails", affiche le formulaire avec les données de la
    * location sélectionné.
    * @param {any} event - any
    * @param {Location} location - Location 
    */
    const openDetailsForm = (event: any, location: Location) => {
        event.preventDefault();
        setLocation(location);
        setShowModal(true);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Gestion Locations</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                {locations.map((data, index) => (
                    <LocationCard key={index} location={data} openDetailsForm={openDetailsForm} />
                ))}

                <LocationDetailsModal location={location} showModal={showModal} setShowModal={setShowModal} />
            </IonContent>
        </IonPage>
    );

}

export default GestionLocations;
