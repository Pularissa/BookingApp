package com.app.bookingapp.services;

import com.app.bookingapp.models.Flight;
import com.app.bookingapp.repository.FlightRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FlightServices {

    private final FlightRepository flightRepository;

    public FlightServices(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    public void createFlight(
             String airline,
             String flightNumber,
             String departureAirport,
             String arrivalAirport,
             LocalDateTime departureTime,
             LocalDateTime arrivalTime,
             String duration,
             Double price,
             int availableSeats,
             int totalSeats,
             String status,
             String seatType
    ) {
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

    public void updateFlight(Long id,
                             String airline,
                             String flightNumber,
                             String departureAirport,
                             String arrivalAirport,
                             LocalDateTime departureTime,
                             LocalDateTime arrivalTime,
                             String duration,
                             Double price,
                             int availableSeats,
                             int totalSeats,
                             String status,
                             String seatType) {
        Flight flight = flightRepository.findById(id).orElseThrow();
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
        flightRepository.deleteById(id);
    }


}
