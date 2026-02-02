package com.app.bookingapp.controller;

import com.app.bookingapp.models.Hotel;
import com.app.bookingapp.services.HotelServices;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Controller
@RequestMapping("/hotels")
public class HotelController {

    private final HotelServices hotelServices;

    public HotelController(HotelServices hotelServices) {
        this.hotelServices = hotelServices;
    }

    // ---------------- READ ALL ----------------
    @GetMapping
    public String getHotels(Model model) {
        List<Hotel> hotels = hotelServices.getAllHotels();
        model.addAttribute("hotels", hotels);
        return "hotels";
    }

    // ---------------- CREATE ----------------
    @PostMapping("/create")
    public String createHotel(@RequestParam String name,
                              @RequestParam String location,
                              @RequestParam String address,
                              @RequestParam double rating,
                              @RequestParam double pricePerNight,
                              @RequestParam int availableRooms,
                              @RequestParam int totalRooms,
                              @RequestParam String description,
                              @RequestParam String amenities,
                              @RequestParam String contactNumber,
                              @RequestParam String email
                              ) {

        Hotel hotel = new Hotel();
        hotel.setName(name);
        hotel.setLocation(location);
        hotel.setAddress(address);
        hotel.setRating(rating);
        hotel.setPricePerNight(pricePerNight);
        hotel.setAvailableRooms(availableRooms);
        hotel.setTotalRooms(totalRooms);
        hotel.setDescription(description);
        hotel.setAmenities(amenities);
        hotel.setContactNumber(contactNumber);
        hotel.setEmail(email);

        hotelServices.createHotel(hotel);
        return "redirect:/hotels";
    }

    // ---------------- UPDATE ----------------
    @PostMapping("/update")
    public String updateHotel(@RequestParam Long id,
                              @RequestParam String name,
                              @RequestParam String location,
                              @RequestParam String address,
                              @RequestParam double rating,
                              @RequestParam double pricePerNight,
                              @RequestParam int availableRooms,
                              @RequestParam int totalRooms,
                              @RequestParam String description,
                              @RequestParam String amenities,
                              @RequestParam String contactNumber,
                              @RequestParam String email,
                              @RequestParam String imageUrl) {

        Hotel updatedHotel = new Hotel();
        updatedHotel.setName(name);
        updatedHotel.setLocation(location);
        updatedHotel.setAddress(address);
        updatedHotel.setRating(rating);
        updatedHotel.setPricePerNight(pricePerNight);
        updatedHotel.setAvailableRooms(availableRooms);
        updatedHotel.setTotalRooms(totalRooms);
        updatedHotel.setDescription(description);
        updatedHotel.setAmenities(amenities);
        updatedHotel.setContactNumber(contactNumber);
        updatedHotel.setEmail(email);

        hotelServices.updateHotel(id, updatedHotel);
        return "redirect:/hotels";
    }

    // ---------------- DELETE ----------------
    @GetMapping("/delete/{id}")
    public String deleteHotel(@PathVariable Long id) {
        hotelServices.deleteHotel(id);
        return "redirect:/hotels";
    }
}
