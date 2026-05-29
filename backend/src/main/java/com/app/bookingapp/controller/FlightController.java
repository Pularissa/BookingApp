package com.app.bookingapp.controller;

import com.app.bookingapp.models.Flight;
import com.app.bookingapp.services.FlightServices;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@Controller
@RequestMapping("/flights")
public class FlightController {
    private final FlightServices flightServices;
    public FlightController(FlightServices flightServices) {
        this.flightServices = flightServices;
    }

    @GetMapping("/flights")
    public String getFlights(Model model) {
        List<Flight> flights = flightServices.getAllFlights();
        model.addAttribute("flights", flights);
        return "flights";
    }

    @PostMapping
    public String createFlight(@RequestParam String airline,
                               @RequestParam String flightNumber,
                               @RequestParam String departureAirport,
                               @RequestParam String arrivalAirport,
                               @RequestParam String departureTime,   // as String
                               @RequestParam String arrivalTime,     // as String
                               @RequestParam String duration,
                               @RequestParam Double price,
                               @RequestParam int availableSeats,
                               @RequestParam int totalSeats,
                               @RequestParam String status,
                               @RequestParam String seatType
    ){
        flightServices.createFlight(
                airline, flightNumber, departureAirport, arrivalAirport,
                LocalDateTime.parse(departureTime),   // parse manually
                LocalDateTime.parse(arrivalTime),
                duration, price, availableSeats, totalSeats, status, seatType);
        return "redirect:/flights";
    }

    @PostMapping("/update")
    public String updateFlight(@RequestParam Long id,
                               @RequestParam String airline,
                               @RequestParam String flightNumber,
                               @RequestParam String departureAirport,
                               @RequestParam String arrivalAirport,
                               @RequestParam String departureTime,
                               @RequestParam String arrivalTime,
                               @RequestParam String duration,
                               @RequestParam Double price,
                               @RequestParam int availableSeats,
                               @RequestParam int totalSeats,
                               @RequestParam String status,
                               @RequestParam String seatType
    ) {
        flightServices.updateFlight(
                id, airline, flightNumber, departureAirport, arrivalAirport,
                LocalDateTime.parse(departureTime),
                LocalDateTime.parse(arrivalTime),
                duration, price, availableSeats, totalSeats, status, seatType
        );
        return "redirect:/flights";
    }

    @GetMapping("/delete/{id}")
    public String deleteFlight(@PathVariable Long id) {
        flightServices.deleteFlight(id);
        return "redirect:/flights";
    }
}
