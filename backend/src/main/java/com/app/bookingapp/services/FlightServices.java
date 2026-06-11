package com.app.bookingapp.services;

import com.app.bookingapp.models.Flight;
import com.app.bookingapp.repository.FlightRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class FlightServices {

    private final FlightRepository flightRepository;

    public FlightServices(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    public Page<Flight> getAllFlights(Pageable pageable) {
        return flightRepository.findAll(pageable);
    }

    public void createFlight(String airline, String flightNumber, String departureAirport, String arrivalAirport,
                             LocalDateTime departureTime, LocalDateTime arrivalTime, String duration, Double price,
                             int availableSeats, int totalSeats, String status, String seatType) {
        Flight flight = new Flight();
        flight.setAirline(airline);
        flight.setFlightNumber(flightNumber);
        flight.setDepartureAirport(departureAirport);
        flight.setArrivalAirport(arrivalAirport);
        flight.setDepartureTime(departureTime);
        flight.setArrivalTime(arrivalTime);
        flight.setDuration(duration);
        flight.setPrice(price);
        flight.setAvailableSeats(availableSeats);
        flight.setTotalSeats(totalSeats);
        flight.setStatus(status);
        flight.setSeatType(seatType);
        flightRepository.save(flight);
    }

    public void updateFlight(Long id, String airline, String flightNumber, String departureAirport, String arrivalAirport,
                             LocalDateTime departureTime, LocalDateTime arrivalTime, String duration, Double price,
                             int availableSeats, int totalSeats, String status, String seatType) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flight not found with id: " + id));
        
        flight.setAirline(airline);
        flight.setFlightNumber(flightNumber);
        flight.setDepartureAirport(departureAirport);
        flight.setArrivalAirport(arrivalAirport);
        flight.setDepartureTime(departureTime);
        flight.setArrivalTime(arrivalTime);
        flight.setDuration(duration);
        flight.setPrice(price);
        flight.setAvailableSeats(availableSeats);
        flight.setTotalSeats(totalSeats);
        flight.setStatus(status);
        flight.setSeatType(seatType);
        
        flightRepository.save(flight);
    }

    public void deleteFlight(Long id) {
        if (!flightRepository.existsById(id)) {
            throw new RuntimeException("Flight not found with id: " + id);
        }
        flightRepository.deleteById(id);
    }
}