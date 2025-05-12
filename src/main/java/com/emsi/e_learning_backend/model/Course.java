package com.emsi.e_learning_backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private Double price;
    private String imageUrl;
    private String category;
    private String level;
    private String duration;

    @ManyToOne
    @JoinColumn(name = "professor_id")
    private User professor;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "course_id")
    private List<Section> sections = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private Quiz quiz;

    private int enrolledCount = 0;
}