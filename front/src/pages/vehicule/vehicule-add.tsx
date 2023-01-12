import React, { useState } from 'react'
import { Toolbar } from 'primereact/toolbar';
import Vehicule from '../../models/vehicule';
import VehiculeForm from '../../components/vehicule-form';
import Menu from '../../components/menu';

const VehiculeAdd: React.FunctionComponent = () => {
    const [id] = useState<number>(new Date().getTime()); // Genere un Timestamp pour l'id d'un vehicule
    const [vehicule] = useState<Vehicule>(new Vehicule(id));

    /**
     * Affiche le contenu de gauche de la Toolbar
     * @returns Titre de la page.
     */
    const leftContents = () => (
        <h1 className="mx-0 my-1">Ajouter un Véhicule</h1>
    );

    return (
        <>
            <Menu />
            <Toolbar left={leftContents} />
            <VehiculeForm vehicule={vehicule} isEditForm={false} />
        </>
    )
}

export default VehiculeAdd;
