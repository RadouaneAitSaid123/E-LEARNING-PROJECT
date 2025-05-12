package com.emsi.e_learning_backend.service;


import com.emsi.e_learning_backend.dto.*;
import com.emsi.e_learning_backend.model.*;
import com.emsi.e_learning_backend.repository.CourseRepository;
import com.emsi.e_learning_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    public List<CourseDto> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<CourseDto> getCoursesByProfessor() {
        User currentUser = getCurrentUser();
        return courseRepository.findByProfessor(currentUser).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public CourseDto getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));
        return convertToDto(course);
    }

    @Transactional
    public CourseDto createCourse(CourseDto courseDto) {
        User currentUser = getCurrentUser();
        Course course = new Course();
        course.setTitle(courseDto.getTitle());
        course.setDescription(courseDto.getDescription());
        course.setPrice(courseDto.getPrice());
        course.setImageUrl(courseDto.getImageUrl());

        // Nouveaux champs
        course.setCategory(courseDto.getCategory());
        course.setLevel(courseDto.getLevel());
        course.setDuration(courseDto.getDuration());

        // Handle sections
        if (courseDto.getSections() != null) {
            List<Section> sections = courseDto.getSections().stream().map(sectionDto -> {
                Section section = new Section();
                section.setTitle(sectionDto.getTitle());
                section.setContent(sectionDto.getContent());
                return section;
            }).collect(Collectors.toList());
            course.setSections(sections);
        }

        // Handle quiz and questions
        if (courseDto.getQuiz() != null) {
            Quiz quiz = new Quiz();
            if (courseDto.getQuiz().getQuestions() != null) {
                List<Question> questions = courseDto.getQuiz().getQuestions().stream().map(questionDto -> {
                    Question question = new Question();
                    question.setQuestionText(questionDto.getQuestionText());

                    if (questionDto.getChoices() != null) {
                        List<Choice> choices = questionDto.getChoices().stream().map(choiceDto -> {
                            Choice choice = new Choice();
                            choice.setText(choiceDto.getText());
                            choice.setCorrect(choiceDto.isCorrect());
                            return choice;
                        }).collect(Collectors.toList());
                        question.setChoices(choices);
                    }

                    return question;
                }).collect(Collectors.toList());
                quiz.setQuestions(questions);
            }
            course.setQuiz(quiz);
        }
        course.setProfessor(currentUser);
        Course savedCourse = courseRepository.save(course);
        return convertToDto(savedCourse);
    }


    @Transactional
    public CourseDto updateCourse(Long id, CourseDto courseDto) {
        User currentUser = getCurrentUser();
        Course existingCourse = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));

        // Check if the current user is the owner of the course
        if (!existingCourse.getProfessor().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You are not authorized to update this course");
        }

        // Update course fields
        existingCourse.setTitle(courseDto.getTitle());
        existingCourse.setDescription(courseDto.getDescription());
        existingCourse.setPrice(courseDto.getPrice());
        existingCourse.setImageUrl(courseDto.getImageUrl());

        // Update sections
        existingCourse.getSections().clear();
        if (courseDto.getSections() != null) {
            courseDto.getSections().forEach(sectionDto -> {
                Section section = new Section();
                section.setTitle(sectionDto.getTitle());
                section.setContent(sectionDto.getContent());
                existingCourse.getSections().add(section);
            });
        }

        // Update quiz
        if (courseDto.getQuiz() != null) {
            Quiz quiz = existingCourse.getQuiz();
            if (quiz == null) {
                quiz = new Quiz();
                existingCourse.setQuiz(quiz);
            }

            quiz.getQuestions().clear();
            Quiz finalQuiz = quiz;
            if (courseDto.getQuiz().getQuestions() != null) {
                courseDto.getQuiz().getQuestions().forEach(questionDto -> {
                    Question question = new Question();
                    question.setQuestionText(questionDto.getQuestionText());

                    if (questionDto.getChoices() != null) {
                        questionDto.getChoices().forEach(choiceDto -> {
                            Choice choice = new Choice();
                            choice.setText(choiceDto.getText());
                            choice.setCorrect(choiceDto.isCorrect());
                            question.getChoices().add(choice);
                        });
                    }

                    finalQuiz.getQuestions().add(question);
                });
            }
        }

        Course updatedCourse = courseRepository.save(existingCourse);
        return convertToDto(updatedCourse);
    }

    @Transactional
    public void deleteCourse(Long id) {
        User currentUser = getCurrentUser();
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));

        // Check if the current user is the owner of the course
        if (!course.getProfessor().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You are not authorized to delete this course");
        }

        courseRepository.delete(course);
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    CourseDto convertToDto(Course course) {
        CourseDto courseDto = new CourseDto();
        courseDto.setId(course.getId());
        courseDto.setTitle(course.getTitle());
        courseDto.setDescription(course.getDescription());
        courseDto.setPrice(course.getPrice());
        courseDto.setImageUrl(course.getImageUrl());
        courseDto.setEnrolledCount(course.getEnrolledCount());

        if (course.getProfessor() != null) {
            UserDto professorDto = new UserDto();
            professorDto.setId(course.getProfessor().getId());
            professorDto.setFullName(course.getProfessor().getFullName());
            professorDto.setEmail(course.getProfessor().getEmail());
            courseDto.setProfessor(professorDto);
        }

        // Nouveaux champs
        courseDto.setCategory(course.getCategory());
        courseDto.setLevel(course.getLevel());
        courseDto.setDuration(course.getDuration());

        // Convertir les sections
        if (course.getSections() != null) {
            List<SectionDto> sectionDtos = course.getSections().stream().map(section -> {
                SectionDto sectionDto = new SectionDto();
                sectionDto.setId(section.getId());
                sectionDto.setTitle(section.getTitle());
                sectionDto.setContent(section.getContent());
                return sectionDto;
            }).collect(Collectors.toList());
            courseDto.setSections(sectionDtos);
        }

        // Convertir le quiz
        if (course.getQuiz() != null) {
            QuizDto quizDto = new QuizDto();
            quizDto.setId(course.getQuiz().getId());

            if (course.getQuiz().getQuestions() != null) {
                List<QuestionDto> questionDtos = course.getQuiz().getQuestions().stream().map(question -> {
                    QuestionDto questionDto = new QuestionDto();
                    questionDto.setId(question.getId());
                    questionDto.setQuestionText(question.getQuestionText());

                    if (question.getChoices() != null) {
                        List<ChoiceDto> choiceDtos = question.getChoices().stream().map(choice -> {
                            ChoiceDto choiceDto = new ChoiceDto();
                            choiceDto.setId(choice.getId());
                            choiceDto.setText(choice.getText());
                            choiceDto.setCorrect(choice.isCorrect());
                            return choiceDto;
                        }).collect(Collectors.toList());
                        questionDto.setChoices(choiceDtos);
                    }

                    return questionDto;
                }).collect(Collectors.toList());
                quizDto.setQuestions(questionDtos);
            }

            courseDto.setQuiz(quizDto);
        }

        return courseDto;
    }

    private Course convertToEntity(CourseDto courseDto) {
        Course course = new Course();
        course.setTitle(courseDto.getTitle());
        course.setDescription(courseDto.getDescription());
        course.setPrice(courseDto.getPrice());
        course.setImageUrl(courseDto.getImageUrl());

        // Convert sections
        if (courseDto.getSections() != null) {
            courseDto.getSections().forEach(sectionDto -> {
                Section section = new Section();
                section.setTitle(sectionDto.getTitle());
                section.setContent(sectionDto.getContent());
                course.getSections().add(section);
            });
        }

        // Convert quiz
        if (courseDto.getQuiz() != null && courseDto.getQuiz().getQuestions() != null
                && !courseDto.getQuiz().getQuestions().isEmpty()) {
            Quiz quiz = new Quiz();

            courseDto.getQuiz().getQuestions().forEach(questionDto -> {
                Question question = new Question();
                question.setQuestionText(questionDto.getQuestionText());

                if (questionDto.getChoices() != null) {
                    questionDto.getChoices().forEach(choiceDto -> {
                        Choice choice = new Choice();
                        choice.setText(choiceDto.getText());
                        choice.setCorrect(choiceDto.isCorrect());
                        question.getChoices().add(choice);
                    });
                }

                quiz.getQuestions().add(question);
            });

            course.setQuiz(quiz);
        }

        return course;
    }
}