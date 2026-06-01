package com.app.bookingapp.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;

    private int roomsBooked;

    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;
}