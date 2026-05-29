package com.app.bookingapp.controller;

import com.app.bookingapp.models.AppUser;
import com.app.bookingapp.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final BCryptPasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public AuthController(BCryptPasswordEncoder encoder, JwtUtil jwtUtil) {
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public String login(@RequestBody AppUser user) {
        // Demo testing credentials rule
        if(user.getUsername().equals("admin") && user.getPassword().equals("admin123")) {
            return jwtUtil.generateToken(user.getUsername());
        }
        return "Invalid Credentials";
    }
}