package com.tesseract.financeapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tesseract.financeapp.model.Expense;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    // Correct way to query by nested property 'user.id'
    List<Expense> findByUser_Id(Long userId);
}