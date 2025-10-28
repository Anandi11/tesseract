package com.tesseract.financeapp.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.tesseract.financeapp.model.User;
import com.tesseract.financeapp.repository.UserRepository;

import java.util.Optional;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(
    origins = "http://localhost:3000",
    allowedHeaders = "*",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS}
)
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Register new user
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userRepository.save(user);
    }
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody User loginData) {
        Optional<User> user = userRepository.findByEmail(loginData.getEmail());
        Map<String, Object> response = new HashMap<>();

        if (user.isPresent()) {
            User foundUser = user.get();
            if (foundUser.getPassword().equals(loginData.getPassword())) {
                response.put("message", "Login successful!");
                response.put("id", foundUser.getid());
                response.put("email", foundUser.getEmail());
                return ResponseEntity.ok(response);
            } else {
                response.put("message", "Invalid password!");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } else {
            response.put("message", "User not found!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}