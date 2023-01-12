import Location from "../models/location";

export default class LocationService {
    static getLocations(): Promise<Location[]> {
        return fetch('http://localhost:8080/locations')
            .then(res => res.json())
            .catch(err => this.handleError(err));
    }

    static getLocation(id: number): Promise<Location | null> {
        return fetch(`http://localhost:8080/locations/${id}`)
            .then(res => res.json())
            .then(data => this.isEmpty(data) ? null : data)
            .catch(err => this.handleError(err));
    }

    static addLocation(location: Location): Promise<Location> {
        return fetch('http://localhost:8080/locations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(location)
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static isEmpty(data: Object): Boolean {
        return Object.keys(data).length === 0;
    }

    static handleError(error: Error): void {
        console.error(error);
    }
}