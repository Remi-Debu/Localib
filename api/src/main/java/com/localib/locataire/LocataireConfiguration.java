package com.localib.locataire;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LocataireConfiguration {
    @Bean
    public LocataireService locataireService(LocataireRepository locataireRepository) {
        return new LocataireServiceImpl(locataireRepository);
    }
}
