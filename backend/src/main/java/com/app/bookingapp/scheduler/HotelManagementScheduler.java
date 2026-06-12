package com.app.bookingapp.scheduler;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.app.bookingapp.models.Hotel;
import com.app.bookingapp.repository.HotelRepository;

import jakarta.annotation.PostConstruct;

@Component
public class HotelManagementScheduler {

    private static final Logger log = LoggerFactory.getLogger(HotelManagementScheduler.class);

    @Value("${hotel.scheduler.storage-path:./hotel_data/}")
    private String dataDir;

    private final HotelRepository hotelRepository;

    public HotelManagementScheduler(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    @PostConstruct
    public void initDirectory() {
        File directory = new File(dataDir);
        if (!directory.exists()) {
            boolean created = directory.mkdirs();
            if (created) {
                log.info("[SCHEDULER SETUP] Storage directory created successfully at: {}", dataDir);
            }
        }
    }

    /**
     * PEAK CALENDAR ALARM: Automatically triggers ONLY on June 12th and June 13th.
     * Fires every 1 minute according to the cron calendar pattern.
     */
    @Scheduled(cron = "${hotel.scheduler.cron-peak}")
    public void generatePeakOccupancyReport() {
        log.info("[PEAK ALARM] High-traffic event date active (June 12/13). Scaling up monitoring...");
        executeReportGeneration();
    }

    /**
     * NORMAL CALENDAR ALARM: Automatically handles the rest of the year.
     * Fires every 10 minutes. Includes a guard check to stand down during peak days.
     */
    @Scheduled(cron = "${hotel.scheduler.cron-normal}")
    public void generateNormalOccupancyReport() {
        java.time.LocalDate today = java.time.LocalDate.now();
        int currentDay = today.getDayOfMonth();
        int currentMonth = today.getMonthValue();
        
        // Stand down if it is currently June 12 or June 13 and let the peak method track it
        if (currentMonth == 6 && (currentDay == 12 || currentDay == 13)) {
            return; 
        }
        
        executeReportGeneration();
    }

    /**
     * Core processing engine to aggregate room availability snapshots and write them to disk.
     */
    private void executeReportGeneration() {
        String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        
        // Safe path construction across Windows and Linux
        Path filePath = Paths.get(dataDir, "occupancy_report_" + timestamp + ".txt");
        String fileName = filePath.toString();

        List<Hotel> hotels = hotelRepository.findAll();

        int totalAvailableRooms = hotels.stream()
                .mapToInt(Hotel::getAvailableRooms)
                .sum();

        int totalRoomsCombined = hotels.stream()
                .mapToInt(Hotel::getTotalRooms)
                .sum();

        try (FileWriter writer = new FileWriter(fileName)) {

            writer.write("=== LIVE HOTEL OCCUPANCY REPORT ===\n");
            writer.write("Generated at: " + new Date() + "\n\n");
            writer.write("Total Hotels: " + hotels.size() + "\n");
            writer.write("Available Rooms: " + totalAvailableRooms + " / " + totalRoomsCombined + "\n");

            log.info("[SCHEDULER] Occupancy report generated successfully: {}", fileName);

        } catch (IOException e) {
            log.error("[SCHEDULER ERROR] Failed to write occupancy report: {}", e.getMessage(), e);
        }
    }

    /**
     * Creates periodic backup logs via standard console streaming architecture.
     */
    @Scheduled(
            fixedDelayString = "${hotel.scheduler.backup-delay}",
            initialDelayString = "${hotel.scheduler.backup-initial-delay}"
    )
    public void backupSystemLogs() {
        try {
            long count = hotelRepository.count();
            log.info("[SYSTEM BACKUP LOG] Database status: OK. Total indexed records: {}", count);
        } catch (Exception e) {
            log.error("[SYSTEM BACKUP LOG ERROR] Health check failed: {}", e.getMessage());
        }
    }
}