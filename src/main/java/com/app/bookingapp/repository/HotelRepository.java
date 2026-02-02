package com.app.bookingapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.app.bookingapp.models.Hotel;

public interface HotelRepository extends JpaRepository <Hotel, Long> {

}
