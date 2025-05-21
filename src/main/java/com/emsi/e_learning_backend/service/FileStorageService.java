package com.emsi.e_learning_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    public String storeFile(MultipartFile file) throws IOException {
        // Normaliser le nom du fichier
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        // Ajouter un timestamp pour éviter les doublons
        String uniqueFileName = System.currentTimeMillis() + "_" + fileName;

        // Créer le chemin complet
        Path targetLocation = Paths.get(uploadDir).toAbsolutePath().normalize().resolve(uniqueFileName);

        // S'assurer que le répertoire existe
        Files.createDirectories(targetLocation.getParent());

        // Copier le fichier
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        return uniqueFileName;
    }

    public String storeFile(MultipartFile file, String subdirectory) throws IOException {
        // Normaliser le nom du fichier
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        // Ajouter un timestamp pour éviter les doublons
        String uniqueFileName = System.currentTimeMillis() + "_" + fileName;

        // Créer le chemin complet avec le sous-répertoire
        Path targetLocation = Paths.get(uploadDir, subdirectory).toAbsolutePath().normalize().resolve(uniqueFileName);

        // S'assurer que le répertoire existe
        Files.createDirectories(targetLocation.getParent());

        // Copier le fichier
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        return uniqueFileName;
    }

    public void deleteFile(String fileName) throws IOException {
        Path filePath = Paths.get(uploadDir).toAbsolutePath().normalize().resolve(fileName);
        Files.deleteIfExists(filePath);
    }

    public void deleteFile(String fileName, String subdirectory) throws IOException {
        Path filePath = Paths.get(uploadDir, subdirectory).toAbsolutePath().normalize().resolve(fileName);
        Files.deleteIfExists(filePath);
    }

    public Path getUploadPath(String subdirectory) {
        return Paths.get(uploadDir, subdirectory).toAbsolutePath().normalize();
    }
}
