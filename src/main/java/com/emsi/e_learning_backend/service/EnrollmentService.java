package com.emsi.e_learning_backend.service;

import com.emsi.e_learning_backend.dto.CourseDto;
import com.emsi.e_learning_backend.dto.EnrollmentDto;
import com.emsi.e_learning_backend.model.Course;
import com.emsi.e_learning_backend.model.Enrollment;
import com.emsi.e_learning_backend.model.User;
import com.emsi.e_learning_backend.repository.CourseRepository;
import com.emsi.e_learning_backend.repository.EnrollmentRepository;
import com.emsi.e_learning_backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EnrollmentService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private CourseService courseService;

    @Transactional
    public EnrollmentDto enrollStudentInCourse(Long courseId) {
        User currentUser = getCurrentUser();
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + courseId));

        // Vérifier si l'étudiant est déjà inscrit
        if (enrollmentRepository.findByCourseAndStudent(course, currentUser).isPresent()) {
            throw new RuntimeException("Student is already enrolled in this course");
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setCourse(course);
        enrollment.setStudent(currentUser);
        enrollment.setEnrollmentDate(LocalDateTime.now());

        // Incrémenter le nombre d'inscrits
        course.setEnrolledCount(course.getEnrolledCount() + 1);
        courseRepository.save(course);

        Enrollment savedEnrollment = enrollmentRepository.save(enrollment);
        return convertToDto(savedEnrollment);
    }

    public List<CourseDto> getEnrolledCourses() {
        User currentUser = getCurrentUser();
        List<Enrollment> enrollments = enrollmentRepository.findByStudent(currentUser);

        return enrollments.stream()
                .map(enrollment -> courseService.convertToDto(enrollment.getCourse()))
                .collect(Collectors.toList());
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private EnrollmentDto convertToDto(Enrollment enrollment) {
        EnrollmentDto dto = new EnrollmentDto();
        dto.setId(enrollment.getId());
        dto.setCourseId(enrollment.getCourse().getId());
        dto.setStudentId(enrollment.getStudent().getId());
        dto.setEnrollmentDate(enrollment.getEnrollmentDate());
        return dto;
    }
}