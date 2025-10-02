import React from 'react';

const ConfirmModal = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="confirm-modal-card">
                <div className="modal-content">
                    <h3 className="modal-title">Confirm Deletion</h3>
                    <div className="modal-message-container">
                        <p className="modal-message">Are you sure you want to delete all expenses? This cannot be undone.</p>
                    </div>
                </div>
                <div className="confirm-modal-actions">
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="confirm-button"
                    >
                        Yes, Delete
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="cancel-button"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;