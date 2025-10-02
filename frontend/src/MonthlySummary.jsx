import React from 'react';

const MonthlySummary = ({ expenses }) => {
    const getMonthlySummary = () => {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        
        const monthlyExpenses = expenses.filter(exp => {
            const expDate = new Date(exp.timestamp);
            return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
        });
        
        const totalMonthlyExpense = monthlyExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0).toFixed(2);
        
        return {
            total: totalMonthlyExpense,
            count: monthlyExpenses.length
        };
    };

    const summary = getMonthlySummary();
    const monthName = new Date().toLocaleString('en-IN', { month: 'long' });

    return (
        <div className="monthly-summary-container">
            <h2 className="monthly-summary-title">Summary for {monthName}</h2>
            <div className="monthly-summary-grid">
                <div className="summary-card">
                    <p className="summary-card-label">Total Expenses</p>
                    <p className="summary-card-value">₹{summary.total}</p>
                </div>
                <div className="summary-card">
                    <p className="summary-card-label">Transactions</p>
                    <p className="summary-card-value">{summary.count}</p>
                </div>
            </div>
        </div>
    );
};

export default MonthlySummary;