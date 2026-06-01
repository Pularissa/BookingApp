package com.app.bookingapp.controller;

import com.app.bookingapp.models.Hotel;
import com.app.bookingapp.services.HotelServices;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hotels")
@CrossOrigin(origins = "http://localhost:5173")
public class HotelController {

    private final HotelServices service;

    public HotelController(
            HotelServices service
    ) {
        this.service = service;
    }

    @PostMapping("/admin/add")
    public Hotel addHotel(
            @RequestBody Hotel hotel
    ) {
        return service.saveHotel(hotel);
    }

    @GetMapping
    public List<Hotel> getAllHotels() {
        return service.getAllHotels();
    }

    @GetMapping("/{id}")
    public Hotel getHotel(
            @PathVariable Long id
    ) {
        return service.getHotelById(id);
    }

    @PutMapping("/admin/update/{id}")
    public Hotel updateHotel(
            @PathVariable Long id,
            @RequestBody Hotel hotel
    ) {
        return service.updateHotel(
                id,
                hotel
        );
    }

    @DeleteMapping("/admin/delete/{id}")
    public String deleteHotel(
            @PathVariable Long id
    ) {
        service.deleteHotel(id);
        return "Hotel Deleted";
    }

    @GetMapping("/location/{location}")
    public List<Hotel> getLocation(
            @PathVariable String location
    ) {
        return service.getHotelsByLocation(
                location
        );
    }

    @GetMapping("/rating/{rating}")
    public List<Hotel> getRating(
            @PathVariable double rating
    ) {
        return service.getHotelsByRating(
                rating
        );
    }

    @GetMapping("/price/{price}")
    public List<Hotel> getPrice(
            @PathVariable double price
    ) {
        return service.getHotelsByPrice(
                price
        );
    }

    @GetMapping("/pagination/{page}/{size}")
    public Page<Hotel> pagination(
            @PathVariable int page,
            @PathVariable int size
    ) {
        return service.getHotelsWithPagination(
                page,
                size
        );
    }

    @GetMapping("/sorting/{field}")
    public List<Hotel> sorting(
            @PathVariable String field
    ) {
        return service.getHotelsWithSorting(
                field
        );
    }

    @GetMapping(
            "/paginationAndSorting/{page}/{size}/{field}"
    )
    public Page<Hotel> paginationAndSorting(
            @PathVariable int page,
            @PathVariable int size,
            @PathVariable String field
    ) {

        return service
                .getHotelsWithPaginationAndSorting(
                        page,
                        size,
                        field
                );
    }

    @PutMapping("/update-price/{id}/{price}")
    public String updatePrice(
            @PathVariable Long id,
            @PathVariable double price
    ) {

        service.updatePrice(
                id,
                price
        );

        return "Price Updated";
    }

    @PutMapping("/update-rating/{id}/{rating}")
    public String updateRating(
            @PathVariable Long id,
            @PathVariable double rating
    ) {

        service.updateRating(
                id,
                rating
        );

        return "Rating Updated";
    }
}