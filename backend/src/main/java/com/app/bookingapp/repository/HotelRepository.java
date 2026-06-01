package com.app.bookingapp.repository;

import com.app.bookingapp.models.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface HotelRepository
        extends JpaRepository<Hotel,Long>,
        JpaSpecificationExecutor<Hotel> {

}