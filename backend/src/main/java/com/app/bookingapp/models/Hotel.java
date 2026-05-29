package com.app.bookingapp.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "hotel")
@NamedQueries({
    @NamedQuery(
        name = "Hotel.findByLocation",
        query = "SELECT h FROM Hotel h WHERE h.location = :location"
    ),
    @NamedQuery(
        name = "Hotel.findByRatingGreater",
        query = "SELECT h FROM Hotel h WHERE h.rating > :rating"
    )
})
@Data
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

    @Column(length = 2000)
    private String description;

    private String amenities;
    private String contactNumber;
    private String email;
}