import Vehicule from "../models/vehicule";

export default class VehiculeService {
    static getVehicules(): Promise<Vehicule[]> {
        return fetch('http://localhost:8080/vehicules')
            .then(res => res.json())
            .catch(err => this.handleError(err));
    }

    static getVehicule(id: number): Promise<Vehicule | null> {
        return fetch(`http://localhost:8080/vehicules/${id}`)
            .then(res => res.json())
            .then(data => this.isEmpty(data) ? null : data)
            .catch(err => this.handleError(err));
    }

    static updateVehicule(vehicule: Vehicule): Promise<Vehicule> {
        return fetch(`http://localhost:8080/vehicules/${vehicule.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vehicule)
        })
            .then(res => res.json())
            .catch(err => this.handleError(err));
    }

    static deleteVehicule(vehicule: Vehicule): Promise<{}> {
        return fetch(`http://localhost:8080/vehicules/${vehicule.id}`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => res.json())
            .catch(err => this.handleError(err));
    }

    static addVehicule(vehicule: Vehicule): Promise<Vehicule> {
        return fetch(`http://localhost:8080/vehicules`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vehicule)
        })
            .then(res => res.json())
            .catch(err => this.handleError(err));
    }

    static isEmpty(data: Object): Boolean {
        return Object.keys(data).length === 0;
    }

    static handleError(error: Error): void {
        console.error(error);
    }
}