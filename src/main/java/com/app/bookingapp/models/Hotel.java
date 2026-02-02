package com.app.bookingapp.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;


@Entity
@Data
public class Hotel {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String Location;
    private String address;
    private double rating;
    private double PricePerNight;
    private int availableRooms;
    private int totalRooms;
    private String description;
    private String amenities;
    private String contactNumber;
    private String email;
}
