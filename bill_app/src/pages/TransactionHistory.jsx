// import React from 'react';
// import { useSelector } from 'react-redux';
// import { useLocation } from 'react-router-dom';

// const TransactionHistory = () => {
//     const location = useLocation()
//     const { id } = location.state;
//     const history = useSelector(store => store.customer.customersTransactionHistory)?.find(val => val.id === id)?.history || [];
//     const totalSales = history?.filter(item => item.type === 'credit' && item.category === 'Sales')?.reduce((sum, item) => sum + item.amount, 0);

//     const totalCustomerPayments = history?.filter(item => item.type === 'debit' && item.category === 'Payment')?.reduce((sum, item) => sum + item.amount, 0);

//     return (
//         <div className="container-fluid mt-4 px-0">
//             <div className="card shadow-lg border-0">
//                 <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center mb-4">
//                     <div className="d-flex align-items-center">
//                         <i className="bi bi-clock-history me-2 fs-5"></i>
//                         <h3 className="card-title mb-0">Transaction History</h3>
//                     </div>
//                     <button className="btn btn-sm btn-light">
//                         <i className="bi bi-funnel me-1"></i> Filter
//                     </button>
//                 </div>

//                 <div className="row g-3 p-3">
//                     <div className="col-md-6">
//                         <div className="card h-100 border-success">
//                             <div className="card-body">
//                                 <div className="d-flex align-items-center mb-2">
//                                     <div className="bg-success bg-opacity-10 p-2 rounded me-3">
//                                         <i className="bi bi-cart-check fs-4 text-success"></i>
//                                     </div>
//                                     <div>
//                                         <h6 className="mb-0 text-muted">Total Sales</h6>
//                                         <h4 className="mb-0 text-success fw-bold">
//                                             ₹{totalSales.toLocaleString('en-IN')}
//                                         </h4>
//                                     </div>
//                                 </div>
//                                 <div className="d-flex align-items-center">
//                                     <i className="bi bi-arrow-up text-success me-1"></i>
//                                     <small className="text-muted">Amount received from product sales</small>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-md-6">
//                         <div className="card h-100 border-danger">
//                             <div className="card-body">
//                                 <div className="d-flex align-items-center mb-2">
//                                     <div className="bg-danger bg-opacity-10 p-2 rounded me-3">
//                                         <i className="bi bi-cash-coin fs-4 text-danger"></i>
//                                     </div>
//                                     <div>
//                                         <h6 className="mb-0 text-muted">Customer Payments</h6>
//                                         <h4 className="mb-0 text-danger fw-bold">
//                                             ₹{totalCustomerPayments.toLocaleString('en-IN')}
//                                         </h4>
//                                     </div>
//                                 </div>
//                                 <div className="d-flex align-items-center">
//                                     <i className="bi bi-arrow-down text-danger me-1"></i>
//                                     <small className="text-muted">Amount paid to customers</small>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="table-responsive">
//                     <table className="table table-hover align-middle mb-0">
//                         <thead className="table-light">
//                             <tr>
//                                 <th className="ps-4">Date</th>
//                                 <th>Transaction Details</th>
//                                 <th>Type</th>
//                                 <th className="text-end pe-4">Amount (₹)</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {history.map((item, index) => (
//                                 <tr key={index} className={index % 2 === 0 ? 'table-default' : 'table-light'}>
//                                     <td className="ps-4">
//                                         <div className="fw-medium">
//                                             {new Date(item.date).toLocaleDateString('en-IN', {
//                                                 day: '2-digit',
//                                                 month: 'short',
//                                                 year: 'numeric'
//                                             })}
//                                         </div>
//                                     </td>
//                                     <td>
//                                         <div className="fw-medium">{item.description}</div>
//                                         {item.type === 'credit' ? (
//                                             <small className="text-success">
//                                                 <i className="bi bi-cart-check me-1"></i> Sales Income
//                                             </small>
//                                         ) : (
//                                             <small className="text-danger">
//                                                 <i className="bi bi-person-lines-fill me-1"></i> Customer Payment
//                                             </small>
//                                         )}
//                                     </td>
//                                     <td>
//                                         {item.type === 'credit' ? (
//                                             <span className="badge bg-success bg-opacity-10 text-success">
//                                                 <i className="bi bi-arrow-up me-1"></i> Credit
//                                             </span>
//                                         ) : (
//                                             <span className="badge bg-danger bg-opacity-10 text-danger">
//                                                 <i className="bi bi-arrow-down me-1"></i> Debit
//                                             </span>
//                                         )}
//                                     </td>
//                                     <td className={`text-end pe-4 fw-bold ${item.type === 'credit' ? 'text-success' : 'text-danger'}`}>
//                                         {item.type === 'credit' ? (
//                                             <i className="bi bi-arrow-up text-success me-1"></i>
//                                         ) : (
//                                             <i className="bi bi-arrow-down text-danger me-1"></i>
//                                         )}
//                                         ₹{item.amount.toLocaleString('en-IN')}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TransactionHistory;


// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';

// const TransactionHistory = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { id } = location.state || {};

//     const transactionHistory = useSelector(store => store.customer.customersTransactionHistory || []);
//     const history = transactionHistory.find(val => val.id === id)?.history || [];

//     const totalSales = history
//         .filter(item => item?.type === 'credit' && item?.category === 'Sales')
//         .reduce((sum, item) => sum + (item?.amount || 0), 0);

//     const totalCustomerPayments = history
//         .filter(item => item?.type === 'debit' && item?.category === 'Payment')
//         .reduce((sum, item) => sum + (item?.amount || 0), 0);

//     const [filter, setFilter] = useState('all');
//     const filteredHistory = filter === 'all' 
//         ? history 
//         : history.filter(item => item.type === filter);

//     const formatDate = (dateString) => {
//         if (!dateString) return '';
//         const options = { day: '2-digit', month: 'short', year: 'numeric' };
//         return new Date(dateString).toLocaleDateString('en-IN', options);
//     };

//     const handleBack = () => {
//         navigate(-1);
//     };

//     return (
//         <div className="container-fluid mt-3 px-3">
//             <div className="card shadow-lg border-0 rounded-3 overflow-hidden">
//                 <div className="card-header bg-primary text-white py-3">
//                     <div className="d-flex justify-content-between align-items-center">
//                         <div className="d-flex align-items-center">
//                             <button 
//                                 className="btn btn-sm btn-light me-3"
//                                 onClick={handleBack}
//                             >
//                                 <i className="bi bi-arrow-left"></i>
//                             </button>
//                             <div>
//                                 <h3 className="mb-0">
//                                     <i className="bi bi-clock-history me-2"></i>
//                                     Transaction History
//                                 </h3>
//                             </div>
//                         </div>
//                         <div className="btn-group">
//                             <button 
//                                 className={`btn btn-sm ${filter === 'all' ? 'btn-light' : 'btn-outline-light'}`}
//                                 onClick={() => setFilter('all')}
//                             >
//                                 All
//                             </button>
//                             <button 
//                                 className={`btn btn-sm ${filter === 'credit' ? 'btn-light' : 'btn-outline-light'}`}
//                                 onClick={() => setFilter('credit')}
//                             >
//                                 <i className="bi bi-arrow-up me-1"></i> Credits
//                             </button>
//                             <button 
//                                 className={`btn btn-sm ${filter === 'debit' ? 'btn-light' : 'btn-outline-light'}`}
//                                 onClick={() => setFilter('debit')}
//                             >
//                                 <i className="bi bi-arrow-down me-1"></i> Debits
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Summary Cards */}
//                 <div className="row g-3 p-3">
//                     <div className="col-md-6">
//                         <div className="card h-100 border-success border-opacity-50">
//                             <div className="card-body">
//                                 <div className="d-flex justify-content-between align-items-center">
//                                     <div className="d-flex align-items-center">
//                                         <div className="bg-success bg-opacity-10 p-3 rounded me-3">
//                                             <i className="bi bi-cart-check fs-3 text-success"></i>
//                                         </div>
//                                         <div>
//                                             <h6 className="mb-1 text-muted">Total Sales</h6>
//                                             <h4 className="mb-0 text-success fw-bold">
//                                                 ₹{totalSales?.toLocaleString('en-IN') || '0'}
//                                             </h4>
//                                         </div>
//                                     </div>
//                                     <span className="badge bg-success bg-opacity-10 text-success">
//                                         {history.filter(item => item?.type === 'credit').length} transactions
//                                     </span>
//                                 </div>
//                                 <hr className="my-2" />
//                                 <small className="text-muted">
//                                     <i className="bi bi-info-circle me-1"></i> Amount received from product sales
//                                 </small>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-md-6">
//                         <div className="card h-100 border-danger border-opacity-50">
//                             <div className="card-body">
//                                 <div className="d-flex justify-content-between align-items-center">
//                                     <div className="d-flex align-items-center">
//                                         <div className="bg-danger bg-opacity-10 p-3 rounded me-3">
//                                             <i className="bi bi-cash-coin fs-3 text-danger"></i>
//                                         </div>
//                                         <div>
//                                             <h6 className="mb-1 text-muted">Customer Payments</h6>
//                                             <h4 className="mb-0 text-danger fw-bold">
//                                                 ₹{totalCustomerPayments?.toLocaleString('en-IN') || '0'}
//                                             </h4>
//                                         </div>
//                                     </div>
//                                     <span className="badge bg-danger bg-opacity-10 text-danger">
//                                         {history.filter(item => item?.type === 'debit').length} transactions
//                                     </span>
//                                 </div>
//                                 <hr className="my-2" />
//                                 <small className="text-muted">
//                                     <i className="bi bi-info-circle me-1"></i> Amount paid to customers
//                                 </small>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Transactions Table */}
//                 <div className="px-3 pb-3">
//                     <div className="table-responsive rounded-3 border">
//                         <table className="table table-hover align-middle mb-0">
//                             <thead className="table-light">
//                                 <tr>
//                                     <th className="ps-4">Date</th>
//                                     <th>Transaction Details</th>
//                                     <th className="text-center">Type</th>
//                                     <th className="text-end pe-4">Amount (₹)</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredHistory.length > 0 ? (
//                                     filteredHistory.map((item, index) => (
//                                         <tr key={index} className={index % 2 === 0 ? 'table-default' : 'table-light'}>
//                                             <td className="ps-4">
//                                                 <div className="fw-medium">
//                                                     {formatDate(item.date)}
//                                                 </div>
//                                                 <small className="text-muted">
//                                                     {new Date(item.date).toLocaleTimeString('en-IN', {
//                                                         hour: '2-digit',
//                                                         minute: '2-digit'
//                                                     })}
//                                                 </small>
//                                             </td>
//                                             <td>
//                                                 <div className="fw-medium">{item.description || 'No description'}</div>
//                                                 <small className={`text-${item.type === 'credit' ? 'success' : 'danger'}`}>
//                                                     <i className={`bi bi-${item.type === 'credit' ? 'cart-check' : 'person-lines-fill'} me-1`}></i>
//                                                     {item.category || 'Transaction'}
//                                                 </small>
//                                             </td>
//                                             <td className="text-center">
//                                                 <span className={`badge bg-${item.type === 'credit' ? 'success' : 'danger'}-opacity-10 text-${item.type === 'credit' ? 'success' : 'danger'}`}>
//                                                     <i className={`bi bi-arrow-${item.type === 'credit' ? 'up' : 'down'} me-1`}></i>
//                                                     {item.type === 'credit' ? 'Credit' : 'Debit'}
//                                                 </span>
//                                             </td>
//                                             <td className={`text-end pe-4 fw-bold text-${item.type === 'credit' ? 'success' : 'danger'}`}>
//                                                 <i className={`bi bi-arrow-${item.type === 'credit' ? 'up' : 'down'} me-1`}></i>
//                                                 ₹{(item.amount || 0).toLocaleString('en-IN')}
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="4" className="text-center py-4">
//                                             <div className="d-flex flex-column align-items-center justify-content-center">
//                                                 <i className="bi bi-receipt-cutoff fs-1 text-muted mb-2"></i>
//                                                 <h5>No transactions found</h5>
//                                                 <p className="text-muted">
//                                                     {filter === 'all' 
//                                                         ? 'This customer has no transaction history yet'
//                                                         : `No ${filter} transactions found`}
//                                                 </p>
//                                             </div>
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

