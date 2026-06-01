package com.app.bookingapp.repository;

import com.app.bookingapp.models.Hotel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface HotelRepository
        extends JpaRepository<Hotel, Long>,
        JpaSpecificationExecutor<Hotel> {

    // ==========================
    // JPQL QUERY
    // ==========================

    @Query("SELECT h FROM Hotel h WHERE h.location = :location")
    List<Hotel> findHotelsByLocation(
            @Param("location") String location
    );

    // ==========================
    // NATIVE QUERY
    // ==========================

    @Query(
            value = """
            SELECT * FROM hotels
            WHERE rating >= :rating
            """,
            nativeQuery = true
    )
    List<Hotel> findHotelsByRating(
            @Param("rating") double rating
    );

    // ==========================
    // INDEXED PARAMETER
    // ==========================

    @Query(
            "SELECT h FROM Hotel h WHERE h.pricePerNight <= ?1"
    )
    List<Hotel> findHotelsByPrice(
            double price
    );

    // ==========================
    // NAMED PARAMETER
    // ==========================

    @Query(
            "SELECT h FROM Hotel h WHERE h.name=:name"
    )
    List<Hotel> findByName(
            @Param("name") String name
    );

    // ==========================
    // COLLECTION PARAMETER
    // ==========================

    @Query(
            "SELECT h FROM Hotel h WHERE h.id IN :ids"
    )
    List<Hotel> findHotelsByIds(
            @Param("ids") List<Long> ids
    );

    // ==========================
    // PAGINATION
    // ==========================

    @Query(
            "SELECT h FROM Hotel h"
    )
    Page<Hotel> getAllHotels(
            Pageable pageable
    );

    // ==========================
    // JPQL UPDATE
    // ==========================

    @Transactional
    @Modifying
    @Query("""
           UPDATE Hotel h
           SET h.pricePerNight=:price
           WHERE h.id=:id
           """)
    int updatePrice(
            @Param("id") Long id,
            @Param("price") double price
    );

    // ==========================
    // NATIVE UPDATE
    // ==========================

    @Transactional
    @Modifying
    @Query(
            value = """
                    UPDATE hotels
                    SET rating=:rating
                    WHERE id=:id
                    """,
            nativeQuery = true
    )
    int updateRating(
            @Param("id") Long id,
            @Param("rating") double rating
    );
}