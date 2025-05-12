package com.emsi.e_learning_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChoiceDto {
    private Long id;
    private String text;
    private boolean isCorrect;
}