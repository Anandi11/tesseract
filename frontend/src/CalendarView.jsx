import React, { useState } from 'react';

const CalendarView = ({ expenses, selectedDate, setSelectedDate }) => {
    const [viewDate, setViewDate] = useState(new Date());

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
    
    const daysInMonth = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth());
    const firstDay = getFirstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth());
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
        calendarDays.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push(i);
    }

    const dailyTotals = expenses.reduce((acc, exp) => {
        const date = new Date(exp.timestamp).toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + parseFloat(exp.amount);
        return acc;
    }, {});

    const selectedDateExpenses = selectedDate 
        ? dailyTotals[selectedDate.toISOString().split('T')[0]] || 0 
        : null;
    
    const formatMonthYear = (date) => date.toLocaleString('en-IN', { month: 'long', year: 'numeric' });

    const handlePrevMonth = () => {
        setViewDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
        setSelectedDate(null);
    };

    const handleNextMonth = () => {
        setViewDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
        setSelectedDate(null);
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button onClick={handlePrevMonth} className="calendar-nav-button">
                    <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h2 className="calendar-title">{formatMonthYear(viewDate)}</h2>
                <button onClick={handleNextMonth} className="calendar-nav-button">
                    <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>
            <div className="calendar-days-of-week">
                {daysOfWeek.map(day => <div key={day} className="day-of-week-cell">{day}</div>)}
            </div>
            <div className="calendar-grid">
                {calendarDays.map((day, index) => (
                    <div
                        key={index}
                        className={`calendar-day-cell ${day ? 'day-with-content' : 'empty-day'} ${selectedDate && new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()).getDate() === day && selectedDate.getMonth() === viewDate.getMonth() ? 'selected-day' : ''}`}
                        onClick={() => day && setSelectedDate(new Date(viewDate.getFullYear(), viewDate.getMonth(), day))}
                    >
                        {day}
                        {day && dailyTotals[new Date(viewDate.getFullYear(), viewDate.getMonth(), day).toISOString().split('T')[0]] && (
                            <div className={`day-total ${selectedDate && new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()).getDate() === day ? 'selected-day-total' : ''}`}>
                                ₹{dailyTotals[new Date(viewDate.getFullYear(), viewDate.getMonth(), day).toISOString().split('T')[0]].toFixed(0)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {selectedDate && (
                <div className="selected-date-summary">
                    <p className="summary-title">Expenses for {selectedDate.toLocaleDateString()}</p>
                    <p className="summary-amount">
                        ₹{selectedDateExpenses.toFixed(2)}
                    </p>
                </div>
            )}
        </div>
    );
};

export default CalendarView;