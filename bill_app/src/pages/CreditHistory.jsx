// import React from 'react';
// import { useSelector } from 'react-redux';
// import { useLocation } from 'react-router-dom';

// const CreditHistory = () => {
//     const location = useLocation();
//     const { id } = location.state;
//     const creditHistory = useSelector(store => store.customer.customersCreditHistory)?.find(val => val.customerId === id)?.history || [];

//     const totalPaid = creditHistory.reduce((sum, payment) => sum + payment.amount, 0);

//     const getPaymentTypeBadge = (type) => {
//         const colorMap = {
//             'upi': { bg: 'bg-primary', icon: 'bi-phone' },
//             'cash': { bg: 'bg-success', icon: 'bi-wallet2' },
//             'card': { bg: 'bg-warning text-dark', icon: 'bi-credit-card' },
//             'bank': { bg: 'bg-info text-dark', icon: 'bi-bank' }
//         };
//         return colorMap[type] || { bg: 'bg-secondary', icon: 'bi-question-circle' };
//     };

//     const formatDate = (dateString) => {
//         const options = { 
//             year: 'numeric', 
//             month: 'short', 
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         };
//         return new Date(dateString).toLocaleDateString('en-IN', options);
//     };

//     return (
//         <div className="container-fluid py-4 px-3">
//             <div className="card shadow-lg border-0 overflow-hidden">
//                 <div className="card-header bg-gradient-primary text-dark p-4">
//                     <div className="d-flex justify-content-between align-items-center">
//                         <div>
//                             <h3 className="mb-1 fw-bold">
//                                 <i className="bi bi-credit-card me-2"></i>
//                                 Credit Payment History
//                             </h3>
//                             <p className="mb-0 opacity-75">All payment transactions for this customer</p>
//                         </div>
//                         <div className="bg-white bg-opacity-10 p-3 rounded-circle">
//                             <i className="bi bi-clock-history fs-2"></i>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="row g-3 p-3 bg-light bg-opacity-10">
//                     <div className="col-md-6">
//                         <div className="card border-success border-opacity-50 h-100">
//                             <div className="card-body p-3">
//                                 <div className="d-flex align-items-center">
//                                     <div className="bg-success bg-opacity-10 p-2 rounded me-3">
//                                         <i className="bi bi-cash-coin fs-3 text-success"></i>
//                                     </div>
//                                     <div>
//                                         <h6 className="mb-1 text-muted">Total Payments</h6>
//                                         <h4 className="mb-0 text-success fw-bold">
//                                             ₹{totalPaid.toLocaleString('en-IN')}
//                                         </h4>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-md-6">
//                         <div className="card border-primary border-opacity-50 h-100">
//                             <div className="card-body p-3">
//                                 <div className="d-flex align-items-center">
//                                     <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
//                                         <i className="bi bi-receipt fs-3 text-primary"></i>
//                                     </div>
//                                     <div>
//                                         <h6 className="mb-1 text-muted">Total Transactions</h6>
//                                         <h4 className="mb-0 text-primary fw-bold">
//                                             {creditHistory.length}
//                                         </h4>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Transactions Table */}
//                 <div className="card-body p-0">
//                     <div className="table-responsive">
//                         <table className="table table-hover align-middle mb-0">
//                             <thead className="table-light">
//                                 <tr>
//                                     <th className="ps-4 py-3" style={{ width: '30%' }}>
//                                         <i className="bi bi-calendar-date me-2"></i>
//                                         Date & Time
//                                     </th>
//                                     <th className="py-3" style={{ width: '30%' }}>
//                                         <i className="bi bi-credit-card me-2"></i>
//                                         Payment Details
//                                     </th>
//                                     <th className="pe-4 py-3 text-end" style={{ width: '40%' }}>
//                                         <i className="bi bi-cash-stack me-2"></i>
//                                         Transaction
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {creditHistory.length > 0 ? (
//                                     creditHistory.map((payment, index) => {
//                                         const paymentType = getPaymentTypeBadge(payment.paymentMethod);
//                                         return (
//                                             <tr key={index} className="border-top">
//                                                 <td className="ps-4">
//                                                     <div className="d-flex align-items-center">
//                                                         <div className="bg-light bg-opacity-50 rounded-circle p-2 me-3">
//                                                             <i className="bi bi-calendar-check text-primary"></i>
//                                                         </div>
//                                                         <div>
//                                                             <div className="fw-semibold">
//                                                                 {formatDate(payment.date).split(',')[0]}
//                                                             </div>
//                                                             <small className="text-muted">
//                                                                 {formatDate(payment.date).split(',')[1].trim()}
//                                                             </small>
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                                 <td>
//                                                     <div className="d-flex align-items-center">
//                                                         <span className={`badge ${paymentType.bg} rounded-pill px-3 py-2`}>
//                                                             <i className={`bi ${paymentType.icon} me-2`}></i>
//                                                             {payment.paymentMethod}
//                                                         </span>
//                                                     </div>
//                                                 </td>
//                                                 <td className="pe-4 text-end">
//                                                     <div className="d-flex flex-column align-items-end">
//                                                         <span className="fw-bold text-success fs-5">
//                                                             +₹{payment.amount.toLocaleString('en-IN')}
//                                                         </span>
//                                                         {payment.note && (
//                                                             <small className="text-muted text-truncate" style={{ maxWidth: '200px' }}>
//                                                                 {payment.note}
//                                                             </small>
//                                                         )}
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         );
//                                     })
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="3" className="text-center py-4 text-muted">
//                                             <i className="bi bi-inbox fs-1"></i>
//                                             <p className="mt-2">No payment history found</p>
//                                         </td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CreditHistory;

import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchCredits } from '../redux/customerSlice';

