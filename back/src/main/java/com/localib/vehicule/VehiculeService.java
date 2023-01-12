package com.localib.vehicule;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface VehiculeService {
    /**
     * Récupère la liste de tout les véhicules.
     *
     * @return Liste des véhicules
     */
    List<Vehicule> findAll();

    /**
     * Récupère le véhicule correspondant à l'id renseigné.
     *
     * @param id du véhicule recherché
     * @return Un véhicule
     */
    Vehicule findById(String id);

    /**
     * Ajoute le véhicule qui a été renseigné dans le body de la requête.
     *
     * @param vehicule renseigné
     * @return Le véhicule qui a été ajouté
     */
    Vehicule save(Vehicule vehicule);

    /**
     * Modifie le véhicule correspondant à l'id renseigné,
     * les modifications sont renseignées dans le body de la requête.
     *
     * @param id       du vehicule que l'on veut modifier
     * @param vehicule avec les modifications
     * @return Le véhicule qui a été ajouté
     */
    Vehicule update(String id, Vehicule vehicule);

    /**
     * Supprime le véhicule correspondant à l'id renseigné.
     *
     * @param id du véhicule que l'on souhaite supprimer
     */
    void deleteById(String id);

    /**
     * Récupère les véhicule correspondant à la marque renseignée.
     *
     * @param marque du véhicule recherché
     * @return List de véhicule
     */
    List<Vehicule> findByMarque(String marque);

    /**
     * Récupère les véhicule correspondant au modele renseigné.
     *
     * @param modele du véhicule recherché
     * @return List de véhicule
     */
    List<Vehicule> findByModele(String modele);

    /**
     * Récupère les véhicule correspondant à l'immatriculation renseignée.
     *
     * @param immatriculation du véhicule recherché
     * @return List de véhicule
     */
    List<Vehicule> findByImmatriculation(String immatriculation);

    /**
     * Récupère les véhicule correspondant à l'etat renseigné.
     *
     * @param etat du véhicule recherché
     * @return List de véhicule
     */
    List<Vehicule> findByEtat(EtatVehicule etat);

    /**
     * Récupère les véhicule correspondant à la disponibilite renseignée.
     *
     * @param disponibilite du véhicule recherché
     * @return List de véhicule
     */
    List<Vehicule> findByDisponibilite(Boolean disponibilite);

    /**
     * Récupère les véhicule correspondant au type renseigné.
     *
     * @param type du véhicule recherché
     * @return List de véhicule
     */
    List<Vehicule> findByType(TypeVehicule type);

    /**
     * Récupère les véhicule dont le prix à la journée est supérieur
     * au prix renseigné.
     *
     * @param prix
     * @return List de véhicule
     */
    List<Vehicule> findAllVehiculePrixSuperieur(Double prix);

    /**
     * Récupère les véhicule dont le prix à la journée est inférieur
     * au prix renseigné.
     *
     * @param prix
     * @return List de véhicule
     */
    List<Vehicule> findAllVehiculePrixInferieur(Double prix);
}
