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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public int getRoomsBooked() {
        return roomsBooked;
    }

    public void setRoomsBooked(int roomsBooked) {
        this.roomsBooked = roomsBooked;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }
}