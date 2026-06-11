package com.app.bookingapp.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        String username = null;
        String jwtToken = null;

        // Extract token from standard "Bearer <token>" formatting header context
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwtToken = authHeader.substring(7);
            try {
                username = jwtUtil.extractUsername(jwtToken);
            } catch (Exception e) {
                logger.error("Failed to parse identity metrics from token payload string: " + e.getMessage());
            }
        }

        // Validate token and inject roles securely into Spring Security Context
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            if (jwtUtil.validateToken(jwtToken, username)) {
                
                // Read role claim directly from the token body wrapper
                String role = jwtUtil.extractRole(jwtToken); 
                
                // Spring security expects role authorities to match the format "ROLE_USER" or "ROLE_ADMIN"
                String formattedRole = role.startsWith("ROLE_") ? role : "ROLE_" + role;

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        username,
                        null,
                        Collections.singletonList(new SimpleGrantedAuthority(formattedRole))
                );

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                
                // Save context mapping registration parameters
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // Continue running next operational pipeline processing block down the request route
        filterChain.doFilter(request, response);
    }
}