    package com.localib.vehicule;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("vehicules")
public class VehiculeController {
    private final VehiculeService vehiculeService;

    public VehiculeController(VehiculeService vehiculeService) {
        this.vehiculeService = vehiculeService;
    }

    @GetMapping("")
    public List<Vehicule> findAll() {
        return vehiculeService.findAll();
    }

    @GetMapping("{id}")
    public Vehicule findById(@PathVariable String id) {
        return vehiculeService.findById(id);
    }

    @PostMapping("")
    public Vehicule save(@RequestBody Vehicule vehicule) {
        return vehiculeService.save(vehicule);
    }

    @PutMapping("{id}")
    public Vehicule update(@PathVariable String id, @RequestBody Vehicule vehicule) {
        return vehiculeService.update(id, vehicule);
    }

    @DeleteMapping("{id}")
    public void deleteById(@PathVariable String id) {
        vehiculeService.deleteById(id);
    }

    @GetMapping("marque/{marque}")
    public List<Vehicule> findByMarque(@PathVariable String marque) {
        return vehiculeService.findByMarque(marque);
    }

    @GetMapping("modele/{modele}")
    public List<Vehicule> findByModele(@PathVariable String modele) {
        return vehiculeService.findByModele(modele);
    }

    @GetMapping("immatriculation/{immatriculation}")
    public List<Vehicule> findByImmatriculation(@PathVariable String immatriculation) {
        return vehiculeService.findByImmatriculation(immatriculation);
    }

    @GetMapping("etat/{etat}")
    public List<Vehicule> findByEtat(@PathVariable EtatVehicule etat) {
        return vehiculeService.findByEtat(etat);
    }

    @GetMapping("disponibilite/{disponibilite}")
    public List<Vehicule> findByDisponibilite(@PathVariable Boolean disponibilite) {
        return vehiculeService.findByDisponibilite(disponibilite);
    }

    @GetMapping("type/{type}")
    public List<Vehicule> findByType(@PathVariable TypeVehicule type) {
        return vehiculeService.findByType(type);
    }

    @GetMapping("prixSuperieur")
    public List<Vehicule> findAllVehiculePrixSuperieur(@RequestParam Double prix) {
        return vehiculeService.findAllVehiculePrixSuperieur(prix);
    }

    @GetMapping("prixInferieur")
    public List<Vehicule> findAllVehiculePrixInferieur(@RequestParam Double prix) {
        return vehiculeService.findAllVehiculePrixInferieur(prix);
    }
}
