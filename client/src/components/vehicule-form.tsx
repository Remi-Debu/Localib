import React, { useState } from 'react'
import Vehicule from './../models/vehicule';
import { useNavigate } from 'react-router-dom';
import VehiculeService from './../services/vehicule-service';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { SelectButton } from 'primereact/selectbutton';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';

type Props = {
    vehicule: Vehicule,
    isEditForm: boolean
};

type Field = {
    error?: string,
    isValid?: boolean
};

type Form = {
    marque: Field,
    modele: Field,
    immatriculation: Field,
    etat: Field,
    prix: Field,
    disponibilite: Field,
    type: Field
}

const VehiculeForm: React.FunctionComponent<Props> = ({ vehicule, isEditForm }) => {
    const navigate = useNavigate();
    const [marque, setMarque] = useState<string>(vehicule.marque);
    const [modele, setModele] = useState<string>(vehicule.modele);
    const [immatriculation, setImmatriculation] = useState<string>(vehicule.immatriculation);
    const [etat, setEtat] = useState<string>(vehicule.etat);
    const [prix, setPrix] = useState<number | null>(vehicule.prix);
    const [disponibilite, setDisponibilite] = useState<string>(vehicule.disponibilite);
    const [type, setType] = useState<string>(vehicule.type);
    const options = ['Oui', 'Non'];
    const [form, setForm] = useState<Form>({
        marque: {},
        modele: {},
        immatriculation: {},
        etat: {},
        prix: {},
        disponibilite: {},
        type: {}
    });

    /**
     * Valide les différents champs du formulaire avec des conditions
     * Pour chaque champ du form on associe un message d'erreur et un booleen pour savoir si il est valide
     * @returns Boolean
     */
    const validateForm = () => {
        let newForm: Form = form;

        // Validation marque
        if (!marque) {
            const errorMsg: string = 'La marque est requise.';
            const newField: Field = { error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ marque: newField } };
        } else {
            const newField: Field = { error: '', isValid: true };
            newForm = { ...newForm, ...{ marque: newField } };
        }

        // Validation modele
        if (!modele) {
            const errorMsg: string = 'Le modèle est requis.';
            const newField: Field = { error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ modele: newField } };
        } else {
            const newField: Field = { error: '', isValid: true };
            newForm = { ...newForm, ...{ modele: newField } };
        }

        // Validation immatriculation
        if (!immatriculation) {
            const errorMsg: string = "L'immatriculation est requise.";
            const newField: Field = { error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ immatriculation: newField } };
        } else {
            const newField: Field = { error: '', isValid: true };
            newForm = { ...newForm, ...{ immatriculation: newField } };
        }

        // Validation etat
        if (!(etat == "A" || etat == "B" || etat == "C" || etat == "D")) {
            const errorMsg: string = "L'état est requis.";
            const newField: Field = { error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ etat: newField } };
        } else {
            const newField: Field = { error: '', isValid: true };
            newForm = { ...newForm, ...{ etat: newField } };
        }

        // Validation prix
        if (prix == 0) {
            const errorMsg: string = 'Le prix est requis.';
            const newField: Field = { error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ prix: newField } };
        } else {
            const newField: Field = { error: '', isValid: true };
            newForm = { ...newForm, ...{ prix: newField } };
        }

        // Validation disponibilite
        if (!(disponibilite == "Oui" || disponibilite == "Non")) {
            const errorMsg: string = 'La disponibilité est requise.';
            const newField: Field = { error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ disponibilite: newField } };
        } else {
            const newField: Field = { error: '', isValid: true };
            newForm = { ...newForm, ...{ disponibilite: newField } };
        }

        // Validation type
        if (!(type == "Voiture" || type == "Camion" || type == "Moto")) {
            const errorMsg: string = 'Le type est requis.';
            const newField: Field = { error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ type: newField } };
        } else {
            const newField: Field = { error: '', isValid: true };
            newForm = { ...newForm, ...{ type: newField } };
        }

        setForm(newForm);

        return newForm.marque.isValid && newForm.modele.isValid && newForm.immatriculation.isValid && newForm.etat.isValid && newForm.prix.isValid && newForm.disponibilite.isValid && newForm.type.isValid;
    }

    /**
     * Appelée lors du submit du formulaire 
     * Si la fonction validateForm retourne true 
     * add ou update un vehicule selon isEditForm (boolean) 
     */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isFormValid = validateForm();

        if (isFormValid) {
            vehicule.marque = marque;
            vehicule.modele = modele;
            vehicule.immatriculation = immatriculation;
            vehicule.etat = etat;
            if (prix) vehicule.prix = prix;
            vehicule.disponibilite = disponibilite;
            vehicule.type = type;
            isEditForm ? updateVehicule() : addVehicule();
        }
    }

    /**
     * Ajoute un vehicule et redirige vers la gestion des vehicules
     */
    const addVehicule = () => {
        VehiculeService.addVehicule(vehicule).then(() => navigate(`/gestion-vehicules`));
    }

    /**
     * Modifie un vehicule et redirige vers la gestion des vehicules
     */
    const updateVehicule = () => {
        VehiculeService.updateVehicule(vehicule).then(() => navigate(`/gestion-vehicules`));
    }

    return (
        <form className='form-vehicule' onSubmit={(e) => handleSubmit(e)}>
            <div className='champ-vehicule'>
                <div className='col1-champ-vehicule'>
                    {/* Vehicule marque */}
                    <h3>Marque</h3>
                    <InputText id='marque' name='marque' value={marque} placeholder="Saisissez la marque" onChange={(e) => setMarque(e.target.value)} />
                    {form.marque.error &&
                        <div style={{ color: "red" }}>
                            {form.marque.error}
                        </div>}
                    {/* Vehicule modele */}
                    <h3>Modèle</h3>
                    <InputText id='modele' name='modele' value={modele} placeholder="Saisissez le modèle" onChange={e => setModele(e.target.value)} />
                    {form.modele.error &&
                        <div style={{ color: "red" }}>
                            {form.modele.error}
                        </div>}
                    {/* Vehicule immatriculation */}
                    <h3>Immatriculation</h3>
                    <InputText id='immatriculation' name='immatriculation' value={immatriculation} placeholder="Saisissez l'immatriculation" onChange={e => setImmatriculation(e.target.value)} />
                    {form.immatriculation.error &&
                        <div style={{ color: "red" }}>
                            {form.immatriculation.error}
                        </div>}
                    {/* Vehicule prix */}
                    <h3>Prix</h3>
                    <InputNumber id='prix' name='prix' value={prix} mode="decimal" locale="fr-FR" minFractionDigits={2} onValueChange={(e) => setPrix(e.value)} />
                    {form.prix.error &&
                        <div style={{ color: "red" }}>
                            {form.prix.error}
                        </div>}
                </div>
                <div className='col2-champ-vehicule'>
                    {/* Vehicule etat */}
                    <h3>État</h3>
                    <div className="field-radiobutton">
                        <RadioButton inputId="a" name="etat" value="A" onChange={(e) => setEtat(e.value)} checked={etat === 'A'} />
                        <label htmlFor="a">A</label>
                    </div>
                    <div className="field-radiobutton">
                        <RadioButton inputId="b" name="etat" value="B" onChange={(e) => setEtat(e.value)} checked={etat === 'B'} />
                        <label htmlFor="b">B</label>
                    </div>
                    <div className="field-radiobutton p-button-info">
                        <RadioButton inputId="c" name="etat" value="C" onChange={(e) => setEtat(e.value)} checked={etat === 'C'} />
                        <label htmlFor="c">C</label>
                    </div>
                    <div className="field-radiobutton">
                        <RadioButton inputId="d" name="etat" value="D" onChange={(e) => setEtat(e.value)} checked={etat === 'D'} />
                        <label htmlFor="d">D</label>
                    </div>
                    {form.etat.error &&
                        <div style={{ color: "red" }}>
                            {form.etat.error}
                        </div>}
                    {/* Vehicule type */}
                    <h3>Type</h3>
                    <div className="field-radiobutton">
                        <RadioButton inputId="voiture" name="type" value="Voiture" onChange={(e) => setType(e.value)} checked={type === 'Voiture'} />
                        <label htmlFor="voiture">Voiture</label>
                    </div>
                    <div className="field-radiobutton">
                        <RadioButton inputId="camion" name="type" value="Camion" onChange={(e) => setType(e.value)} checked={type === 'Camion'} />
                        <label htmlFor="camion">Camion</label>
                    </div>
                    <div className="field-radiobutton">
                        <RadioButton inputId="moto" name="type" value="Moto" onChange={(e) => setType(e.value)} checked={type === 'Moto'} />
                        <label htmlFor="moto">Moto</label>
                    </div>
                    {form.type.error &&
                        <div style={{ color: "red" }}>
                            {form.type.error}
                        </div>}
                    {/* Vehicule disponibilite */}
                    <h3>Disponible</h3>
                    <SelectButton id='disponibilite' name='disponibilite' value={disponibilite} options={options} onChange={(e) => setDisponibilite(e.value)} />
                    {form.disponibilite.error &&
                        <div style={{ color: "red" }}>
                            {form.disponibilite.error}
                        </div>}
                </div>
            </div>
            <div className='submit-vehicule'>
                {/* Submit button */}
                <Button className='p-button-info' type='submit' label="Valider" icon="pi pi-check" />
            </div>
        </form>
    )
}

export default VehiculeForm;
