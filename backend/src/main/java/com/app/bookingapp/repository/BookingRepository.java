package com.app.bookingapp.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.bookingapp.models.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Used by the user dashboard — queries by JWT username
    Page<Booking> findByUsernameIgnoreCase(String username, Pageable pageable);

    // Admin: all bookings paginated
    Page<Booking> findAll(Pageable pageable);

    // Legacy customer name queries
    @Query("SELECT b FROM Booking b ORDER BY b.customerName ASC")
    List<Booking> sortBookingsByCustomerName();

    @Query("SELECT b FROM Booking b JOIN b.hotel h WHERE h.location = :location")
    List<Booking> findBookingsByHotelLocation(@Param("location") String location);

    @Query(value = "SELECT b.* FROM booking b INNER JOIN hotel h ON b.hotel_id = h.id WHERE h.location = ?1", nativeQuery = true)
    List<Booking> findBookingsByLocationNative(String location);

    
}