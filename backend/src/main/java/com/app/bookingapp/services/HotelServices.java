package com.app.bookingapp.services;

import com.app.bookingapp.models.Hotel;
import com.app.bookingapp.repository.HotelRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HotelServices {

    private final HotelRepository repository;

    public HotelServices(HotelRepository repository) {
        this.repository = repository;
    }

    // Fixed: Named to match HotelController invocations
    public Hotel addHotel(Hotel hotel) {
        return repository.save(hotel);
    }

    public List<Hotel> getAllHotels() {
        return repository.findAll();
    }

    public Hotel getHotelById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found with id: " + id));
    }

    public Hotel updateHotel(Long id, Hotel hotelDetails) {
        Hotel hotel = getHotelById(id);
        hotel.setName(hotelDetails.getName());
        hotel.setLocation(hotelDetails.getLocation());
        hotel.setRating(hotelDetails.getRating());
        hotel.setPricePerNight(hotelDetails.getPricePerNight());
        hotel.setAvailableRooms(hotelDetails.getAvailableRooms());
        hotel.setTotalRooms(hotelDetails.getTotalRooms());
        return repository.save(hotel);
    }

    public void deleteHotel(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Hotel not found with id: " + id);
        }
        repository.deleteById(id);
    }

    public List<Hotel> getHotelsByLocation(String location) {
        return repository.findHotelsByLocation(location);
    }

    public List<Hotel> getHotelsByRating(double rating) {
        return repository.findHotelsByRating(rating);
    }

    public List<Hotel> getHotelsByPrice(double price) {
        return repository.findHotelsByPrice(price);
    }

    public Page<Hotel> getHotelsWithPagination(int page, int size) {
        return repository.findAll(PageRequest.of(page, size));
    }

    public List<Hotel> getHotelsWithSorting(String field) {
        return repository.findAll(Sort.by(Sort.Direction.ASC, field));
    }

    public Page<Hotel> getHotelsWithPaginationAndSorting(int page, int size, String field) {
        return repository.findAll(PageRequest.of(page, size, Sort.by(field)));
    }

    public void updatePrice(Long id, double price) {
        repository.updatePrice(id, price);
    }

    public void updateRating(Long id, double rating) {
        repository.updateRating(id, rating);
    }
}