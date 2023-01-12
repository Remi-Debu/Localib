package com.localib.location;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.localib.locataire.Locataire;
import com.localib.vehicule.Vehicule;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Data
@Document
@AllArgsConstructor
@NoArgsConstructor
public class Location {
    @Id
    private String id;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateDebut;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateFin;
    @DBRef
    private Locataire locataire;
    @DBRef
    private Vehicule vehicule;

    /**
     * Calcul le prix total pour la location du véhicule,
     * en fonction du nombre de jour que va durer la location
     * et le prix du véhicule pour la journée.
     *
     * @return Double prixTotal: Le prix total de la location d'un véhicule.
     */
    public Double getPrixTotal() {
        Long nbJournee = ChronoUnit.DAYS.between(this.getDateDebut(), this.getDateFin());
        Double prixTotal = nbJournee * this.vehicule.getPrixJournee();
        return prixTotal;
    }

}
