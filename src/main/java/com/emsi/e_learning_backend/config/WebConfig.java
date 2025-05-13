package com.emsi.e_learning_backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Gestion des ressources statiques (images préexistantes)
        registry.addResourceHandler("/images/**")
                .addResourceLocations("classpath:/static/images/");

        // Gestion spécifique des images de cours - ajout d'un gestionnaire dédié
        Path coursesPath = Paths.get("./src/main/resources/static/images/courses").toAbsolutePath().normalize();
        registry.addResourceHandler("/images/courses/**")
                .addResourceLocations("file:" + coursesPath.toString() + "/");

        // Gestion des fichiers téléchargés
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + uploadPath.toString() + "/");

        // Logging pour le débogage
        System.out.println("Courses path: " + coursesPath);
        System.out.println("Upload path: " + uploadPath);
    }
}