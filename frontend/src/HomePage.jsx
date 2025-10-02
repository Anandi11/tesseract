import React from 'react';
import ExpenseForm from './ExpenseForm';

const HomePage = ({ onAddExpense, chartRef }) => {
    return (
        <main className="home-page-container">
            <ExpenseForm onAddExpense={onAddExpense} />
            <div className="home-page-main">
                <div className="chart-section">
                    <h2 className="chart-title">Spending Breakdown by Category</h2>
                    <div className="chart-container">
                        <canvas id="expense-chart" ref={chartRef}></canvas>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default HomePage;