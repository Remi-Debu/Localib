package com.localib.vehicule;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehiculeRepository extends MongoRepository<Vehicule, String> {
    List<Vehicule> findByMarque(String marque);

    List<Vehicule> findByModele(String modele);

    List<Vehicule> findByImmatriculation(String immatriculation);

    List<Vehicule> findByEtat(EtatVehicule etat);

    List<Vehicule> findByDisponibilite(Boolean disponibilite);

    List<Vehicule> findByType(TypeVehicule type);

    @Query("{prixJournee : {$gte : ?0} }")
    List<Vehicule> findAllVehiculePrixSuperieur(Double prix);

    @Query("{prixJournee : {$lte : ?0} }")
    List<Vehicule> findAllVehiculePrixInferieur(Double prix);
}
