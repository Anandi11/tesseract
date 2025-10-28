package com.tesseract.financeapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.tesseract.financeapp.model.Expense;
import com.tesseract.financeapp.repository.ExpenseRepository;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(
    origins = "http://localhost:3000",
    allowedHeaders = "*",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS}
)
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    // Get all expenses
    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    // Get expenses by user ID
    @GetMapping("/user/{id}")
    public List<Expense> getExpensesByUser(@PathVariable Long id) {
        return expenseRepository.findByUser_Id(id);
    }

    // Add a new expense
    @PostMapping("/add")
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseRepository.save(expense);
    }
}