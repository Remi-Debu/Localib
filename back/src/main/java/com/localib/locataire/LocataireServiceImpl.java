package com.localib.locataire;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

public class LocataireServiceImpl implements LocataireService {
    private static final Logger logger = LoggerFactory.getLogger(LocataireServiceImpl.class);
    private final LocataireRepository locataireRepository;

    public LocataireServiceImpl(LocataireRepository locataireRepository) {
        this.locataireRepository = locataireRepository;
    }

    @Override
    public List<Locataire> findAll() {
        return locataireRepository.findAll();
    }

    @Override
    public Locataire findById(String id) {
        return locataireRepository.findById(id).orElseThrow(() -> {
            logger.warn("findById Invalide: " + id);
            return new ResponseStatusException(HttpStatus.NOT_FOUND);
        });
    }

    public Locataire save(Locataire entity) {
        return locataireRepository.save(entity);
    }

    @Override
    public Locataire update(String id, Locataire locataire) {
        if (!this.locataireRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Locataire id invalide " + id);
        }

        return locataireRepository.save(locataire);
    }

    @Override
    public void deleteById(String id) {
        locataireRepository.deleteById(id);
    }

    @Override
    public List<Locataire> findByNom(String nom) {
        return locataireRepository.findByNom(nom);
    }

    @Override
    public List<Locataire> findByPrenom(String prenom) {
        return locataireRepository.findByPrenom(prenom);
    }

    @Override
    public List<Locataire> findByEmail(String email) {
        return locataireRepository.findByEmail(email);
    }

    @Override
    public List<Locataire> findByTelephone(String telephone) {
        return locataireRepository.findByTelephone(telephone);
    }
}
