import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Correct import for Chart.js
import ExpenseForm from './ExpenseForm';
import HomePage from './HomePage';
import HistoryPage from './HistoryPage';
import CalendarView from './CalendarView';
import ConfirmModal from './ConfirmModal';
import { categoryColors } from './constants';
import './style.css'; 
import icon from './icon.jpg';

const App = () => {
    const [expenses, setExpenses] = useState([]);
    const [filteredCategory, setFilteredCategory] = useState(null);
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedDate, setSelectedDate] = useState(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    // Load expenses from localStorage on initial render
    useEffect(() => {
        const storedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
        setExpenses(storedExpenses);
    }, []);

    // Save expenses to localStorage whenever the expenses state changes
    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

    // Chart rendering and updating logic
    useEffect(() => {
        if (currentPage !== 'home') {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
            return;
        }

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
            chartInstanceRef.current = null;
        }

        const categoryTotals = expenses.reduce((acc, expense) => {
            const cat = expense.category;
            const amt = parseFloat(expense.amount);
            acc[cat] = acc[cat] ? acc[cat] + amt : amt;
            return acc;
        }, {});

        const labels = Object.keys(categoryTotals);
        const data = Object.values(categoryTotals);
        const backgroundColors = labels.map(label => categoryColors[label] || '#d1d3d3');

        if (labels.length > 0) {
            const ctx = chartRef.current.getContext('2d');
            const newChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: backgroundColors,
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed !== null) {
                                        label += new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(context.parsed);
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            });
            chartInstanceRef.current = newChart;
        }
    }, [expenses, currentPage]);

    const addExpense = (newExpense) => {
        setExpenses(prevExpenses => [newExpense, ...prevExpenses]);
    };

    const deleteExpense = (expenseId) => {
        setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== expenseId));
    };

    const resetData = () => {
        setIsConfirmModalOpen(true);
    };

    const confirmReset = () => {
        setExpenses([]);
        localStorage.removeItem('expenses');
        setIsConfirmModalOpen(false);
    };

    const cancelReset = () => {
        setIsConfirmModalOpen(false);
    };

    const filteredExpenses = filteredCategory ? expenses.filter(exp => exp.category === filteredCategory) : expenses;

    const categoryTotals = expenses.reduce((acc, expense) => {
        const cat = expense.category;
        const amt = parseFloat(expense.amount);
        acc[cat] = acc[cat] ? { total: acc[cat].total + amt, count: acc[cat].count + 1 } : { total: amt, count: 1 };
        return acc;
    }, {});

    const totalAmount = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0).toFixed(2);

    return (
        <div className="app-container">
            <div className="main-content">
                {currentPage === 'home' ? (
                    <header className="main-header">
                        <div className="header-left">
                            <img src={icon} alt="Coin Flow Logo" className="header-icon" />
                            <div>
                                <h1 className="header-title">Tesseract</h1>
                                <p className="header-subtitle">Analyses your finances 4-Dimensionally</p>
                            </div>
                        </div>
                        <div className="header-right">
                            <p className="total-expenses-label">Total Expenses</p>
                            <span className="total-expenses-amount">₹{totalAmount}</span>
                        </div>
                    </header>
                ) : (
                    <header className="main-header">
                        <button
                            onClick={() => setCurrentPage('home')}
                            className="back-button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="back-button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            <span>Back to Home</span>
                        </button>
                        <h1 className="header-title">{currentPage === 'history' ? 'Transaction History' : 'Calendar View'}</h1>
                    </header>
                )}

                <div className="reset-button-container">
                    <button onClick={resetData} className="reset-button">
                        Reset All Data
                    </button>
                </div>

                <div className="navigation-tabs">
                    <button
                        onClick={() => setCurrentPage('home')}
                        className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => setCurrentPage('history')}
                        className={`nav-button ${currentPage === 'history' ? 'active' : ''}`}
                    >
                        Transaction History
                    </button>
                    <button
                        onClick={() => setCurrentPage('calendar')}
                        className={`nav-button ${currentPage === 'calendar' ? 'active' : ''}`}
                    >
                        Calendar View
                    </button>
                </div>

                {currentPage === 'home' && <HomePage onAddExpense={addExpense} chartRef={chartRef} />}
                {currentPage === 'history' && <HistoryPage expenses={expenses} filteredCategory={filteredCategory} setFilteredCategory={setFilteredCategory} deleteExpense={deleteExpense} />}
                {currentPage === 'calendar' && <CalendarView expenses={expenses} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />}
            </div>
            <ConfirmModal isOpen={isConfirmModalOpen} onConfirm={confirmReset} onCancel={cancelReset} />
        </div>
    );
};

export default App;