const CreditHistory = () => {
    const location = useLocation();
    const { id } = location.state;
    const dispatch = useDispatch();
    const creditHistory = useSelector(store => store.customer.customersCreditHistory)?.find(val => val.customerId === id)?.history || [];

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

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const data = await axios.get(`http://localhost:5000/api/credits/get/${id}`)
                dispatch(fetchCredits({ ...data.data }))
            } catch (err) { }
        }
        fetchdata();
    }, [])

    return (
        <div className="container-fluid py-3 px-2 px-sm-3">
            <div className="card shadow-lg border-0 overflow-hidden">
                <div className="card-header bg-gradient-primary text-dark p-3 p-sm-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h3 className="mb-1 fw-bold fs-4 fs-md-3">
                                <i className="bi bi-credit-card me-2"></i>
                                Credit Payment History
                            </h3>
                            <p className="mb-0 opacity-75 small">All payment transactions for this customer</p>
                        </div>
                        <div className="bg-white bg-opacity-10 p-2 p-sm-3 rounded-circle">
                            <i className="bi bi-clock-history fs-3"></i>
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
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
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0 d-none d-md-table">
                            <thead className="table-light">
                                <tr>
                                    <th className="ps-4 py-3" style={{ width: '30%' }}>
                                        <i className="bi bi-calendar-date me-2"></i>
                                        Date & Time
                                    </th>
                                    <th className="py-3" style={{ width: '30%' }}>
                                        <i className="bi bi-credit-card me-2"></i>
                                        Payment Details
                                    </th>
                                    <th className="pe-4 py-3 text-end" style={{ width: '40%' }}>
                                        <i className="bi bi-cash-stack me-2"></i>
                                        Transaction
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
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-4 text-muted">
                                            <i className="bi bi-inbox fs-1"></i>
                                            <p className="mt-2">No payment history found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Mobile View - Cards */}
                        <div className="d-md-none">
                            {creditHistory.length > 0 ? (
                                creditHistory.map((payment, index) => {
                                    const paymentType = getPaymentTypeBadge(payment.paymentMethod);
                                    const dateParts = formatDate(payment.date).split(',');
                                    return (
                                        <div key={index} className="card border-0 shadow-sm mb-3">
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
                                                        <span className="d-none d-sm-inline">{payment.paymentMethod}</span>
                                                    </span>
                                                </div>

                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        {payment.note && (
                                                            <p className="mb-0 small text-muted text-truncate">
                                                                <i className="bi bi-chat-left-text me-1"></i>
                                                                {payment.note}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <span className="fw-bold text-success">
                                                        +₹{payment.amount.toLocaleString('en-IN')}
                                                    </span>
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
        </div>
    );
};

export default CreditHistory;