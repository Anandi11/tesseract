import React from 'react';

const Modal = ({ message, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-card">
                <div className="modal-content">
                    <div className="modal-icon-container">
                        <svg className="modal-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.458-1.785 1.798-3.14l-6.928-12.002a2 2 0 00-3.596 0L4.318 17.86c-.66 1.355.258 3.14 1.798 3.14z"></path>
                        </svg>
                    </div>
                    <h3 className="modal-title">Error</h3>
                    <div className="modal-message-container">
                        <p className="modal-message">{message}</p>
                    </div>
                </div>
                <div className="modal-actions">
                    <button type="button" onClick={onClose} className="modal-button">
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;