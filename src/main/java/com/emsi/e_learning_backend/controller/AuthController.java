package com.emsi.e_learning_backend.controller;


import com.emsi.e_learning_backend.dto.LoginRequest;
import com.emsi.e_learning_backend.dto.RegisterRequest;
import com.emsi.e_learning_backend.dto.RegisterResponse;
import com.emsi.e_learning_backend.repository.UserRepository;
import com.emsi.e_learning_backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<RegisterResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(userService.authenticate(request));
    }

}
