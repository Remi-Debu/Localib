package com.localib.location;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("locations")
public class LocationController {
    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("")
    public List<Location> findAll() {
        return locationService.findAll();
    }

    @GetMapping("{id}")
    public Location findById(@PathVariable String id) {
        return locationService.findById(id);
    }

    @PostMapping("")
    public Location save(@RequestBody Location location) {
        return locationService.save(location);
    }

    @DeleteMapping("{id}")
    public void deleteById(@PathVariable String id) {
        locationService.deleteById(id);
    }
}
