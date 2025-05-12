package com.emsi.e_learning_backend.repository;

import com.emsi.e_learning_backend.model.Course;
import com.emsi.e_learning_backend.model.Enrollment;
import com.emsi.e_learning_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByStudent(User student);

    Optional<Enrollment> findByCourseAndStudent(Course course, User student);
}