import React from 'react'
import './menu.css';
import { Menubar } from 'primereact/menubar';

const Menu: React.FunctionComponent = () => {
    const items = [
        {
            label: 'Gestion Véhicules',
            url: '/gestion-vehicules'
        },
        {
            label: 'Gestion Locataires',
            url: '/gestion-locataires'
        },
        {
            label: 'Gestion Locations',
            url: '/gestion-locations'
        },
        {
            label: 'Location Véhicules',
            url: '/location-vehicules'
        }
    ];

    const start = <img src="/localib.png" height={90} alt="logo" />;

    return (
        <>
            <Menubar model={items} start={start} />
        </>
    );
}

export default Menu;
