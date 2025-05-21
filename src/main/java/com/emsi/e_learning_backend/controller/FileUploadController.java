package com.emsi.e_learning_backend.controller;

import com.emsi.e_learning_backend.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
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

    @PostMapping("/video")
    @PreAuthorize("hasAuthority('PROFESSOR')")
    public ResponseEntity<Map<String, Object>> uploadVideo(@RequestParam("video") MultipartFile file) {
        try {
            // Vérifier le type de fichier
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("video/")) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("success", false);
                errorResponse.put("message", "Le fichier doit être une vidéo");
                return ResponseEntity.badRequest().body(errorResponse);
            }

            // Vérifier la taille du fichier (limite à 100MB)
            if (file.getSize() > 100 * 1024 * 1024) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("success", false);
                errorResponse.put("message", "La taille du fichier ne doit pas dépasser 100MB");
                return ResponseEntity.badRequest().body(errorResponse);
            }

            // Stocker le fichier vidéo dans le sous-répertoire "assets/videos"
            String fileName = fileStorageService.storeFile(file, "assets/videos");
            String fileDownloadUri = "/assets/videos/" + fileName;

            // Préparer la réponse
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("filePath", fileDownloadUri);
            response.put("fileName", fileName);
            response.put("mimeType", contentType);
            response.put("size", file.getSize());

            return ResponseEntity.ok(response);
        } catch (IOException ex) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Impossible de télécharger la vidéo: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @DeleteMapping("/video")
    @PreAuthorize("hasAuthority('PROFESSOR')")
    public ResponseEntity<Map<String, Object>> deleteVideo(@RequestParam("fileName") String fileName) {
        try {
            fileStorageService.deleteFile(fileName, "assets/videos");

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Vidéo supprimée avec succès");

            return ResponseEntity.ok(response);
        } catch (IOException ex) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Impossible de supprimer la vidéo: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/check")
    public ResponseEntity<Map<String, Object>> checkUploadConfig() {
        Map<String, Object> status = new HashMap<>();

        String videosPath = fileStorageService.getUploadPath("assets/videos").toString();
        File videosDir = new File(videosPath);

        boolean dirExists = videosDir.exists() && videosDir.isDirectory();
        boolean isWritable = dirExists && videosDir.canWrite();

        status.put("configured", dirExists && isWritable);
        status.put("directory", dirExists ? "exists" : "missing");
        status.put("permissions", isWritable ? "writable" : "not writable");

        return ResponseEntity.ok(status);
    }
}
