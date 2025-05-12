package com.emsi.e_learning_backend.controller;

import com.emsi.e_learning_backend.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "http://localhost:5173")
public class FileUploadController {

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/image")
    @PreAuthorize("hasAuthority('PROFESSOR')")
    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("image") MultipartFile file) {
        try {
            String fileName = fileStorageService.storeFile(file);
            String fileDownloadUri = "/images/courses/" + fileName;

            Map<String, String> response = new HashMap<>();
            response.put("imageUrl", fileDownloadUri);

            return ResponseEntity.ok(response);
        } catch (IOException ex) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Impossible de télécharger l'image: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/image")
    @PreAuthorize("hasAuthority('PROFESSOR')")
    public ResponseEntity<Map<String, String>> deleteImage(@RequestParam("fileName") String fileName) {
        try {
            fileStorageService.deleteFile(fileName);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Image supprimée avec succès");

            return ResponseEntity.ok(response);
        } catch (IOException ex) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Impossible de supprimer l'image: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
