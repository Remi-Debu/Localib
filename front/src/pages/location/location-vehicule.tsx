import React, { useEffect, useState } from 'react'
import Vehicule from '../../models/vehicule';
import VehiculeService from '../../services/vehicule-service';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import Menu from '../../components/menu';

const LocationVehicule = () => {
    const [vehicules, setVehicules] = useState<Vehicule[]>([]);

    useEffect(() => {
        VehiculeService.getVehicules().then(vehicules => setVehicules(vehicules));
    }, []);

    /**
     * Affiche le contenu de gauche de la Toolbar
     * @returns Titre de la page.
     */
    const leftContents = () => {
        return (
            <h1 className="mx-0 my-1">Location de Véhicules</h1>
        );
    };

    /**
     * Afficher le bouton de détails du tableau pour la dernière colonne
     * @returns Bouton détails.
     */
    const actionButtonTable = (rowData: Vehicule) => {
        return (
            <React.Fragment>
                {rowData.disponibilite.toLocaleUpperCase() == "OUI" &&
                    <Link to={"/location-vehicules/louer"} state={rowData.id} style={{ textDecoration: "none" }}>
                        <Button label="Louer" className="p-button-info" />
                    </Link>
                }
            </React.Fragment>
        );
    };

    return (
        <>
            <Menu />
            <Toolbar left={leftContents} />

            <DataTable
                value={vehicules}
                responsiveLayout="scroll"
                stripedRows
                style={{ width: '90%', margin: '0 auto 0 auto' }}
            >
                <Column field="marque" header="Marque" align="center" sortable />
                <Column field="modele" header="Modèle" align="center" sortable />
                <Column field="immatriculation" header="Immatriculation" align="center" sortable />
                <Column field="etat" header="État" align="center" sortable />
                <Column field="prix" header="Prix" align="center" sortable />
                <Column field="type" header="Type" align="center" sortable />
                <Column field="disponibilite" header="Disponibilité" align="center" sortable />
                <Column body={actionButtonTable} align="center" />
            </DataTable>
        </>
    )
}

export default LocationVehicule;
