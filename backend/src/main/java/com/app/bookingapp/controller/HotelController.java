package com.app.bookingapp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.bookingapp.models.Hotel;
import com.app.bookingapp.services.HotelServices;

@RestController
@RequestMapping("/api/hotel") 
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}) 
public class HotelController {

    private final HotelServices service;

    public HotelController(HotelServices service) {
        this.service = service;
    }

    // MATCHES: hotelService.addHotel(form)
    @PostMapping
    public Hotel addHotel(@RequestBody Hotel hotel) {
        return service.addHotel(hotel);
    }

    // Handles saving an array/list of hotels from Postman
    @PostMapping("/bulk")
    public ResponseEntity<List<Hotel>> addHotelsBulk(@RequestBody List<Hotel> hotel) {
        List<Hotel> savedHotels = hotel.stream()
                .map(service::addHotel)
                .toList();
        return new ResponseEntity<>(savedHotels, HttpStatus.CREATED);
    }

    // 🚀 UPDATED: Standardized GET mapping that dynamically supports both raw arrays and paginated data queries
    @GetMapping
    public ResponseEntity<?> getHotels(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size
    ) {
        // If the frontend does not send pagination parameters, return everything seamlessly
        if (page == null || size == null) {
            return ResponseEntity.ok(service.getAllHotels());
        }
        
        // Otherwise use your built-in pagination architecture method
        Page<Hotel> paginatedHotels = service.getHotelsWithPagination(page, size);
        return ResponseEntity.ok(paginatedHotels);
    }

    // MATCHES: hotelService.deleteHotel(id)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHotel(@PathVariable Long id) {
        service.deleteHotel(id);
        return ResponseEntity.ok(Map.of("message", "Hotel successfully purged from system inventory"));
    }

    @GetMapping("/{id}")
    public Hotel getHotel(@PathVariable Long id) {
        return service.getHotelById(id);
    }

    @PutMapping("/{id}")
    public Hotel updateHotel(@PathVariable Long id, @RequestBody Hotel hotel) {
        return service.updateHotel(id, hotel);
    }

    // --- Search & Filtering Endpoints ---

    @GetMapping("/location/{location}")
    public List<Hotel> getLocation(@PathVariable String location) {
        return service.getHotelsByLocation(location);
    }

    @GetMapping("/rating/{rating}")
    public List<Hotel> getRating(@PathVariable double rating) {
        return service.getHotelsByRating(rating);
    }

    @GetMapping("/price/{price}")
    public List<Hotel> getPrice(@PathVariable double price) {
        return service.getHotelsByPrice(price);
    }

    // --- Pagination & Sorting Endpoints ---

    @GetMapping("/pagination/{page}/{size}")
    public Page<Hotel> pagination(@PathVariable int page, @PathVariable int size) {
        return service.getHotelsWithPagination(page, size);
    }

    @GetMapping("/sorting/{field}")
    public List<Hotel> sorting(@PathVariable String field) {
        return service.getHotelsWithSorting(field);
    }

    @GetMapping("/paginationAndSorting/{page}/{size}/{field}")
    public Page<Hotel> paginationAndSorting(
            @PathVariable int page, 
            @PathVariable int size, 
            @PathVariable String field) {
        return service.getHotelsWithPaginationAndSorting(page, size, field);
    }

    // --- Specific Attribute Updates ---

    @PatchMapping("/{id}/price/{price}")
    public ResponseEntity<String> updatePrice(@PathVariable Long id, @PathVariable double price) {
        service.updatePrice(id, price);
        return ResponseEntity.ok("Price Updated");
    }

    @PatchMapping("/{id}/rating/{rating}")
    public ResponseEntity<String> updateRating(@PathVariable Long id, @PathVariable double rating) {
        service.updateRating(id, rating);
        return ResponseEntity.ok("Rating Updated");
    }
}