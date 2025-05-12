package com.emsi.e_learning_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizDto {
    private Long id;
    private List<QuestionDto> questions = new ArrayList<>();
}