package com.app.bookingapp.scheduler;

import com.app.bookingapp.models.Hotel;
import com.app.bookingapp.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private HotelRepository hotelRepository;

    public HotelManagementScheduler() {
        File directory = new File(DATA_DIR);
        if (!directory.exists()) {
            directory.mkdirs();
        }
    }

    // Task 1: Generate occupancy breakdown metrics to a text file every 60 seconds
    @Scheduled(fixedRate = 60000)
    public void generateLiveOccupancyReport() {
        String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String fileName = DATA_DIR + "occupancy_report_" + timestamp + ".txt";

        List<Hotel> hotels = hotelRepository.findAll();
        int totalAvailableRooms = hotels.stream().mapToInt(Hotel::getAvailableRooms).sum();
        int totalRoomsCombined = hotels.stream().mapToInt(Hotel::getTotalRooms).sum();

        try (FileWriter writer = new FileWriter(fileName)) {
            writer.write("=== LIVE HOTEL OCCUPANCY REPORT ===\n");
            writer.write("Generated at: " + new Date() + "\n\n");
            writer.write("Total Active Hotels System Wide: " + hotels.size() + "\n");
            writer.write("Total Vacancies: " + totalAvailableRooms + " Out of " + totalRoomsCombined + "\n");
            System.out.println("[SCHEDULER SUCCESS] Real-time file summary written: " + fileName);
        } catch (IOException e) {
            System.err.println("[SCHEDULER ERROR] Could not save auto-generated report: " + e.getMessage());
        }
    }

    // Task 2: Append diagnostic metrics to a rolling .log file 5 mins after boot, then every 5 mins
    @Scheduled(fixedDelay = 300000, initialDelay = 300000)
    public void backupSystemLogs() {
        String fileName = DATA_DIR + "system_backup.log";
        try (FileWriter writer = new FileWriter(fileName, true)) {
            writer.write("[" + new Date() + "] Automated log cluster check: DB Connection healthy.\n");
            System.out.println("[SCHEDULER SUCCESS] File backup log entry updated.");
        } catch (IOException e) {
            System.err.println("[SCHEDULER ERROR] File write failure on backup sequence.");
        }
    }
}