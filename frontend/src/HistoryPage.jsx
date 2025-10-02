import React from 'react';
import { categoryColors } from './constants';
import MonthlySummary from './MonthlySummary';

const HistoryPage = ({ expenses, filteredCategory, setFilteredCategory, deleteExpense }) => {

    const categoryTotals = expenses.reduce((acc, expense) => {
        const cat = expense.category;
        const amt = parseFloat(expense.amount);
        acc[cat] = acc[cat] ? { total: acc[cat].total + amt, count: acc[cat].count + 1 } : { total: amt, count: 1 };
        return acc;
    }, {});

    const filteredExpenses = filteredCategory ? expenses.filter(exp => exp.category === filteredCategory) : expenses;

    return (
        <div className="history-page-container">
            <MonthlySummary expenses={expenses} />
            <div className="category-tiles-grid">
                {Object.keys(categoryTotals).map(cat => (
                    <div
                        key={cat}
                        className="category-tile"
                        style={{ backgroundColor: categoryColors[cat] }}
                        onClick={() => setFilteredCategory(cat)}
                    >
                        <p className="tile-transaction-count">{categoryTotals[cat].count} Transactions</p>
                        <h3 className="tile-category-name">{cat}</h3>
                        <p className="tile-total-amount">₹{categoryTotals[cat].total.toFixed(2)}</p>
                    </div>
                ))}
            </div>
            <div className="transaction-table-container">
                <div className="table-header-row">
                    <h2 className="table-title">Recent Transactions</h2>
                    {filteredCategory && (
                        <button
                            onClick={() => setFilteredCategory(null)}
                            className="show-all-button"
                        >
                            Show All
                        </button>
                    )}
                </div>
                <div className="table-wrapper">
                    <table className="transaction-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredExpenses.length > 0 ? (
                                filteredExpenses.map(expense => (
                                    <tr key={expense.id}>
                                        <td>{expense.description || '-'}</td>
                                        <td>₹{parseFloat(expense.amount).toFixed(2)}</td>
                                        <td>{expense.category || '-'}</td>
                                        <td>{new Date(expense.timestamp).toLocaleDateString()}</td>
                                        <td>
                                            <button className="delete-button" onClick={() => deleteExpense(expense.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="no-expenses-message">No expenses to display under this category.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;