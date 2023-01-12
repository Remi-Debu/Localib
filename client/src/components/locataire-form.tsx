import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Locataire from '../models/locataire';
import LocataireService from '../services/locataire-service';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

type Props = {
    locataire: Locataire,
    isEditForm: boolean
};

type Champ = {
    error?: string,
    isValid?: boolean
};

type Form = {
    nom: Champ,
    prenom: Champ,
    email: Champ,
    telephone: Champ
};

const LocataireForm: React.FunctionComponent<Props> = ({ locataire, isEditForm }) => {
    const navigate = useNavigate();
    const [nom, setNom] = useState<string>(locataire.nom);
    const [prenom, setPrenom] = useState<string>(locataire.prenom);
    const [email, setEmail] = useState<string>(locataire.email);
    const [telephone, setTelephone] = useState<string>(locataire.telephone);
    const [form, setForm] = useState<Form>({ nom: {}, prenom: {}, email: {}, telephone: {} });

    /**
     * Valide les différents champs du formulaire avec des conditions
     * Pour chaque champ du form on associe un message d'erreur et un booleen pour savoir si il est valide
     * @returns Boolean
     */
    const validateForm = () => {
        let newForm: Form = form;

        // Validation nom
        if (!/^[a-zA-Zàéè ]{3,25}$/.test(nom)) {
            const errorMsg: string = 'Le nom est requis (3 à 25 caractères).';
            const newField: Champ = { error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ nom: newField } };
        } else {
            const newField: Champ = { error: '', isValid: true };
            newForm = { ...newForm, ...{ nom: newField } };
        }

        // Validation prenom
        if (!/^[a-zA-Zàéè ]{3,25}$/.test(prenom)) {
            const errorMsg: string = 'Le prénom est requis (3 à 25 caractères).';
            const newField: Champ = { error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ prenom: newField } };
        } else {
            const newField: Champ = { error: '', isValid: true };
            newForm = { ...newForm, ...{ prenom: newField } };
        }

        // Validation email
        if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
            const errorMsg: string = "L'email est requis (exemple@mail.com).";
            const newField: Champ = { error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ email: newField } };
        } else {
            const newField: Champ = { error: '', isValid: true };
            newForm = { ...newForm, ...{ email: newField } };
        }

        // Validation telephone
        if (!/^[0-9]{10}$/.test(telephone)) {
            const errorMsg: string = 'Le téléphone est requis (10 chiffres).';
            const newField: Champ = { error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ telephone: newField } };
        } else {
            const newField: Champ = { error: '', isValid: true };
            newForm = { ...newForm, ...{ telephone: newField } };
        }

        setForm(newForm);

        return newForm.nom.isValid && newForm.prenom.isValid && newForm.email.isValid && newForm.telephone.isValid;
    }

    /**
     * Appelée lors du submit du formulaire 
     * Si la fonction validateForm retourne true 
     * add ou update un locataire selon isEditForm (boolean) 
     */
    const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        const isFormValid = validateForm();

        if (isFormValid) {
            locataire.nom = nom;
            locataire.prenom = prenom;
            locataire.email = email;
            locataire.telephone = telephone;
            isEditForm ? updateLocataire() : addLocataire();
        }
    }

    /**
     * Ajoute un locataire et redirige vers la gestion des locataires
     */
    const addLocataire = () => {
        LocataireService.addLocataire(locataire).then(() => navigate('/gestion-locataires'));
    }

    /**
     * Modifie un locataire et redirige vers la gestion des locataires
     */
    const updateLocataire = () => {
        LocataireService.updateLocataire(locataire).then(() => navigate('/gestion-locataires'));
    }

    return (
        <form className='form-locataire' onSubmit={e => handleSubmit(e)}>
            <div className='champ-locataire'>
                {/* Locataire nom */}
                <h3>Nom</h3>
                <InputText id='nom' name='nom' value={nom} placeholder="Saisissez votre nom" onChange={e => setNom(e.target.value)} />
                {form.nom.error &&
                    <div style={{ color: "red" }}>
                        {form.nom.error}
                    </div>}
                {/* Locataire prenom */}
                <h3>Prénom</h3>
                <InputText id='prenom' name='prenom' value={prenom} placeholder="Saisissez votre prénom" onChange={e => setPrenom(e.target.value)} />
                {form.prenom.error &&
                    <div style={{ color: "red" }}>
                        {form.prenom.error}
                    </div>}
                {/* Locataire email */}
                <h3>Email</h3>
                <InputText id='email' name='email' value={email} placeholder="Saisissez votre email" onChange={e => setEmail(e.target.value)} />
                {form.email.error &&
                    <div style={{ color: "red" }}>
                        {form.email.error}
                    </div>}
                {/* Locataire telephone */}
                <h3>Téléphone</h3>
                <InputText id='telephone' name='telephone' value={telephone} placeholder="Saisissez votre n° de téléphone" onChange={e => setTelephone(e.target.value)} />
                {form.telephone.error &&
                    <div style={{ color: "red" }}>
                        {form.telephone.error}
                    </div>}
            </div>
            <div className='submit-locataire'>
                {/* Submit button */}
                <Button className='p-button-info' type='submit' label="Valider" icon="pi pi-check" />
            </div>
        </form >
    )
}

export default LocataireForm;
