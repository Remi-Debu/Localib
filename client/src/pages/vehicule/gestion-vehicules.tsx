import React, { useEffect, useState } from 'react'
import './vehicule.css';
import Vehicule from '../../models/vehicule';
import VehiculeService from '../../services/vehicule-service';
import { DataTable } from 'primereact/datatable';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import Menu from '../../components/menu';

const GestionVehicules: React.FunctionComponent = () => {
    const [vehicules, setVehicules] = useState<Vehicule[]>([]);
    const [selectedVehicule, setSelectedVehicule] = useState(null);
    const [deleteVehiculeDialog, setDeleteVehiculeDialog] = useState(false);
    const [id] = useState<number>(new Date().getTime()); // Genere un Timestamp pour l'id d'un vehicule
    const [vehicule, setVehicule] = useState<Vehicule>(new Vehicule(id));
    const [globalFilter, setGlobalFilter] = useState<string | null>(null);


    useEffect(() => {
        VehiculeService.getVehicules().then(vehicules => setVehicules(vehicules));
    }, []);

    /**
     * Affiche le contenu de gauche de la Toolbar
     * @returns Titre de la page.
     */
    const leftContents = () => (
        <>
            <h1 className="mx-0 my-1" style={{ marginRight: "30px" }}>Gestion des Véhicules</h1>
            <Link to="/gestion-vehicules/ajouter" style={{ textDecoration: "none" }}>
                <Button label="Ajouter" icon="pi pi-plus" className="p-button-success mr-2" />
            </Link>
        </>
    );

    /**
     *  Affiche le contenu de droite de la Toolbar
     *  @returns Bouton d'ajout.
     */
    const rightContents = () => (
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="Search" onInput={(e: React.ChangeEvent<HTMLInputElement>) => setGlobalFilter(e.target.value)} placeholder="Recherche..." />
        </span>
    );

    /**
     * Afficher le bouton de modification et de suppression du tableau pour la dernière colonne
     * @returns Bouton modifier et supprimer.
     */
    const actionButtonTable = (rowData: Vehicule) => {
        return (
            <>
                <Link to={"/gestion-vehicules/modifier"} state={rowData.id} style={{ textDecoration: "none", marginRight: "20px" }}>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mr-2" />
                </Link>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteVehicule(rowData)} />
            </>
        );
    }

    /**
     * Définit l'état vehicule sur rowData et définit l'état deleteVehiculeDialog sur true.
     * @param {Locataire} rowData - Vehicule est la donnée de la ligne sur laquelle on a cliqué
     */
    const confirmDeleteVehicule = (vehicule: Vehicule) => {
        setVehicule(vehicule);
        setDeleteVehiculeDialog(true);
    }

    /**
     * Footer de la fenetre de suppression 
     * qui contient 2 boutons "oui" et "non"
     * @returns boutons "oui" et "non"
     */
    const deleteVehiculeDialogFooter = () => {
        return (
            <>
                <Button label="Non" icon="pi pi-times" className="p-button-text p-button-danger" onClick={hideDeleteVehiculeDialog} />
                <Button label="Oui" icon="pi pi-check" className="p-button-text p-button-success" onClick={deleteVehicule} />
            </>
        )
    }

    /**
     * Cache la fenetre de suppression.
     */
    const hideDeleteVehiculeDialog = () => {
        setDeleteVehiculeDialog(false);
    }

    /**
     * Supprime le vehicule et cache la fenetre de suppression.
     */
    const deleteVehicule = () => {
        let _vehicules = vehicules.filter(veh => veh.id !== vehicule.id);
        setVehicules(_vehicules);
        setDeleteVehiculeDialog(false);
        VehiculeService.deleteVehicule(vehicule);
    }

    return (
        <>
            <Menu />
            <Toolbar left={leftContents} right={rightContents} />

            <DataTable
                value={vehicules}
                selectionMode="single"
                selection={selectedVehicule}
                onSelectionChange={e => setSelectedVehicule(e.value)}
                responsiveLayout="scroll"
                stripedRows
                globalFilter={globalFilter}
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

            <Dialog visible={deleteVehiculeDialog} style={{ width: '450px' }} header="Confirmer la suppression" modal footer={deleteVehiculeDialogFooter} onHide={hideDeleteVehiculeDialog}>
                <div className="confirmation-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="pi pi-exclamation-triangle mr-3" style={{ color: '#EF4444', fontSize: '2rem', marginRight: '10px' }} />
                    {vehicule && <span>Êtes-vous sûr de vouloir supprimer<b> {vehicule.marque} {vehicule.modele} </b>?</span>}
                </div>
            </Dialog>
        </>
    )
}

export default GestionVehicules;
