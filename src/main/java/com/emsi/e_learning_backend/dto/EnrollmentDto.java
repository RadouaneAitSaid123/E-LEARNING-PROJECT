package com.emsi.e_learning_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnrollmentDto {
    private Long id;
    private Long courseId;
    private Long studentId;
    private LocalDateTime enrollmentDate;
}