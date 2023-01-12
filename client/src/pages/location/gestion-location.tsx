import React, { useState, useEffect } from 'react'
import LocationService from '../../services/location-service';
import Location from '../../models/location';
import { Link } from 'react-router-dom';
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Menu from '../../components/menu';

const GestionLocation: React.FunctionComponent = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        LocationService.getLocations().then(locations => setLocations(locations));
    }, []);

    /**
     * Affiche le contenu de gauche de la Toolbar
     * @returns Titre de la page.
     */
    const leftContents = () => {
        return (
            <h1 className="mx-0 my-1">Gestion des Locations</h1>
        );
    }

    /**
     * Afficher le bouton de détails du tableau pour la dernière colonne
     * @returns Bouton détails.
     */
    const actionButtonTable = (rowData: Location) => {
        return (
            <Link to={"/gestion-locations/details"} state={rowData.id} style={{ textDecoration: "none" }}>
                <Button icon="pi pi-plus" className="p-button-rounded p-button-info mr-2" />
            </Link>
        );
    };

    return (
        <>
            <Menu />
            <Toolbar left={leftContents} />

            <DataTable
                value={locations}
                selectionMode="single"
                selection={selectedLocation}
                onSelectionChange={e => setSelectedLocation(e.value)}
                responsiveLayout="scroll"
                stripedRows
                style={{ width: '90%', margin: '0 auto 0 auto' }}
            >
                <Column field="locataire.nom" header="Nom" align="center" sortable />
                <Column field="locataire.prenom" header="Prénom" align="center" sortable />
                <Column field="vehicule.marque" header="Marque" align="center" sortable />
                <Column field="vehicule.modele" header="Modèle" align="center" sortable />
                <Column field="dateDebut" header="Date de début" align="center" sortable />
                <Column field="dateFin" header="Date de fin" align="center" sortable />
                <Column field="cout" header="Coût" align="center" sortable />
                <Column body={actionButtonTable} align="center" />
            </DataTable>
        </>
    )
}

export default GestionLocation;
