import React, { useState } from 'react';
import { categoryColors } from './constants';
import Modal from './Modal';

const ExpenseForm = ({ onAddExpense }) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');
    const [description, setDescription] = useState('');
    const [modalMessage, setModalMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!amount || !category) {
            setModalMessage("Please fill out both Amount and Category fields.");
            return;
        }

        const newExpense = {
            id: Date.now(),
            amount: parseFloat(amount),
            category: category,
            description: description,
            timestamp: new Date().toISOString()
        };

        onAddExpense(newExpense);
        setAmount('');
        setCategory('Food');
        setDescription('');
    };

    return (
        <div className="expense-form-container">
            <h2 className="form-title">Log New Expense</h2>
            <form onSubmit={handleSubmit} className="expense-form">
                <div className="form-group">
                    <label htmlFor="amount" className="form-label">Amount (₹)</label>
                    <input
                        type="number"
                        step="0.01"
                        id="amount"
                        placeholder="e.g., 25.50"
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select
                        id="category"
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="form-input"
                    >
                        {Object.keys(categoryColors).map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="form-label">Description (Optional)</label>
                    <input
                        type="text"
                        id="description"
                        placeholder="e.g., Dinner with friends"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-input"
                    />
                </div>
                <button
                    type="submit"
                    className="submit-button"
                >
                    Add Expense
                </button>
            </form>
            {modalMessage && <Modal message={modalMessage} onClose={() => setModalMessage('')} />}
        </div>
    );
};

export default ExpenseForm;