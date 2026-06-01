package com.app.bookingapp.services;

import com.app.bookingapp.models.Hotel;
import com.app.bookingapp.repository.HotelRepository;

import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelServices {

    private final HotelRepository repository;

    public HotelServices(
            HotelRepository repository
    ) {
        this.repository = repository;
    }

    public Hotel saveHotel(
            Hotel hotel
    ) {
        return repository.save(hotel);
    }

    public List<Hotel> getAllHotels() {
        return repository.findAll();
    }

    public Hotel getHotelById(
            Long id
    ) {
        return repository.findById(id)
                .orElseThrow();
    }

    public Hotel updateHotel(
            Long id,
            Hotel hotel
    ) {

        Hotel existing =
                repository.findById(id)
                        .orElseThrow();

        existing.setName(hotel.getName());
        existing.setLocation(hotel.getLocation());
        existing.setAddress(hotel.getAddress());
        existing.setRating(hotel.getRating());
        existing.setPricePerNight(
                hotel.getPricePerNight()
        );
        existing.setAvailableRooms(
                hotel.getAvailableRooms()
        );
        existing.setTotalRooms(
                hotel.getTotalRooms()
        );
        existing.setDescription(
                hotel.getDescription()
        );
        existing.setAmenities(
                hotel.getAmenities()
        );
        existing.setContactNumber(
                hotel.getContactNumber()
        );
        existing.setEmail(
                hotel.getEmail()
        );

        return repository.save(existing);
    }

    public void deleteHotel(
            Long id
    ) {
        repository.deleteById(id);
    }

    public Page<Hotel> getHotelsWithPagination(
            int page,
            int size
    ) {
        Pageable pageable =
                PageRequest.of(page, size);

        return repository.getAllHotels(
                pageable
        );
    }

    public List<Hotel> getHotelsWithSorting(
            String field
    ) {
        return repository.findAll(
                Sort.by(field)
        );
    }

    public Page<Hotel>
    getHotelsWithPaginationAndSorting(
            int page,
            int size,
            String field
    ) {

        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        Sort.by(field)
                );

        return repository.findAll(
                pageable
        );
    }

    public List<Hotel> getHotelsByLocation(
            String location
    ) {
        return repository.findHotelsByLocation(
                location
        );
    }

    public List<Hotel> getHotelsByRating(
            double rating
    ) {
        return repository.findHotelsByRating(
                rating
        );
    }

    public List<Hotel> getHotelsByPrice(
            double price
    ) {
        return repository.findHotelsByPrice(
                price
        );
    }

    public int updatePrice(
            Long id,
            double price
    ) {
        return repository.updatePrice(
                id,
                price
        );
    }

    public int updateRating(
            Long id,
            double rating
    ) {
        return repository.updateRating(
                id,
                rating
        );
    }
}