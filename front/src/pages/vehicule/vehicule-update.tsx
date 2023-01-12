import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import Vehicule from '../../models/vehicule';
import VehiculeService from '../../services/vehicule-service';
import VehiculeForm from '../../components/vehicule-form';
import { Toolbar } from 'primereact/toolbar';
import Menu from '../../components/menu';

const VehiculeUpdate: React.FunctionComponent = () => {
    const state: number = useLocation().state;
    const [vehicule, setVehicule] = useState<Vehicule | null>(null);

    useEffect(() => {
        VehiculeService.getVehicule(state).then(vehicule => setVehicule(vehicule));
    }, [state]);

    /**
     * Affiche le contenu de gauche de la Toolbar
     * @returns Titre de la page.
     */
    const leftContents = () => (
        <>
            {vehicule ? (
                <h1 className="mx-0 my-1">Modifier {vehicule.marque + " " + vehicule.modele}</h1>
            ) : (
                <h4 className="center">Modifier un Véhicule</h4>
            )}
        </>
    );

    return (
        <>
            <Menu />
            <Toolbar left={leftContents} />
            {vehicule ? (
                <div className="row">
                    <VehiculeForm vehicule={vehicule} isEditForm={true} />
                </div>
            ) : (
                <Link to="*" />
            )}
        </>
    )
}

export default VehiculeUpdate;
