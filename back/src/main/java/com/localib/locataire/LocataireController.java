package com.localib.locataire;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("locataires")
public class LocataireController {
    private final LocataireService locataireService;

    public LocataireController(LocataireService locataireService) {
        this.locataireService = locataireService;
    }

    @GetMapping("")
    public List<Locataire> findAll() {
        return locataireService.findAll();
    }

    @GetMapping("{id}")
    public Locataire findById(@PathVariable String id) {
        return locataireService.findById(id);
    }

    @PostMapping("")
    public Locataire save(@RequestBody Locataire entity) {
        return locataireService.save(entity);
    }

    @PutMapping("{id}")
    public Locataire update(@PathVariable String id, @RequestBody Locataire locataire) {
        return locataireService.update(id, locataire);
    }

    @DeleteMapping("{id}")
    public void deleteById(@PathVariable String id) {
        locataireService.deleteById(id);
    }

    @GetMapping("nom/{nom}")
    public List<Locataire> findByNom(@PathVariable String nom) {
        return locataireService.findByNom(nom);
    }

    @GetMapping("prenom/{prenom}")
    public List<Locataire> findByPrenom(@PathVariable String prenom) {
        return locataireService.findByPrenom(prenom);
    }

    @GetMapping("email/{email}")
    public List<Locataire> findByEmail(@PathVariable String email) {
        return locataireService.findByEmail(email);
    }

    @GetMapping("telephone/{telephone}")
    public List<Locataire> findByTelephone(@PathVariable String telephone) {
        return locataireService.findByTelephone(telephone);
    }
}
