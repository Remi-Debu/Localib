package com.localib.locataire;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface LocataireService {
    /**
     * Récupère la liste de tout les locataires.
     *
     * @return Liste des locataires
     */
    List<Locataire> findAll();

    /**
     * Récupère le locataire correspondant à l'id renseigné.
     *
     * @param id du locataire recherché
     * @return Un locataire
     */
    Locataire findById(String id);

    /**
     * Ajoute le locataire qui a été renseigné dans le body de la requête.
     *
     * @param entity locataire renseigné
     * @return Le locataire qui a été ajouté
     */
    Locataire save(Locataire entity);

    /**
     * Modifie le locataire correspondant à l'id renseigné,
     * les modifications sont renseignées dans le body de la requête.
     *
     * @param id        du locataire que l'on veut modifier
     * @param locataire avec les modifications
     * @return Le locataire qui a été ajouté
     */
    Locataire update(String id, Locataire locataire);

    /**
     * Supprime le locataire correspondant à l'id renseigné.
     *
     * @param id du locataire que l'on souhaite supprimer
     */
    void deleteById(String id);

    /**
     * Récupère les locataires correspondant au nom renseigné.
     *
     * @param nom du locataire recherché
     * @return List de locataire
     */
    List<Locataire> findByNom(String nom);

    /**
     * Récupère les locataires correspondant au prénom renseigné.
     *
     * @param prenom du locataire recherché
     * @return List de locataire
     */
    List<Locataire> findByPrenom(String prenom);

    /**
     * Récupère les locataires correspondant à l'email renseigné.
     *
     * @param email du locataire recherché
     * @return List de locataire
     */
    List<Locataire> findByEmail(String email);

    /**
     * Récupère les locataires correspondant au telephone renseigné.
     *
     * @param telephone du locataire recherché
     * @return List de locataire
     */
    List<Locataire> findByTelephone(String telephone);
}
