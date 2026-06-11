package com.app.bookingapp.scheduler;

import com.app.bookingapp.models.Flight;
import com.app.bookingapp.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

/**
 * FlightScheduler — auto-updates flight statuses in the database
 * based on real-time departure/arrival logic.
 *
 * Runs every 2 minutes to keep the flight table accurate.
 */
@Component
public class FlightScheduler {

    @Autowired
    private FlightRepository flightRepository;

    /**
     * Every 2 minutes: scan all flights and update their status in the DB.
     * - DEPARTED  → flight has passed departure time but not arrival yet
     * - ARRIVED   → flight arrival time has passed
     * - SCHEDULED → flight not yet departed
     * - CANCELLED → stays as-is (admin must manually set)
     */
    @Scheduled(fixedRate = 120000)
    public void updateFlightStatuses() {
        LocalDateTime now = LocalDateTime.now();
        List<Flight> flights = flightRepository.findAll();
        int updated = 0;

        for (Flight flight : flights) {
            if ("CANCELLED".equalsIgnoreCase(flight.getStatus())) continue;

            String newStatus;
            if (flight.getArrivalTime() != null && now.isAfter(flight.getArrivalTime())) {
                newStatus = "ARRIVED";
            } else if (flight.getDepartureTime() != null && now.isAfter(flight.getDepartureTime())) {
                newStatus = "DEPARTED";
            } else {
                newStatus = "SCHEDULED";
            }

            if (!newStatus.equalsIgnoreCase(flight.getStatus())) {
                flight.setStatus(newStatus);
                flightRepository.save(flight);
                updated++;
                System.out.println("[FLIGHT SCHEDULER] Updated flight " + flight.getFlightNumber()
                        + " → " + newStatus);
            }
        }

        if (updated > 0) {
            System.out.println("[FLIGHT SCHEDULER] Status sync complete. " + updated + " flight(s) updated.");
        }
    }

    /**
     * Every 10 minutes: reduce available seats by 1 for SCHEDULED flights
     * that are departing within 24 hours (simulates seat demand pressure).
     * Only runs if availableSeats > 0.
     */
    @Scheduled(fixedRate = 600000, initialDelay = 60000)
    public void simulateSeatDemand() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime cutoff = now.plusHours(24);
        List<Flight> flights = flightRepository.findAll();

        for (Flight flight : flights) {
            if (!"SCHEDULED".equalsIgnoreCase(flight.getStatus())) continue;
            if (flight.getDepartureTime() == null) continue;
            if (flight.getDepartureTime().isAfter(cutoff)) continue;
            if (flight.getAvailableSeats() <= 0) continue;

            flight.setAvailableSeats(flight.getAvailableSeats() - 1);
            flightRepository.save(flight);
            System.out.println("[FLIGHT SCHEDULER] Seat demand tick on " + flight.getFlightNumber()
                    + " — remaining: " + flight.getAvailableSeats());
        }
    }
}
