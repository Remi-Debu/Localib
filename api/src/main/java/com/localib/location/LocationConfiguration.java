package com.localib.location;

import com.localib.vehicule.VehiculeRepository;
import com.localib.vehicule.VehiculeService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LocationConfiguration {
    @Bean
    public LocationService locationService(LocationRepository locationRepository, VehiculeService vehiculeService) {
        return new LocationServiceImpl(locationRepository, vehiculeService);
    }
}
