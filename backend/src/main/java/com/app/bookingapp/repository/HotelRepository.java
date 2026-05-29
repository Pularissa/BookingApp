package com.app.bookingapp.repository;

import com.app.bookingapp.models.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel, Long> {

    // JPQL
    @Query("SELECT h FROM Hotel h WHERE h.location = :location")
    List<Hotel> findHotelsByLocation(@Param("location") String location);

    // Native Query
    @Query(value = "SELECT * FROM hotel WHERE rating >= ?1", nativeQuery = true)
    List<Hotel> findHotelsByRating(double rating);

    // Positional Query
    @Query("SELECT h FROM Hotel h WHERE h.pricePerNight <= ?1")
    List<Hotel> findHotelsByPrice(double price);
}