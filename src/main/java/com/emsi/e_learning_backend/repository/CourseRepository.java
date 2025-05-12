package com.emsi.e_learning_backend.repository;

import com.emsi.e_learning_backend.model.Course;
import com.emsi.e_learning_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByProfessor(User professor);
}