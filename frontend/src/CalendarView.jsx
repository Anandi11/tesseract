import React, { useState } from 'react';

const CalendarView = ({ expenses, selectedDate, setSelectedDate }) => {
    const [viewDate, setViewDate] = useState(new Date());

    // 🔹 Helper functions
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const daysInMonth = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth());
    const firstDay = getFirstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth());
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // 🔹 Create placeholders for calendar days
    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) calendarDays.push(null);
    for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

    // 🔹 Group totals and expense lists by date
    const dailyTotals = expenses.reduce((acc, exp) => {
        const date = new Date().toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + parseFloat(exp.amount);
        return acc;
    }, {});

    const expensesByDate = expenses.reduce((acc, exp) => {
        const date = new Date().toISOString().split('T')[0];
        if (!acc[date]) acc[date] = [];
        acc[date].push(exp);
        return acc;
    }, {});

    // 🔹 Get selected date’s data
    const selectedDateKey = selectedDate ? selectedDate.toISOString().split('T')[0] : null;
    const selectedExpenses = selectedDateKey ? expensesByDate[selectedDateKey] || [] : [];
    const selectedTotal = selectedExpenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);

    // 🔹 Month Navigation
    const handlePrevMonth = () => {
        setViewDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
        setSelectedDate(null);
    };

    const handleNextMonth = () => {
        setViewDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
        setSelectedDate(null);
    };

    const formatMonthYear = (date) => date.toLocaleString('en-IN', { month: 'long', year: 'numeric' });

    return (
        <div className="calendar-container">
            {/* 🔹 Header */}
            <div className="calendar-header">
                <button onClick={handlePrevMonth} className="calendar-nav-button">
                    <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h2 className="calendar-title">{formatMonthYear(viewDate)}</h2>
                <button onClick={handleNextMonth} className="calendar-nav-button">
                    <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* 🔹 Weekday Names */}
            <div className="calendar-days-of-week">
                {daysOfWeek.map(day => <div key={day} className="day-of-week-cell">{day}</div>)}
            </div>

            {/* 🔹 Calendar Grid */}
            <div className="calendar-grid">
                {calendarDays.map((day, index) => {
                    if (!day) return <div key={index} className="calendar-day-cell empty-day"></div>;

                    const dateKey = new Date(viewDate.getFullYear(), viewDate.getMonth(), day).toISOString().split('T')[0];
                    const total = dailyTotals[dateKey] || 0;
                    const isSelected =
                        selectedDate &&
                        selectedDate.getFullYear() === viewDate.getFullYear() &&
                        selectedDate.getMonth() === viewDate.getMonth() &&
                        selectedDate.getDate() === day;

                    return (
                        <div
                            key={index}
                            className={`calendar-day-cell day-with-content ${isSelected ? 'selected-day' : ''}`}
                            onClick={() => setSelectedDate(new Date(viewDate.getFullYear(), viewDate.getMonth(), day))}
                        >
                            <div className="day-number">{day}</div>
                            {total > 0 && (
                                <div className={`day-total ${isSelected ? 'selected-day-total' : ''}`}>
                                    ₹{total.toFixed(0)}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* 🔹 Selected Date Expense List */}
            {selectedDate && (
                <div className="selected-date-summary">
                    <h3 className="summary-title">
                        Expenses for {selectedDate.toLocaleDateString('en-IN')}
                    </h3>
                    {selectedExpenses.length > 0 ? (
                        <>
                            <p className="summary-amount">Total: ₹{selectedTotal.toFixed(2)}</p>
                            <ul className="expense-list">
                                {selectedExpenses.map((exp, index) => (
                                    <li key={index} className="expense-item">
                                        <span className="expense-category">{exp.category}</span> — 
                                        <span className="expense-desc"> {exp.description || "No description"}</span>
                                        <span className="expense-amount"> ₹{parseFloat(exp.amount).toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p>No expenses recorded on this date.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CalendarView;