// export default TransactionHistory;


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchTransactions } from '../redux/customerSlice';

const TransactionHistory = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = location.state || {};

    const transactionHistory = useSelector(store => store.customer.customersTransactionHistory || []);
    const history = transactionHistory.find(val => val.id === id)?.history || [];

    const totalSales = history
        .filter(item => item?.type === 'credit' && item?.category === 'Payment')
        .reduce((sum, item) => sum + (item?.amount || 0), 0);

    const totalCustomerPayments = history
        .filter(item => item?.type === 'debit' && item?.category === 'Sales')
        .reduce((sum, item) => sum + (item?.amount || 0), 0);

    const [filter, setFilter] = useState('all');
    const filteredHistory = filter === 'all'
        ? history
        : history.filter(item => item.type === filter);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    };

    const formatTime = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="container-fluid px-2 px-sm-3 py-3">
            <div className="card shadow-sm border-0 rounded-3 overflow-hidden">
                {/* Card Header */}
                <div className="card-header bg-primary text-white py-3">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
                        <div className="d-flex align-items-center">
                            <button
                                className="btn btn-sm btn-light me-2 me-md-3"
                                onClick={handleBack}
                            >
                                <i className="bi bi-arrow-left"></i>
                            </button>
                            <div>
                                <h3 className="mb-0 fs-5 fs-md-4">
                                    <i className="bi bi-clock-history me-2"></i>
                                    Transaction History
                                </h3>
                            </div>
                        </div>

                        <div className="btn-group w-100 w-md-auto">
                            <button
                                className={`btn btn-sm ${filter === 'all' ? 'btn-light' : 'btn-outline-light'} px-2 px-sm-3`}
                                onClick={() => setFilter('all')}
                            >
                                <span className="d-none d-sm-inline">All</span>
                                <span className="d-sm-none">All</span>
                            </button>
                            <button
                                className={`btn btn-sm ${filter === 'credit' ? 'btn-light' : 'btn-outline-light'} px-2 px-sm-3`}
                                onClick={() => setFilter('credit')}
                            >
                                <i className="bi bi-arrow-up me-1"></i>
                                <span className="d-none d-md-inline">Credits</span>
                            </button>
                            <button
                                className={`btn btn-sm ${filter === 'debit' ? 'btn-light' : 'btn-outline-light'} px-2 px-sm-3`}
                                onClick={() => setFilter('debit')}
                            >
                                <i className="bi bi-arrow-down me-1"></i>
                                <span className="d-none d-md-inline">Debits</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="row g-2 g-sm-3 p-2 p-sm-3">
                    <div className="col-12 col-md-6">
                        <div className="card h-100 border-success border-opacity-50">
                            <div className="card-body p-2 p-sm-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-success bg-opacity-10 p-2 p-sm-3 rounded me-2 me-sm-3">
                                            <i className="bi bi-cash-coin fs-4 fs-sm-3 text-success"></i>
                                        </div>

                                        <div>
                                            <h6 className="mb-1 text-muted small">Customer Payments</h6>
                                            <h4 className="mb-0 text-success fw-bold fs-5 fs-sm-4">
                                                ₹{totalSales?.toLocaleString('en-IN') || '0'}
                                            </h4>
                                        </div>
                                    </div>
                                    <span className="badge bg-success bg-opacity-10 text-success small">
                                        {history.filter(item => item?.type === 'credit').length} txns
                                    </span>
                                </div>
                                <hr className="my-2" />
                                <small className="text-muted">
                                    <i className="bi bi-info-circle me-1"></i> Payments received
                                </small>

                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="card h-100 border-danger border-opacity-50">
                            <div className="card-body p-2 p-sm-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-danger bg-opacity-10 p-2 p-sm-3 rounded me-2 me-sm-3">
                                            <i className="bi bi-cart-check fs-4 fs-sm-3 text-danger"></i>
                                        </div>
                                        <div>
                                            <h6 className="mb-1 text-muted small">Total Sales</h6>
                                            <h4 className="mb-0 text-danger fw-bold fs-5 fs-sm-4">
                                                ₹{totalCustomerPayments?.toLocaleString('en-IN') || '0'}
                                            </h4>
                                        </div>
                                    </div>
                                    <span className="badge bg-danger bg-opacity-10 text-danger small">
                                        {history.filter(item => item?.type === 'debit').length} txns
                                    </span>
                                </div>
                                <hr className="my-2" />
                                <small className="text-muted">
                                    <i className="bi bi-info-circle me-1"></i> Product sales
                                </small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-none d-md-block px-3 pb-3">
                    <div className="table-responsive rounded-3 border">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="ps-4">Date</th>
                                    <th>Transaction Details</th>
                                    <th className="text-center">Type</th>
                                    <th className="text-end pe-4">Amount (₹)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredHistory.length > 0 ? (
                                    filteredHistory.map((item, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'table-default' : 'table-light'}>
                                            <td className="ps-4">
                                                <div className="fw-medium">
                                                    {formatDate(item.date)}
                                                </div>
                                                <small className="text-muted">
                                                    {formatTime(item.date)}
                                                </small>
                                            </td>
                                            <td>
                                                <div className="fw-medium">{item.description || 'No description'}</div>
                                                <small className={`text-${item.type === 'credit' ? 'success' : 'danger'}`}>
                                                    <i className={`bi bi-${item.type === 'debit' ? 'cart-check' : 'person-lines-fill'} me-1`}></i>
                                                    {item.category || 'Transaction'}
                                                </small>
                                            </td>
                                            <td className="text-center">
                                                <span className={`badge bg-${item.type === 'credit' ? 'success' : 'danger'}-opacity-10 text-${item.type === 'credit' ? 'success' : 'danger'}`}>
                                                    <i className={`bi bi-arrow-${item.type === 'credit' ? 'up' : 'down'} me-1`}></i>
                                                    {item.type === 'credit' ? 'Credit' : 'Debit'}
                                                </span>
                                            </td>
                                            <td className={`text-end pe-4 fw-bold text-${item.type === 'credit' ? 'success' : 'danger'}`}>
                                                <i className={`bi bi-arrow-${item.type === 'credit' ? 'up' : 'down'} me-1`}></i>
                                                ₹{(item.amount || 0).toLocaleString('en-IN')}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-4">
                                            <div className="d-flex flex-column align-items-center justify-content-center">
                                                <i className="bi bi-receipt-cutoff fs-1 text-muted mb-2"></i>
                                                <h5>No transactions found</h5>
                                                <p className="text-muted">
                                                    {filter === 'all'
                                                        ? 'This customer has no transaction history yet'
                                                        : `No ${filter} transactions found`}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Transactions - Mobile View */}
                <div className="d-md-none px-2 pb-2">
                    {filteredHistory.length > 0 ? (
                        filteredHistory.map((item, index) => (
                            <div key={index} className="card mb-3 border-0 shadow-sm">
                                <div className="card-body p-3">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <div>
                                            <h6 className="fw-bold mb-1">{item.description || 'Transaction'}</h6>
                                            <small className="text-muted">
                                                {formatDate(item.date)} • {formatTime(item.date)}
                                            </small>
                                        </div>
                                        <span className={`badge bg-${item.type === 'credit' ? 'success' : 'danger'}-opacity-10 text-${item.type === 'credit' ? 'success' : 'danger'}`}>
                                            <i className={`bi bi-arrow-${item.type === 'credit' ? 'up' : 'down'} me-1`}></i>
                                            {item.type === 'credit' ? 'Credit' : 'Debit'}
                                        </span>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <small className={`text-${item.type === 'credit' ? 'success' : 'danger'}`}>
                                            <i className={`bi bi-${item.type === 'credit' ? 'cart-check' : 'person-lines-fill'} me-1`}></i>
                                            {item.category || 'Transaction'}
                                        </small>
                                        <span className={`fw-bold text-${item.type === 'credit' ? 'success' : 'danger'}`}>
                                            <i className={`bi bi-arrow-${item.type === 'credit' ? 'up' : 'down'} me-1`}></i>
                                            ₹{(item.amount || 0).toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="card border-0 shadow-sm">
                            <div className="card-body text-center py-4">
                                <i className="bi bi-receipt-cutoff fs-1 text-muted mb-2"></i>
                                <h5>No transactions found</h5>
                                <p className="text-muted mb-0">
                                    {filter === 'all'
                                        ? 'This customer has no transaction history yet'
                                        : `No ${filter} transactions found`}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TransactionHistory;