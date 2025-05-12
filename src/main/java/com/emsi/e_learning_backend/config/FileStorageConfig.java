package com.emsi.e_learning_backend.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class FileStorageConfig {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostConstruct
    public void createUploadDirectory() throws IOException {
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(uploadPath);
    }

    @Bean
    public String uploadDir() {
        return uploadDir;
    }
}