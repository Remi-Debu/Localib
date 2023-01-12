package com.localib.location;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface LocationService {
    /**
     * Récupère la liste de toutes les locations.
     *
     * @return Liste des locations
     */
    List<Location> findAll();

    /**
     * Récupère la location correspondant à l'id renseigné.
     *
     * @param id de la location recherchée
     * @return Une location
     */
    Location findById(String id);

    /**
     * Ajoute la location qui a été renseignée dans le body de la requête.
     *
     * @param location renseignéé
     * @return La location qui a été ajoutée
     */
    Location save(Location location);

    /**
     * Supprime la location correspondant à l'id renseigné.
     *
     * @param id de la location que l'on souhaite supprimer
     */
    void deleteById(String id);

}
