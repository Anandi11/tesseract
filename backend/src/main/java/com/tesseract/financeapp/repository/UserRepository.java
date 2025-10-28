package com.tesseract.financeapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tesseract.financeapp.model.User;
import java.util.Optional;
// Repository for User entity
public interface UserRepository extends JpaRepository<User, Long> {
    // Optional: Find user by email
    Optional<User> findByEmail(String email);
}