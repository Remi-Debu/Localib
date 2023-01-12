import React, { useState, useEffect } from 'react'
import './locataire.css';
import Locataire from '../../models/locataire';
import LocataireService from '../../services/locataire-service';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import Menu from '../../components/menu';

const GestionLocataires: React.FunctionComponent = () => {
    const [locataires, setLocataires] = useState<Locataire[]>([]);
    const [selectedLocataire, setSelectedLocataire] = useState(null);
    const [deleteLocataireDialog, setDeleteLocataireDialog] = useState(false);
    const [id] = useState<number>(new Date().getTime()); // Genere un Timestamp pour l'id d'un locataire
    const [locataire, setLocataire] = useState<Locataire>(new Locataire(id));
    const [globalFilter, setGlobalFilter] = useState<string | null>(null);

    useEffect(() => {
        LocataireService.getLocataires().then(locataires => setLocataires(locataires));
    }, []);

    /**
     * Affiche le contenu de gauche de la Toolbar
     * @returns Titre de la page.
     */
    const leftContents = () => {
        return (
            <>
                <h1 className="mx-0 my-1" style={{ marginRight: "30px" }}>Gestion des Locataires</h1>
                <Link to="/gestion-locataires/ajouter" style={{ textDecoration: "none" }}>
                    <Button label="Ajouter" icon="pi pi-plus" className="p-button-success mr-2" />
                </Link>
            </>
        );
    }

    /**
     *  Affiche le contenu de droite de la Toolbar
     *  @returns Bouton d'ajout.
     */
    const rightContents = () => {
        return (
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="Search" onInput={(e: React.ChangeEvent<HTMLInputElement>) => setGlobalFilter(e.target.value)} placeholder="Recherche..." />
            </span>
        );
    }

    /**
     * Afficher le bouton de modification et de suppression du tableau pour la dernière colonne
     * @returns Bouton modifier et supprimer.
     */
    const actionButtonTable = (rowData: Locataire) => {
        return (
            <>
                <Link to={"/gestion-locataires/modifier"} state={rowData.id} style={{ textDecoration: "none", marginRight: "20px" }}>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mr-2" />
                </Link>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteLocataire(rowData)} />
            </>
        );
    }

    /**
     * Définit l'état locataire sur rowData et définit l'état deleteLocataireDialog sur true.
     * @param {Locataire} rowData - Locataire est la donnée de la ligne sur laquelle on a cliqué
     */
    const confirmDeleteLocataire = (rowData: Locataire) => {
        setLocataire(rowData);
        setDeleteLocataireDialog(true);
    }

    /**
     * Footer de la fenetre de suppression 
     * qui contient 2 boutons "oui" et "non"
     * @returns bouton "oui" et "non"
     */
    const deleteLocataireDialogFooter = () => {
        return (
            <>
                <Button label="Non" icon="pi pi-times" className="p-button-text p-button-danger" onClick={hideDeleteLocataireDialog} />
                <Button label="Oui" icon="pi pi-check" className="p-button-text p-button-success" onClick={deleteLocataire} />
            </>
        );
    }

    /**
     * Cache la fenetre de suppression.
     */
    const hideDeleteLocataireDialog = () => {
        setDeleteLocataireDialog(false);
    }

    /**
     * Supprime le locataire et cache la fenetre de suppression.
     */
    const deleteLocataire = () => {
        let _locataires = locataires.filter(loc => loc.id !== locataire.id);
        setLocataires(_locataires);
        setDeleteLocataireDialog(false);
        LocataireService.deleteLocataire(locataire);
    }

    return (
        <>
            <Menu />
            <Toolbar left={leftContents} right={rightContents} />

            <DataTable
                value={locataires}
                selectionMode="single"
                selection={selectedLocataire}
                onSelectionChange={e => setSelectedLocataire(e.value)}
                responsiveLayout="scroll"
                stripedRows
                globalFilter={globalFilter}
                style={{ width: '90%', margin: '0 auto 0 auto' }}
            >
                <Column field="nom" header="Nom" align="center" sortable />
                <Column field="prenom" header="Prénom" align="center" sortable />
                <Column field="email" header="E-mail" align="center" sortable />
                <Column field="telephone" header="Téléphone" align="center" sortable />
                <Column body={actionButtonTable} align="center" />
            </DataTable>

            <Dialog visible={deleteLocataireDialog} style={{ width: '450px' }} header="Confirmer la suppression" modal footer={deleteLocataireDialogFooter} onHide={hideDeleteLocataireDialog}>
                <div className="confirmation-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="pi pi-exclamation-triangle mr-3" style={{ color: '#EF4444', fontSize: '2rem', marginRight: '10px' }} />
                    {locataire && <span>Êtes-vous sûr de vouloir supprimer<b> {locataire.nom} {locataire.prenom} </b>?</span>}
                </div>
            </Dialog>
        </>
    );

}

export default GestionLocataires;
