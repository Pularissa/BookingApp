package com.app.bookingapp.controller;

import com.app.bookingapp.models.AppUser;
import com.app.bookingapp.repository.AppUserRepository;
import com.app.bookingapp.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
// Allows your React app on port 3000 to communicate with this API
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AuthController {

    private final AppUserRepository repository;
    private final BCryptPasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public AuthController(
            AppUserRepository repository,
            BCryptPasswordEncoder encoder,
            JwtUtil jwtUtil
    ) {
        this.repository = repository;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

   @PostMapping("/register")
    public AppUser register(@RequestBody AppUser user) {

        user.setPassword(encoder.encode(user.getPassword()));

        if (user.getRole() == null || user.getRole().isBlank()) {
            user.setRole("USER");
        } else {
            user.setRole(user.getRole().toUpperCase());
        }

        return repository.save(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {

        String username = credentials.get("username");
        String password = credentials.get("password");

        AppUser user = repository.findByUsername(username).orElse(null);

        if (user != null && encoder.matches(password, user.getPassword())) {

            String role = user.getRole();

            if (role == null || role.isBlank()) {
                role = "USER";
            }

            role = role.toUpperCase();

            String token = jwtUtil.generateToken(user.getUsername(), role);

            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "role", role,
                    "username", user.getUsername()
            ));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of(
                        "error", "Invalid username or password"
                ));
    }
}