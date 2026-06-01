package com.app.bookingapp.repository;

import com.app.bookingapp.models.Booking;
import com.app.bookingapp.models.Hotel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    // ==========================================
    // 2.1 JPQL SELECT
    // ==========================================
    @Query("SELECT b FROM Booking b")
    List<Booking> getAllBookings();

    // ==========================================
    // 2.2 NATIVE SELECT
    // ==========================================
    @Query(value = "SELECT * FROM booking", nativeQuery = true)
    List<Booking> getAllBookingsNative();

    // ==========================================
    // 3.2 JPQL ORDER BY
    // ==========================================
    @Query("SELECT b FROM Booking b ORDER BY b.customerName ASC")
    List<Booking> sortBookings();

    // ==========================================
    // 4.1 JPQL JOIN
    // ==========================================
    @Query("SELECT b FROM Booking b JOIN b.hotel h WHERE h.location=:location")
    List<Booking> findBookingsByHotelLocation(
            @Param("location") String location);

    // ==========================================
    // 4.2 NATIVE JOIN
    // ==========================================
    @Query(
            value="""
      SELECT b.*
      FROM booking b
      INNER JOIN hotel h
      ON b.hotel_id=h.id
      WHERE h.location=?1
      """,
            nativeQuery=true)
    List<Booking> findBookingsByLocationNative(
            String location);

    // ==========================================
    // 5.1 JPQL PAGINATION
    // ==========================================
    @Query("SELECT b FROM Booking b")
    Page<Booking> getBookings(Pageable pageable);

    // ==========================================
    // 5.2 NATIVE PAGINATION
    // ==========================================
    @Query(
            value="SELECT * FROM booking",
            countQuery="SELECT COUNT(*) FROM booking",
            nativeQuery=true)
    Page<Booking> getBookingsNative(Pageable pageable);

    // ==========================================
    // 6.1 INDEXED PARAMETERS JPQL
    // ==========================================
    @Query("SELECT b FROM Booking b WHERE b.customerName=?1")
    List<Booking> findByCustomerName(String name);

    // ==========================================
    // 6.2 INDEXED PARAMETERS NATIVE
    // ==========================================
    @Query(
            value="SELECT * FROM booking WHERE customer_name=?1",
            nativeQuery=true)
    List<Booking> findByCustomerNameNative(String name);

    // ==========================================
    // 7.1 NAMED PARAMETERS JPQL
    // ==========================================
    @Query("SELECT b FROM Booking b WHERE b.customerName=:name")
    List<Booking> findByNameJPQL(
            @Param("name") String name);

    // ==========================================
    // 7.2 NAMED PARAMETERS NATIVE
    // ==========================================
    @Query(
            value="SELECT * FROM booking WHERE customer_name=:name",
            nativeQuery=true)
    List<Booking> findByNameNative(
            @Param("name") String name);

    // ==========================================
    // 8 COLLECTION PARAMETER
    // ==========================================
    @Query("SELECT h FROM Hotel h WHERE h.id IN :ids")
    List<Hotel> findHotelsByIds(
            @Param("ids") List<Long> ids);

    // ==========================================
    // 9.1 JPQL UPDATE
    // ==========================================
    @Modifying
    @Transactional
    @Query(
            "UPDATE Hotel h SET h.pricePerNight=:price WHERE h.id=:id")
    int updatePrice(
            @Param("id") Long id,
            @Param("price") double price);

    // ==========================================
    // 9.2 NATIVE UPDATE
    // ==========================================
    @Modifying
    @Transactional
    @Query(
            value="UPDATE hotel SET rating=:rating WHERE id=:id",
            nativeQuery=true)
    int updateRating(
            @Param("id") Long id,
            @Param("rating") double rating);

    // ==========================================
    // 9.3 INSERT
    // ==========================================
    @Modifying
    @Transactional
    @Query(
            value="""
      INSERT INTO hotel
      (name,location,address,rating,
      price_per_night,available_rooms,total_rooms)
      VALUES
      (:name,:location,:address,:rating,
      :price,:available,:total)
      """,
            nativeQuery=true)
    int insertHotel(
            @Param("name") String name,
            @Param("location") String location,
            @Param("address") String address,
            @Param("rating") double rating,
            @Param("price") double price,
            @Param("available") int available,
            @Param("total") int total);
}