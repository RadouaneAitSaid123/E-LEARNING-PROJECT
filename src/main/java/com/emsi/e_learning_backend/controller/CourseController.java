package com.emsi.e_learning_backend.controller;


import com.emsi.e_learning_backend.dto.CourseDto;
import com.emsi.e_learning_backend.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping("/available")
    public ResponseEntity<List<CourseDto>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @GetMapping("/professor")
    public ResponseEntity<List<CourseDto>> getCoursesByProfessor() {
        return ResponseEntity.ok(courseService.getCoursesByProfessor());
    }

    @GetMapping("/available/{id}")
    public ResponseEntity<CourseDto> getCourseById(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getCourseById(id));
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('PROFESSOR')")
    public ResponseEntity<CourseDto> createCourse(@RequestBody CourseDto courseDTO) {
        return new ResponseEntity<>(courseService.createCourse(courseDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('PROFESSOR')")
    public ResponseEntity<CourseDto> updateCourse(@PathVariable Long id, @RequestBody CourseDto courseDTO) {
        return ResponseEntity.ok(courseService.updateCourse(id, courseDTO));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('PROFESSOR')")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }

}