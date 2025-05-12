package com.emsi.e_learning_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseDto {
    private Long id;
    private String title;
    private String description;
    private Double price;
    private String imageUrl;
    private String category;
    private String level;
    private String duration;
    private List<SectionDto> sections = new ArrayList<>();
    private QuizDto quiz;
    private UserDto professor;
    private int enrolledCount;
}