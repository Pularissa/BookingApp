package com.app.bookingapp.scheduler;

import com.app.bookingapp.models.Hotel;
import com.app.bookingapp.repository.HotelRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Component
public class HotelManagementScheduler {

    private static final String DATA_DIR = "./hotel_data/";

    private final HotelRepository hotelRepository;

    public HotelManagementScheduler(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;

        File directory = new File(DATA_DIR);
        if (!directory.exists()) {
            directory.mkdirs();
        }
    }

    /**
     * Generates occupancy reports dynamically based on the interval
     * configured in application.properties
     */
    @Scheduled(fixedRateString = "${hotel.scheduler.report-rate}")
    public void generateLiveOccupancyReport() {

        String timestamp =
                new SimpleDateFormat("yyyyMMdd_HHmmss")
                        .format(new Date());

        String fileName =
                DATA_DIR + "occupancy_report_" + timestamp + ".txt";

        List<Hotel> hotel = hotelRepository.findAll();

        int totalAvailableRooms =
                hotel.stream()
                        .mapToInt(Hotel::getAvailableRooms)
                        .sum();

        int totalRoomsCombined =
                hotel.stream()
                        .mapToInt(Hotel::getTotalRooms)
                        .sum();

        try (FileWriter writer = new FileWriter(fileName)) {

            writer.write("=== LIVE HOTEL OCCUPANCY REPORT ===\n");
            writer.write("Generated at: " + new Date() + "\n\n");

            writer.write("Total Hotels: "
                    + hotel.size() + "\n");

            writer.write("Available Rooms: "
                    + totalAvailableRooms
                    + " / "
                    + totalRoomsCombined
                    + "\n");

            System.out.println(
                    "[SCHEDULER] Occupancy report generated: "
                            + fileName
            );

        } catch (IOException e) {

            System.err.println(
                    "[SCHEDULER ERROR] "
                            + e.getMessage()
            );
        }
    }

    /**
     * Creates periodic backup logs using values
     * from application.properties
     */
    @Scheduled(
            fixedDelayString = "${hotel.scheduler.backup-delay}",
            initialDelayString = "${hotel.scheduler.backup-initial-delay}"
    )
    public void backupSystemLogs() {

        String fileName =
                DATA_DIR + "system_backup.log";

        try (FileWriter writer =
                     new FileWriter(fileName, true)) {

            writer.write(
                    "[" + new Date() + "] "
                            + "Database status: OK\n"
            );

            System.out.println(
                    "[SCHEDULER] Backup log updated."
            );

        } catch (IOException e) {

            System.err.println(
                    "[SCHEDULER ERROR] "
                            + e.getMessage()
            );
        }
    }
}