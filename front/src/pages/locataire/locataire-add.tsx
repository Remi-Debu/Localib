import React, { useState } from 'react'
import { Toolbar } from 'primereact/toolbar';
import Locataire from '../../models/locataire';
import LocataireForm from '../../components/locataire-form';
import Menu from '../../components/menu';

const LocataireAdd: React.FunctionComponent = () => {
    const [id] = useState<number>(new Date().getTime()); // Genere un Timestamp pour l'id d'un locataire
    const [locataire] = useState<Locataire>(new Locataire(id));

    /**
     * Affiche le contenu de gauche de la Toolbar
     * @returns Titre de la page.
     */
    const leftContents = () => (
        <h1 className="mx-0 my-1">Ajouter un Locataire</h1>
    );

    return (
        <>
            <Menu />
            <Toolbar left={leftContents} />
            <LocataireForm locataire={locataire} isEditForm={false} />
        </>
    )
}

export default LocataireAdd;
