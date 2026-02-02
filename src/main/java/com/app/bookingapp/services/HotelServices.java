package com.app.bookingapp.services;

import com.app.bookingapp.models.Hotel;
import com.app.bookingapp.repository.HotelRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class HotelServices {

    private final HotelRepository hotelRepository;

    public HotelServices(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    public void createHotel(Hotel hotel) {
        hotelRepository.save(hotel);
    }

    public void updateHotel(Long id, Hotel hotelDetails) {
        Optional<Hotel> hotel = hotelRepository.findById(id);
        if (hotel.isPresent()) {
            Hotel existingHotel = hotel.get();
            existingHotel.setName(hotelDetails.getName());
            existingHotel.setLocation(hotelDetails.getLocation());
            existingHotel.setAddress(hotelDetails.getAddress());
            existingHotel.setRating(hotelDetails.getRating());
            existingHotel.setPricePerNight(hotelDetails.getPricePerNight());
            existingHotel.setAvailableRooms(hotelDetails.getAvailableRooms());
            existingHotel.setTotalRooms(hotelDetails.getTotalRooms());
            existingHotel.setDescription(hotelDetails.getDescription());
            existingHotel.setAmenities(hotelDetails.getAmenities());
            existingHotel.setContactNumber(hotelDetails.getContactNumber());
            existingHotel.setEmail(hotelDetails.getEmail());
            hotelRepository.save(existingHotel);
        }
    }


    public void deleteHotel(Long id) {
        hotelRepository.deleteById(id);
    }
}
