package com.app.bookingapp.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Maps to the JWT username — used for "my bookings" queries
    private String username;

    private String customerName;

    private int roomsBooked;

    // Linked flight reference (flight number from the flights page)
    private String flightReference;

    private String checkInDate;

    private String checkoutDate;

    private Double totalPaid;

    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;

    // --- Getters & Setters ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public int getRoomsBooked() { return roomsBooked; }
    public void setRoomsBooked(int roomsBooked) { this.roomsBooked = roomsBooked; }

    public String getFlightReference() { return flightReference; }
    public void setFlightReference(String flightReference) { this.flightReference = flightReference; }

    public String getCheckInDate() { return checkInDate; }
    public void setCheckInDate(String checkInDate) { this.checkInDate = checkInDate; }

    public String getCheckoutDate() { return checkoutDate; }
    public void setCheckoutDate(String checkoutDate) { this.checkoutDate = checkoutDate; }

    public Double getTotalPaid() { return totalPaid; }
    public void setTotalPaid(Double totalPaid) { this.totalPaid = totalPaid; }

    public Hotel getHotel() { return hotel; }
    public void setHotel(Hotel hotel) { this.hotel = hotel; }
}