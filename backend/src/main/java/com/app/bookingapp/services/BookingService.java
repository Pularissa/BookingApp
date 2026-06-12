package com.app.bookingapp.services;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.app.bookingapp.models.Booking;
import com.app.bookingapp.models.Hotel;
import com.app.bookingapp.repository.BookingRepository;
import com.app.bookingapp.repository.HotelRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private HotelRepository hotelRepository;

    // User: fetch only own bookings (by JWT username)
    public Page<Booking> getUserBookings(String username, int page, int size) {
        return bookingRepository.findByUsernameIgnoreCase(
                username, PageRequest.of(page, size, Sort.by("id").descending()));
    }

    // Admin: fetch all bookings paginated
    public Page<Booking> getAllBookings(int page, int size) {
        return bookingRepository.findAll(
                PageRequest.of(page, size, Sort.by("id").descending()));
    }

        

    // Create a booking — links to a hotel by ID, stores username from JWT
    public Booking createBooking(Map<String, Object> payload, String username) {
        Booking booking = new Booking();

        Long hotelId = Long.parseLong(payload.get("hotelId").toString());
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("Hotel not found: " + hotelId));

        booking.setHotel(hotel);
        booking.setUsername(username);
        booking.setCustomerName(username);
        booking.setRoomsBooked(payload.containsKey("roomsBooked")
                ? Integer.parseInt(payload.get("roomsBooked").toString()) : 1);
        booking.setFlightReference(payload.containsKey("flightReference")
                ? payload.get("flightReference").toString() : null);
        booking.setCheckInDate(payload.containsKey("checkInDate")
                ? payload.get("checkInDate").toString() : null);
        booking.setCheckoutDate(payload.containsKey("checkoutDate")
                ? payload.get("checkoutDate").toString() : null);
        booking.setTotalPaid(payload.containsKey("totalPaid")
                ? Double.parseDouble(payload.get("totalPaid").toString()) : null);

        return bookingRepository.save(booking);
    }
}