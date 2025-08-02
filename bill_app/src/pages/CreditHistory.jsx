import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { deleteCreditEntry, fetchCredits, updateCreditEntry } from '../redux/customerSlice';
import ConfirmationPopup from '../component/ConfirmPopup';
import PaymentModal from './PaymentPage';

const CreditHistory = () => {
    const location = useLocation();
    const { customer } = location.state;
    const { id } = customer;
    const dispatch = useDispatch();
    const creditHistory = useSelector(store => store.customer.customersCreditHistory)?.find(val => val.customerId === id)?.history || [];
    const [showConfirm, setShowConfirm] = useState(false);
    const [paymentToDelete, setPaymentToDelete] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [customerDetails, setCustomerDetails] = useState({ ...customer })
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const totalPaid = creditHistory.reduce((sum, payment) => sum + payment.amount, 0);

    const getPaymentTypeBadge = (type) => {
        const colorMap = {
            'upi': { bg: 'bg-primary', icon: 'bi-phone' },
            'cash': { bg: 'bg-success', icon: 'bi-wallet2' },
            'card': { bg: 'bg-warning text-dark', icon: 'bi-credit-card' },
            'bank': { bg: 'bg-info text-dark', icon: 'bi-bank' }
        };
        return colorMap[type] || { bg: 'bg-secondary', icon: 'bi-question-circle' };
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    };

    const handleDeleteClick = (payment) => {
        setPaymentToDelete(payment);
        setShowConfirm(true);
    };

    const handleEditClick = (payment) => {
        setSelectedPayment(payment);
        setShowPaymentModal(true);
    };

    const handleDeletePayment = async () => {
        try {
            await dispatch(deleteCreditEntry({ customerId: id, date: paymentToDelete.date })).unwrap();

            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/credits/get/${id}`);
            dispatch(fetchCredits({ ...data }));

            setPaymentToDelete(null);
            setShowConfirm(false);
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };


    const handlePaymentSubmit = async (cus) => {
        if (cus.amount === 0) {
            setShowPaymentModal(false);
            return;
        };
        try {
            cus.date = selectedPayment.date;
            cus._id = selectedPayment._id;

            setCustomerDetails(prev => ({ ...prev, balance: prev.balance - cus.amount + selectedPayment.amount }))
            await dispatch(updateCreditEntry({ ...cus })).unwrap();

            const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/credits/get/${id}`);

            dispatch(fetchCredits({ ...data.data }));
            setSelectedPayment(null);
            setShowPaymentModal(false);
        } catch (err) {
            console.error("Update failed:", err);
        }
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/credits/get/${id}`);
                dispatch(fetchCredits({ ...data.data }));
            } catch (err) {
                console.error("Error fetching credit history:", err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container-fluid py-3 px-2 px-sm-3">
            <ConfirmationPopup
                show={showConfirm}
                onHide={() => setShowConfirm(false)}
                onConfirm={handleDeletePayment}
                title="Delete Payment"
                message={`Are you sure you want to delete this payment of ₹${paymentToDelete?.amount.toLocaleString('en-IN')}?`}
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
            />

            {showPaymentModal && (
                <PaymentModal
                    customer={customerDetails}
                    onClose={() => {
                        setShowPaymentModal(false);
                        setSelectedPayment(null);
                    }}
                    onSubmit={handlePaymentSubmit}
                    isEditMode={true}
                    updatePayment={selectedPayment}
                />
            )}


            <div className="card shadow-lg border-0 overflow-hidden">
                <div className="card-header bg-gradient-primary text-dark p-3 p-sm-4">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div className="mb-2 mb-sm-0">
                            <h3 className="mb-1 fw-bold fs-4 fs-md-3">
                                <i className="bi bi-credit-card me-2"></i>
                                {"Credit Payment History".toUpperCase()}
                            </h3>
                            <p className="mb-0 opacity-75 small">All payment transactions for this customer</p>
                        </div>
                        <div className="bg-white bg-opacity-10 p-2 p-sm-3 rounded-circle">
                            <i className="bi bi-clock-history fs-3"></i>
                        </div>
                    </div>
                </div>

                <div className="row g-2 g-sm-3 p-2 p-sm-3 bg-light bg-opacity-10">
                    <div className="col-12 col-md-6">
                        <div className="card border-success border-opacity-50 h-100">
                            <div className="card-body p-2 p-sm-3">
                                <div className="d-flex align-items-center">
                                    <div className="bg-success bg-opacity-10 p-2 rounded me-2 me-sm-3">
                                        <i className="bi bi-cash-coin fs-4 fs-sm-3 text-success"></i>
                                    </div>
                                    <div>
                                        <h6 className="mb-1 text-muted small">Total Payments</h6>
                                        <h4 className="mb-0 text-success fw-bold fs-5 fs-sm-4">
                                            ₹{totalPaid.toLocaleString('en-IN')}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="card border-primary border-opacity-50 h-100">
                            <div className="card-body p-2 p-sm-3">
                                <div className="d-flex align-items-center">
                                    <div className="bg-primary bg-opacity-10 p-2 rounded me-2 me-sm-3">
                                        <i className="bi bi-receipt fs-4 fs-sm-3 text-primary"></i>
                                    </div>
                                    <div>
                                        <h6 className="mb-1 text-muted small">Total Transactions</h6>
                                        <h4 className="mb-0 text-primary fw-bold fs-5 fs-sm-4">
                                            {creditHistory.length}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transactions Table */}
                <div className="card-body p-0">
                    {/* Desktop View */}
                    <div className="d-none d-md-block">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="ps-4 py-3" style={{ width: '25%' }}>
                                            <i className="bi bi-calendar-date me-2"></i>
                                            Date & Time
                                        </th>
                                        <th className="py-3" style={{ width: '25%' }}>
                                            <i className="bi bi-credit-card me-2"></i>
                                            Payment Details
                                        </th>
                                        <th className="pe-4 py-3 text-end" style={{ width: '20%' }}>
                                            <i className="bi bi-cash-stack me-2"></i>
                                            Transaction
                                        </th>
                                        <th className="pe-4 py-3 text-end" style={{ width: '30%' }}>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {creditHistory.length > 0 ? (
                                        creditHistory.map((payment, index) => {
                                            const paymentType = getPaymentTypeBadge(payment.paymentMethod);
                                            return (
                                                <tr key={index} className="border-top">
                                                    <td className="ps-4">
                                                        <div className="d-flex align-items-center">
                                                            <div className="bg-light bg-opacity-50 rounded-circle p-2 me-3">
                                                                <i className="bi bi-calendar-check text-primary"></i>
                                                            </div>
                                                            <div>
                                                                <div className="fw-semibold">
                                                                    {formatDate(payment.date).split(',')[0]}
                                                                </div>
                                                                <small className="text-muted">
                                                                    {formatDate(payment.date).split(',')[1].trim()}
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <span className={`badge ${paymentType.bg} rounded-pill px-3 py-2`}>
                                                                <i className={`bi ${paymentType.icon} me-2`}></i>
                                                                {payment.paymentMethod}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="pe-4 text-end">
                                                        <div className="d-flex flex-column align-items-end">
                                                            <span className="fw-bold text-success fs-5">
                                                                +₹{payment.amount.toLocaleString('en-IN')}
                                                            </span>
                                                            {payment.note && (
                                                                <small className="text-muted text-truncate" style={{ maxWidth: '200px' }}>
                                                                    {payment.note}
                                                                </small>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="pe-4 text-end">
                                                        <div className="d-flex justify-content-end gap-2">
                                                            <button
                                                                className="btn btn-sm btn-outline-primary"
                                                                onClick={() => handleEditClick(payment)}
                                                            >
                                                                <i className="bi bi-pencil"></i> Edit
                                                            </button>
                                                            <button
                                                                className="btn btn-sm btn-outline-danger"
                                                                onClick={() => handleDeleteClick(payment)}
                                                            >
                                                                <i className="bi bi-trash"></i> Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-4 text-muted">
                                                <i className="bi bi-inbox fs-1"></i>
                                                <p className="mt-2">No payment history found</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile View */}
                    <div className="d-md-none">
                        {creditHistory.length > 0 ? (
                            creditHistory.map((payment, index) => {
                                const paymentType = getPaymentTypeBadge(payment.paymentMethod);
                                const dateParts = formatDate(payment.date).split(',');
                                return (
                                    <div key={index} className="card border-0 shadow-sm mb-3 mx-2">
                                        <div className="card-body p-3">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <div className="d-flex align-items-center">
                                                    <div className="bg-light bg-opacity-50 rounded-circle p-2 me-2">
                                                        <i className="bi bi-calendar-check text-primary"></i>
                                                    </div>
                                                    <div>
                                                        <div className="fw-semibold small">{dateParts[0]}</div>
                                                        <small className="text-muted">{dateParts[1].trim()}</small>
                                                    </div>
                                                </div>
                                                <span className={`badge ${paymentType.bg} rounded-pill px-2 py-1`}>
                                                    <i className={`bi ${paymentType.icon} me-1`}></i>
                                                    <span>{payment.paymentMethod}</span>
                                                </span>
                                            </div>

                                            {payment.note && (
                                                <div className="mb-2">
                                                    <p className="mb-0 small text-muted text-truncate">
                                                        <i className="bi bi-chat-left-text me-1"></i>
                                                        {payment.note}
                                                    </p>
                                                </div>
                                            )}

                                            <div className="d-flex justify-content-between align-items-center mt-2">
                                                <span className="fw-bold text-success">
                                                    +₹{payment.amount.toLocaleString('en-IN')}
                                                </span>
                                                <div className="d-flex gap-2">
                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() => handleEditClick(payment)}
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => handleDeleteClick(payment)}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-4 text-muted">
                                <i className="bi bi-inbox fs-1"></i>
                                <p className="mt-2">No payment history found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreditHistory;