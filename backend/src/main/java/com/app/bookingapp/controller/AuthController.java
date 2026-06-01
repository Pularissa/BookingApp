package com.app.bookingapp.controller;

import com.app.bookingapp.models.AppUser;
import com.app.bookingapp.repository.AppUserRepository;
import com.app.bookingapp.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
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
    public AppUser register(
            @RequestBody AppUser user
    ) {

        user.setPassword(
                encoder.encode(
                        user.getPassword()
                )
        );

        if(user.getRole() == null) {
            user.setRole("USER");
        }

        return repository.save(user);
    }

    @PostMapping("/login")
    public String login(
            @RequestBody AppUser request
    ) {

        AppUser user =
                repository
                        .findByUsername(
                                request.getUsername()
                        )
                        .orElse(null);

        if(user != null &&
                encoder.matches(
                        request.getPassword(),
                        user.getPassword()
                )) {

            return jwtUtil.generateToken(
                    user.getUsername()
            );
        }

        return "Invalid Credentials";
    }
}