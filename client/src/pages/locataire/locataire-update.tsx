import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import Locataire from '../../models/locataire';
import { Toolbar } from 'primereact/toolbar';
import LocataireService from '../../services/locataire-service';
import LocataireForm from '../../components/locataire-form';
import Menu from '../../components/menu';

const LocataireUpdate: React.FunctionComponent = () => {
    const state: number = useLocation().state;
    const [locataire, setLocataire] = useState<Locataire | null>(null);

    useEffect(() => {
        LocataireService.getLocataire(state).then(locataire => setLocataire(locataire));
    }, [state]);

    /**
     * Affiche le contenu de gauche de la Toolbar
     * @returns Titre de la page.
     */
    const leftContents = () => (
        <>
            {locataire ? (
                <h1 className="mx-0 my-1">Modifier {locataire.nom + " " + locataire.prenom}</h1>
            ) : (
                <h4 className="center">Modifier un Locataire</h4>
            )}
        </>
    );

    return (
        <>
            {locataire ? (
                <div>
                    <Menu />
                    <Toolbar left={leftContents} />
                    <LocataireForm locataire={locataire} isEditForm={true} />
                </div>
            ) : (
                <Link to="*" />
            )}
        </>
    )
}

export default LocataireUpdate;
