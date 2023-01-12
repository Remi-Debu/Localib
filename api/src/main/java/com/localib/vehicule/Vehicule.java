package com.localib.vehicule;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Vehicule {
    @Id
    private String id;
    private String marque;
    private String modele;
    private String immatriculation;
    private EtatVehicule etat;
    private Double prixJournee;
    private Boolean disponibilite;
    private TypeVehicule type;
}
