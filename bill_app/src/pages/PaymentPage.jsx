import React, { useState } from 'react';

const PaymentModal = ({ customer, onClose, onSubmit, updatePayment, isEditMode }) => {
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');

    const handleSubmit = (e) => {
        e.preventDefault();
        const amt = parseFloat(amount);
        if (amt > customer.balance && !isEditMode) {
            alert("Amount exceeds customer's balance.");
            return;
        } else if (amt > customer.balance + updatePayment?.amount && isEditMode) {
            alert("Amount exceeds customer's balance.");
        } else {
            if (window.confirm("Are you sure you want to proceed with the payment?")) {
                onSubmit({
                    customerId: customer.id,
                    amount: amt,
                    paymentMethod,
                    date: new Date().toISOString()
                });
            } else {
                console.log("Payment cancelled.");
            }
        }
    };


    return (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title fs-5 fs-md-4">Payment for {customer.name}</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body p-3 p-md-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label fw-medium">Current Balance</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    value={`₹${Number(
                                        isEditMode
                                            ? (parseFloat(customer.balance) || 0) + (parseFloat(updatePayment?.amount) || 0)
                                            : (parseFloat(customer.balance) || 0)
                                    ).toFixed(2)}`}
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-medium">Payment Amount (₹)</label>
                                <input
                                    type="number"
                                    className="form-control form-control-lg"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    step="0.01"
                                    min="0.01"
                                    required
                                    placeholder="0.00"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-medium">Payment Method</label>
                                <select
                                    className="form-select form-select-lg"
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                >
                                    <option value="cash">Cash</option>
                                    <option value="card">Card</option>
                                    <option value="upi">UPI</option>
                                    <option value="bank">Bank Transfer</option>
                                </select>
                            </div>

                            <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 mt-4">
                                <button
                                    type="button"
                                    className="btn btn-secondary px-4 py-2"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary px-4 py-2"
                                >
                                    Record Payment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;

