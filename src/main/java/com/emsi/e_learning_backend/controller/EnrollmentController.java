package com.emsi.e_learning_backend.controller;

import com.emsi.e_learning_backend.dto.CourseDto;
import com.emsi.e_learning_backend.dto.EnrollmentDto;
import com.emsi.e_learning_backend.dto.EnrollmentRequest;
import com.emsi.e_learning_backend.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "http://localhost:5173")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    @PostMapping
    @PreAuthorize("hasAuthority('STUDENT')")
    public ResponseEntity<EnrollmentDto> enrollInCourse(@RequestBody EnrollmentRequest request) {
        return new ResponseEntity<>(enrollmentService.enrollStudentInCourse(request.getCourseId()), HttpStatus.CREATED);
    }

    @GetMapping("/student")
    @PreAuthorize("hasAuthority('STUDENT')")
    public ResponseEntity<List<CourseDto>> getEnrolledCourses() {
        return ResponseEntity.ok(enrollmentService.getEnrolledCourses());
    }
}