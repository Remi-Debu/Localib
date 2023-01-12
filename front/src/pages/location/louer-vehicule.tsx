import React, { useState, useEffect } from 'react'
import Vehicule from '../../models/vehicule';
import Locataire from '../../models/locataire';
import Location from '../../models/location';
import VehiculeService from '../../services/vehicule-service';
import LocataireService from '../../services/locataire-service';
import LocationService from '../../services/location-service';
import Menu from '../../components/menu';
import { useLocation, useNavigate } from 'react-router';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import { AutoComplete } from 'primereact/autocomplete';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';

const LouerVehicule: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const state: number = useLocation().state;
    const [vehicule, setVehicule] = useState<Vehicule | null>();
    const [locataires, setLocataires] = useState<Locataire[]>([]);
    const [selectedLocataire, setSelectedLocataire] = useState();
    const [filteredLocataires, setFilteredLocataires] = useState<Locataire[]>([]);
    const [dateDebut, setDateDebut] = useState<Date | Date[] | undefined>(undefined);
    const [dateFin, setDateFin] = useState<Date | Date[] | undefined>(undefined);
    const [cout, setCout] = useState<number>(0);

    useEffect(() => {
        VehiculeService.getVehicule(state).then(vehicule => setVehicule(vehicule));
        LocataireService.getLocataires().then(locataires => setLocataires(locataires));
        calculCout();
    }, [dateDebut, dateFin, selectedLocataire]);

    /**
     * Affiche le contenu de gauche de la Toolbar
     * @returns Titre de la page.
     */
    const leftContents = () => {
        return (
            <h1 className="mx-0 my-1">Louer un Véhicule</h1>
        );
    };

    /**
     * Filtre les locataires via la barre de recherche des locataires
     * @param event - { chaîne de requête }
     */
    const searchLocataire = (event: { query: string }) => {
        setTimeout(() => {
            let _filteredLocataires: Locataire[];

            if (!event.query.trim().length) {
                _filteredLocataires = [...locataires];
            } else {
                _filteredLocataires = locataires.filter(locataire => {
                    return locataire.email.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            setFilteredLocataires(_filteredLocataires);
        }, 300); // delay en ms pour retourner les emails
    };

    /**
     * Si dateDebut, dateFin et vehicule sont définis, 
     * calcule la différence de jours entre dateDebut et dateFin, 
     * multiplie cette différence par le prix par jour du véhicule 
     * et définit le résultat sur la variable cout.
     */
    const calculCout = () => {
        let result = 0;

        if (dateDebut && dateFin && vehicule) {
            if (dateDebut <= dateFin) {
                let date1 = new Date(dateDebut.toString());
                let date2 = new Date(dateFin.toString());

                let DifferenceInTime = date2.getTime() - date1.getTime();
                let DifferenceInDays = (DifferenceInTime / (1000 * 3600 * 24)) + 1;

                result = vehicule.prix * DifferenceInDays;
                result = parseFloat(result.toFixed(2));
            }
        }
        setCout(result);
    }

    /**
     * Appelée lors du submit du formulaire 
     * Si un locataire, un vehicule, une date de debut, de fin et le cout existent 
     * modifie la disponibilite du vehicule
     * et ajoute la location
     */
    const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        if (filteredLocataires[0] && vehicule && dateDebut && dateFin && cout) {
            if (dateDebut <= dateFin) {
                let locationId = new Date().getTime(); // id == timestamp
                let locationVehicule = vehicule;
                let locationLocataire = filteredLocataires[0];
                // date de type string où l'on recupere seulement la date et pas le temps (ex: 01/01/1999)
                let locationDateDebut = dateDebut.toLocaleString().substring(0, 10);
                let locationDateFin = dateFin.toLocaleString().substring(0, 10);
                let locationCout = cout;

                vehicule.disponibilite = "Non";
                updateVehicule(vehicule);

                let location = new Location(locationId, locationVehicule, locationLocataire, locationDateDebut, locationDateFin, locationCout);
                addLocation(location);
            }
        }
    }

    /**
     * Ajoute une location et redirige vers la gestion des locations
     */
    const addLocation = (location: Location) => {
        LocationService.addLocation(location).then(() => navigate('/gestion-locations'));
    }

    /**
     * Modifie un vehicule, ce qui permet de changer la disponibilite du vehicule concerné
     */
    const updateVehicule = (vehicule: Vehicule) => {
        VehiculeService.updateVehicule(vehicule);
    }

    return (
        <>
            <Menu />
            <Toolbar left={leftContents} />

            <form className='location-details' onSubmit={e => handleSubmit(e)}>
                <div className='locataire-vehicule'>
                    <div className='locataire'>
                        <h2 className='title'>Locataire</h2>
                        <h3>Rechercher un locataire</h3>
                        <div className='collection'>
                            <AutoComplete
                                value={selectedLocataire}
                                // Suggestions désactivées cela occasionne un problème lorqu'on clique dessus cela ne prend pas en compte le locataire selectionné
                                // suggestions={filteredLocataires} 
                                completeMethod={searchLocataire}
                                field="email"
                                onChange={e => setSelectedLocataire(e.value)}
                                aria-label="Locataires"
                                placeholder='Email'
                            />
                        </div>

                        {filteredLocataires.length == 1 &&
                            <div className='columns'>
                                <div className='col-1'>
                                    {/* Locataire nom */}
                                    <h3>Nom</h3>
                                    <InputText id='nom' name='nom' value={filteredLocataires[0].nom} />
                                    {/* Locataire prenom */}
                                    <h3>Prénom</h3>
                                    <InputText id='prenom' name='prenom' value={filteredLocataires[0].prenom} />
                                </div>
                                <div className='col-2'>
                                    {/* Locataire email */}
                                    <h3>Email</h3>
                                    <InputText id='email' name='email' value={filteredLocataires[0].email} />
                                    {/* Locataire telephone */}
                                    <h3>Téléphone</h3>
                                    <InputText id='telephone' name='telephone' value={filteredLocataires[0].telephone} />
                                </div>
                            </div>
                        }
                    </div>

                    {vehicule &&
                        <div className='vehicule'>
                            <h2 className='title'>Véhicule</h2>
                            <div className='columns'>
                                <div className='col-1'>
                                    {/* Vehicule marque */}
                                    <h3>Marque</h3>
                                    <InputText id='marque' name='marque' value={vehicule.marque} />
                                    {/* Vehicule modele */}
                                    <h3>Modèle</h3>
                                    <InputText id='modele' name='modele' value={vehicule.modele} />
                                </div>
                                <div className='col-2'>
                                    {/* Vehicule immatriculation */}
                                    <h3>Immatriculation</h3>
                                    <InputText id='immatriculation' name='immatriculation' value={vehicule.immatriculation} />
                                    {/* Vehicule etat */}
                                    <h3>État</h3>
                                    <InputText id='etat' name='etat' value={vehicule.etat} />
                                </div>
                                <div className='col-3'>
                                    {/* Vehicule type */}
                                    <h3>Type</h3>
                                    <InputText id='type' name='type' value={vehicule.type} />
                                    {/* Vehicule prix */}
                                    <h3>Prix</h3>
                                    <InputText id='prix' name='prix' value={vehicule.prix} />
                                </div>
                            </div>
                        </div>
                    }
                </div>

                <div className='location'>
                    <h2 className='title'>Location</h2>
                    <div className='attributs-location'>
                        {/* Location dateDebut */}
                        <h3>Date de Début</h3>
                        <Calendar id="dateDebut" value={dateDebut} dateFormat="dd/mm/yy" placeholder='jj/mm/aaaa' onChange={(e) => setDateDebut(e.value)} />
                        {/* Location dateFin */}
                        <h3>Date de fin</h3>
                        <Calendar id="dateFin" value={dateFin} dateFormat="dd/mm/yy" placeholder='jj/mm/aaaa' onChange={(e) => setDateFin(e.value)}
                        />
                        {/* Location cout */}
                        <h3>Coût</h3>
                        <InputText id='cout' name='cout' value={cout} />
                        <div className='submit-locataire'>
                            {/* Submit button */}
                            <Button className='p-button-info' type='submit' label="Valider" icon="pi pi-check" />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default LouerVehicule;
