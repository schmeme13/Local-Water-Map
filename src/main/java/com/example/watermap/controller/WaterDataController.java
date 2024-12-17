package com.example.watermap.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@RestController
@RequestMapping("/api") // Base endpoint for API routes
public class WaterDataController {

    @GetMapping("/water-locations") // Specific endpoint to fetch water data
    public ResponseEntity<String> getWaterData() throws IOException {
        // Load the JSON file from the "static" folder
        Path jsonPath = new ClassPathResource("static/waterData.json").getFile().toPath();
        String json = new String(Files.readAllBytes(jsonPath));

        return ResponseEntity.ok(json);
    }
}

