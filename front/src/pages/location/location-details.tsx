import React, { useState, useEffect } from 'react'
import './location.css';
import LocationService from './../../services/location-service';
import Location from './../../models/location';
import { useLocation } from 'react-router';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import Menu from '../../components/menu';

const LocationDetails: React.FunctionComponent = () => {
    const state: number = useLocation().state;
    const [location, setLocation] = useState<Location | null>();

    useEffect(() => {
        LocationService.getLocation(state).then(location => setLocation(location));
    }, []);

    /**
     * Affiche le contenu de gauche de la Toolbar
     * @returns Titre de la page.
     */
    const leftContents = () => {
        return (
            <h1 className="mx-0 my-1">Détails de la Location</h1>
        )
    };

    return (
        <>
            <Menu />
            <Toolbar left={leftContents} />

            {location &&
                <div className='location-details'>
                    <div className='locataire-vehicule'>
                        <div className='locataire'>
                            <h2 className='title'>Locataire</h2>
                            <div className='columns'>
                                <div className='col-1'>
                                    {/* Locataire nom */}
                                    <h3>Nom</h3>
                                    <InputText id='nom' name='nom' value={location.locataire.nom} />
                                    {/* Locataire prenom */}
                                    <h3>Prénom</h3>
                                    <InputText id='prenom' name='prenom' value={location.locataire.prenom} />
                                </div>
                                <div className='col-2'>
                                    {/* Locataire email */}
                                    <h3>Email</h3>
                                    <InputText id='email' name='email' value={location.locataire.email} />
                                    {/* Locataire telephone */}
                                    <h3>Téléphone</h3>
                                    <InputText id='telephone' name='telephone' value={location.locataire.telephone} />
                                </div>
                            </div>
                        </div>

                        <div className='vehicule'>
                            <h2 className='title'>Véhicule</h2>
                            <div className='columns'>
                                <div className='col-1'>
                                    {/* Vehicule marque */}
                                    <h3>Marque</h3>
                                    <InputText id='marque' name='marque' value={location.vehicule.marque} />
                                    {/* Vehicule modele */}
                                    <h3>Modèle</h3>
                                    <InputText id='modele' name='modele' value={location.vehicule.modele} />
                                </div>
                                <div className='col-2'>
                                    {/* Vehicule immatriculation */}
                                    <h3>Immatriculation</h3>
                                    <InputText id='immatriculation' name='immatriculation' value={location.vehicule.immatriculation} />
                                    {/* Vehicule etat */}
                                    <h3>État</h3>
                                    <InputText id='etat' name='etat' value={location.vehicule.etat} />

                                </div>
                                <div className='col-3'>
                                    {/* Vehicule type */}
                                    <h3>Type</h3>
                                    <InputText id='type' name='type' value={location.vehicule.type} />
                                    {/* Vehicule prix */}
                                    <h3>Prix</h3>
                                    <InputText id='prix' name='prix' value={location.vehicule.prix} />
                                </div>
                            </div>
                        </div>
                    </div >

                    <div className='location'>
                        <h2 className='title'>Location</h2>
                        <div className='attributs-location'>
                            {/* Location dateDebut */}
                            <h3>Date de début</h3>
                            <InputText id='dateDebut' name='dateDebut' value={location.dateDebut} />
                            {/* Location dateFin */}
                            <h3>Date de fin</h3>
                            <InputText id='dateFin' name='dateFin' value={location.dateFin} />
                            {/* Location cout */}
                            <h3>Coût</h3>
                            <InputText id='cout' name='cout' value={location.cout} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default LocationDetails;
