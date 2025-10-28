package com.tesseract.financeapp.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long expense_id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String description;
    private String category;
    private Double amount;
    private LocalDate date;

    // Getters and Setters
    public Long getExpense_id() { return expense_id; }
    public void setExpense_id(Long expense_id) { this.expense_id = expense_id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
}