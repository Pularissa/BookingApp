package com.app.bookingapp.controller;

import com.app.bookingapp.models.Booking;
import com.app.bookingapp.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // GET /api/bookings/my-bookings — User sees only their own bookings
    @GetMapping("/my-bookings")
    public Page<Booking> getMyBookings(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        String username = authentication.getName();
        return bookingService.getUserBookings(username, page, size);
    }

    // GET /api/bookings/all — Admin sees ALL bookings (secured via SecurityConfig)
    @GetMapping("/all")
    public Page<Booking> getAllBookings(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return bookingService.getAllBookings(page, size);
    }

    // POST /api/bookings — Create a new booking (authenticated users)
    @PostMapping
    public ResponseEntity<?> createBooking(
            @RequestBody Map<String, Object> payload,
            Authentication authentication
    ) {
        try {
            String username = authentication.getName();
            Booking booking = bookingService.createBooking(payload, username);
            return new ResponseEntity<>(booking, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}