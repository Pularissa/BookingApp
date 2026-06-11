package com.app.bookingapp.controller;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.bookingapp.models.Flight;
import com.app.bookingapp.services.FlightServices;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class FlightController {

    private final FlightServices flightServices;

    public FlightController(FlightServices flightServices) {
        this.flightServices = flightServices;
    }

    // 🚀 UPDATED: GET ALL FLIGHTS WITH PAGINATION SUPPORT
    @GetMapping
    public ResponseEntity<Page<Flight>> getFlights(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(flightServices.getAllFlights(pageable));
    }

    // ✅ CREATE FLIGHT (ADMIN ONLY via SecurityConfig)
    @PostMapping
    public ResponseEntity<Map<String, String>> createFlight(@RequestBody Flight flight) {
        flightServices.createFlight(
                flight.getAirline(),
                flight.getFlightNumber(),
                flight.getDepartureAirport(),
                flight.getArrivalAirport(),
                flight.getDepartureTime(),
                flight.getArrivalTime(),
                flight.getDuration(),
                flight.getPrice(),
                flight.getAvailableSeats(),
                flight.getTotalSeats(),
                flight.getStatus(),
                flight.getSeatType()
        );

        return new ResponseEntity<>(
                Map.of("message", "Flight successfully registered."),
                HttpStatus.CREATED
        );
    }

    // ✅ UPDATE FLIGHT (ADMIN ONLY)
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, String>> updateFlight(
            @PathVariable Long id,
            @RequestBody Flight flight
    ) {
        flightServices.updateFlight(
                id,
                flight.getAirline(),
                flight.getFlightNumber(),
                flight.getDepartureAirport(),
                flight.getArrivalAirport(),
                flight.getDepartureTime(),
                flight.getArrivalTime(),
                flight.getDuration(),
                flight.getPrice(),
                flight.getAvailableSeats(),
                flight.getTotalSeats(),
                flight.getStatus(),
                flight.getSeatType()
        );

        return ResponseEntity.ok(
                Map.of("message", "Flight updated successfully.")
        );
    }

    // ✅ DELETE FLIGHT (ADMIN ONLY)
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteFlight(@PathVariable Long id) {
        flightServices.deleteFlight(id);
        return ResponseEntity.ok(
                Map.of("message", "Flight deleted successfully.")
        );
    }
}