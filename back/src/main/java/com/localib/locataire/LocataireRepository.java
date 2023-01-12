package com.localib.locataire;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocataireRepository extends MongoRepository<Locataire, String> {
    List<Locataire> findByNom(String nom);
    List<Locataire> findByPrenom(String prenom);
    List<Locataire> findByEmail(String email);
    List<Locataire> findByTelephone(String telephone);
}
