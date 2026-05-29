package com.app.bookingapp.controller;

import com.app.bookingapp.models.Hotel;
import com.app.bookingapp.services.HotelServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/hotels")
public class HotelController {

    @Autowired
    private HotelServices service;

    @PostMapping("/admin/add")
    public Hotel addHotel(@RequestBody Hotel hotel) {
        return service.saveHotel(hotel);
    }

    @PutMapping("/admin/update/{id}")
    public Hotel updateHotel(@PathVariable Long id, @RequestBody Hotel hotel) {
        return service.updateHotel(id, hotel);
    }

    @DeleteMapping("/admin/delete/{id}")
    public String deleteHotel(@PathVariable Long id) {
        service.deleteHotel(id);
        return "Hotel Deleted";
    }

    @GetMapping
    public List<Hotel> getAllHotels() {
        return service.getAllHotels();
    }

    @GetMapping("/pagination/{page}/{size}")
    public Page<Hotel> getHotelsWithPagination(@PathVariable int page, @PathVariable int size) {
        return service.getHotelsWithPagination(page, size);
    }

    @GetMapping("/sorting/{field}")
    public List<Hotel> getHotelsWithSorting(@PathVariable String field) {
        return service.getHotelsWithSorting(field);
    }

    @GetMapping("/paginationAndSorting/{page}/{size}/{field}")
    public Page<Hotel> getHotelsWithPaginationAndSorting(
            @PathVariable int page,
            @PathVariable int size,
            @PathVariable String field
    ) {
        return service.getHotelsWithPaginationAndSorting(page, size, field);
    }

    @GetMapping("/location/{location}")
    public List<Hotel> getByLocation(@PathVariable String location) {
        return service.getHotelsByLocation(location);
    }

    @GetMapping("/rating/{rating}")
    public List<Hotel> getByRating(@PathVariable double rating) {
        return service.getHotelsByRating(rating);
    }

    @GetMapping("/price/{price}")
    public List<Hotel> getByPrice(@PathVariable double price) {
        return service.getHotelsByPrice(price);
    }
}