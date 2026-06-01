package com.app.bookingapp.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "hotels")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String location;

    private String address;

    private double rating;

    private double pricePerNight;

    private int availableRooms;

    private int totalRooms;

    @Column(length = 3000)
    private String description;

    private String amenities;

    private String contactNumber;

    private String email;
}