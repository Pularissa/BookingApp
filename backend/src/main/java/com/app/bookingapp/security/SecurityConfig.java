package com.app.bookingapp.security;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            // CORS
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // CSRF OFF (JWT apps use this)
            .csrf(csrf -> csrf.disable())

            // AUTH RULES (ROLE BASED)
            .authorizeHttpRequests(auth -> auth

                // 🔓 Public endpoints
                .requestMatchers("/auth/**").permitAll()
                
                // 🛠️ Dynamic Preflight Rule: Allow browser OPTIONS requests without headers
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // ✈️ FLIGHT RULES
                .requestMatchers(HttpMethod.GET, "/api/flights/**").permitAll() // 🚀 Public browsing allowed

                .requestMatchers(HttpMethod.POST, "/api/flights/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/flights/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/flights/**").hasRole("ADMIN")

                // 🏨 HOTEL RULES
                .requestMatchers(HttpMethod.GET, "/api/hotel/**").permitAll() // 🚀 FIXED: Anyone can now view hotels too!

                .requestMatchers(HttpMethod.POST, "/api/hotel/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/hotel/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/hotel/**").hasRole("ADMIN")

                // 📅 BOOKING RULES (Kept secure so users must log in to finalize spaces)
                .requestMatchers(HttpMethod.GET, "/api/bookings/my-bookings").hasAnyRole("USER", "ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/bookings/all").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/bookings").hasAnyRole("USER", "ADMIN")

                            // 📅 BOOKING RULES
            // 1. View all bookings (Strictly Admin only)
            .requestMatchers(HttpMethod.GET, "/api/bookings/all").hasRole("ADMIN")

            // 2. View personal bookings (Both Users and Admins can view their own lists)
            .requestMatchers(HttpMethod.GET, "/api/bookings/my-bookings").hasAnyRole("USER", "ADMIN")

            // 3. Modifying Bookings (Strictly USER only. Admins can ONLY view and are explicitly locked out from changes)
            .requestMatchers(HttpMethod.POST, "/api/bookings").hasRole("USER")
            .requestMatchers(HttpMethod.PUT, "/api/bookings/**").hasRole("USER")
            .requestMatchers(HttpMethod.DELETE, "/api/bookings/**").hasRole("USER")

                // 🔒 everything else requires login
                .anyRequest().authenticated()
            )

            // Stateless JWT system
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // JWT filter
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // 🌐 CORS CONFIG
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
            Arrays.asList("http://localhost:5173", "http://localhost:3000")
        );

        configuration.setAllowedMethods(
            Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
        );

        // 🚀 CRITICAL: Added "Authorization" header acceptance rules to stop browser lockouts
        configuration.setAllowedHeaders(
            Arrays.asList("Authorization", "Content-Type", "X-Requested-With", "Accept")
        );

        configuration.setExposedHeaders(List.of("Authorization"));

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    // 🔐 PASSWORD ENCODER
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 🔑 AUTH MANAGER
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }
}