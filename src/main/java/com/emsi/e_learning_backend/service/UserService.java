package com.emsi.e_learning_backend.service;


import com.emsi.e_learning_backend.dto.LoginRequest;
import com.emsi.e_learning_backend.dto.RegisterRequest;
import com.emsi.e_learning_backend.dto.RegisterResponse;
import com.emsi.e_learning_backend.model.Role;
import com.emsi.e_learning_backend.model.User;
import com.emsi.e_learning_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public RegisterResponse register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Create new user
        var user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.valueOf(request.getRole()))
                .build();

        // Save user
        userRepository.save(user);

        // Generate JWT token
        String token;
        try {
            token = jwtService.generateToken(user);
        } catch (Exception ex) {
            System.err.println("JWT generation failed: " + ex.getMessage());
            token = "";
        }

        // Return response
        return RegisterResponse.builder()
                .token(token)
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }

    public RegisterResponse authenticate(LoginRequest request) {
        // Authenticate user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // Get user details
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + request.getEmail()));

        // Generate JWT token
        String token = jwtService.generateToken(user);

        // Return response
        return RegisterResponse.builder()
                .token(token)
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }
}