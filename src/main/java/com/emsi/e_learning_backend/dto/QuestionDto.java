package com.emsi.e_learning_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDto {
    private Long id;
    private String questionText;
    private List<ChoiceDto> choices = new ArrayList<>();
}