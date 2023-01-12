package com.localib.vehicule;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

public class VehiculeServiceImpl implements VehiculeService {
    private static final Logger logger = LoggerFactory.getLogger(VehiculeServiceImpl.class);
    private final VehiculeRepository vehiculeRepository;

    public VehiculeServiceImpl(VehiculeRepository vehiculeRepository) {
        this.vehiculeRepository = vehiculeRepository;
    }

    public List<Vehicule> findAll() {
        return vehiculeRepository.findAll();
    }

    @Override
    public Vehicule findById(String id) {
        return vehiculeRepository.findById(id).orElseThrow(() -> {
            logger.warn("findById Invalide: " + id);
            return new ResponseStatusException(HttpStatus.NOT_FOUND);
        });
    }

    public Vehicule save(Vehicule entity) {
        return vehiculeRepository.save(entity);
    }

    @Override
    public Vehicule update(String id, Vehicule vehicule) {
        if (!this.vehiculeRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Vehicule id invalide " + id);
        }

        return vehiculeRepository.save(vehicule);
    }

    @Override
    public void deleteById(String id) {
        vehiculeRepository.deleteById(id);
    }

    @Override
    public List<Vehicule> findByMarque(String marque) {
        return vehiculeRepository.findByMarque(marque);
    }

    @Override
    public List<Vehicule> findByModele(String modele) {
        return vehiculeRepository.findByModele(modele);
    }

    @Override
    public List<Vehicule> findByImmatriculation(String immatriculation) {
        return vehiculeRepository.findByImmatriculation(immatriculation);
    }

    @Override
    public List<Vehicule> findByEtat(EtatVehicule etat) {
        return vehiculeRepository.findByEtat(etat);
    }

    @Override
    public List<Vehicule> findByDisponibilite(Boolean disponibilite) {
        return vehiculeRepository.findByDisponibilite(disponibilite);
    }

    @Override
    public List<Vehicule> findByType(TypeVehicule type) {
        return vehiculeRepository.findByType(type);
    }

    @Override
    public List<Vehicule> findAllVehiculePrixSuperieur(Double prix) {
        return vehiculeRepository.findAllVehiculePrixSuperieur(prix);
    }

    @Override
    public List<Vehicule> findAllVehiculePrixInferieur(Double prix) {
        return vehiculeRepository.findAllVehiculePrixInferieur(prix);
    }
}
