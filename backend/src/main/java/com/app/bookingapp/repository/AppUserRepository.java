package com.app.bookingapp.repository;

import com.app.bookingapp.models.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserRepository
        extends JpaRepository<AppUser, Long> {

    AppUser findByUsername(String username);
}