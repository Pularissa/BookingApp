package com.app.bookingapp.services;

import com.app.bookingapp.models.Hotel;
import com.app.bookingapp.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HotelServices {

    @Autowired
    private HotelRepository repository;

    public Hotel saveHotel(Hotel hotel) {
        return repository.save(hotel);
    }

    public List<Hotel> getAllHotels() {
        return repository.findAll();
    }

    public Hotel updateHotel(Long id, Hotel hotel) {
        hotel.setId(id);
        return repository.save(hotel);
    }

    public void deleteHotel(Long id) {
        repository.deleteById(id);
    }

    public Page<Hotel> getHotelsWithPagination(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repository.findAll(pageable);
    }

    public List<Hotel> getHotelsWithSorting(String field) {
        return repository.findAll(Sort.by(Sort.Direction.ASC, field));
    }

    public Page<Hotel> getHotelsWithPaginationAndSorting(int page, int size, String field) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, field));
        return repository.findAll(pageable);
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
}