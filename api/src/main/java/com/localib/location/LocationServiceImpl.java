package com.localib.location;

import com.localib.vehicule.Vehicule;
import com.localib.vehicule.VehiculeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

public class LocationServiceImpl implements LocationService {
    private static final Logger logger = LoggerFactory.getLogger(LocationServiceImpl.class);
    private final LocationRepository locationRepository;
    private final VehiculeService vehiculeService;

    public LocationServiceImpl(LocationRepository locationRepository, VehiculeService vehiculeService) {
        this.locationRepository = locationRepository;
        this.vehiculeService = vehiculeService;
    }

    @Override
    public List<Location> findAll() {
        return locationRepository.findAll();
    }

    @Override
    public Location findById(String id) {
        return locationRepository.findById(id).orElseThrow(() -> {
            logger.warn("findById Invalide: " + id);
            return new ResponseStatusException(HttpStatus.NOT_FOUND);
        });
    }

    @Override
    public Location save(Location entity) {
        Vehicule vehicule = this.vehiculeService.findById(entity.getVehicule().getId());

        // Vérifie si la date de début est avant la date de fin pour la location
        // et si la disponbilité du véhicule est à true.
        if (entity.getDateDebut().isBefore(entity.getDateFin()) && vehicule.getDisponibilite()) {
            vehicule.setDisponibilite(false);
            this.vehiculeService.update(vehicule.getId(), vehicule);
            entity.setVehicule(vehicule);

            return locationRepository.save(entity);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public void deleteById(String id) {
        locationRepository.deleteById(id);
    }
}
