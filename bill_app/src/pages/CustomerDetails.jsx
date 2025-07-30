import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaymentModal from './PaymentPage';
import { deleteCustomerById, postCreditHistory } from '../redux/customerSlice';
import { fetchCustomers } from '../redux/customerSlice';
import axios from 'axios';

const CustomerDetails = () => {
    const customerList = useSelector(store => store.customer.customerDetails) ?? [];
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const filteredCustomers = customerList.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.mobile.includes(searchTerm) ||
        (customer.shopName && customer.shopName.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handlePaymentClick = (customer) => {
        setSelectedCustomer(customer);
        setShowPaymentModal(true);
    };

    const handlePaymentSubmit = (paymentData) => {
        // dispatch(updateBalance({ ...paymentData }))
        dispatch(postCreditHistory({ ...paymentData }))
        setShowPaymentModal(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                dispatch(deleteCustomerById(id));
            } catch (err) {
                alert(err.message || 'Error deleting customer');
            }
        }
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await axios.get("http://localhost:5000/api/customers/get");
                dispatch(fetchCustomers([...data.data]))
            } catch (error) {

            }
        }
        fetch()
    }, [customerList])

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-grow text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (

        <div className="container-fluid px-2 px-sm-3 py-3">
            {showPaymentModal && selectedCustomer && (
                <PaymentModal
                    customer={selectedCustomer}
                    onClose={() => setShowPaymentModal(false)}
                    onSubmit={handlePaymentSubmit}
                />
            )}

            <div className="row mb-3 mb-md-4">
                <div className="col-12">
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
                        <h2 className="fw-bold mb-0">
                            <i className="bi bi-people-fill me-2 text-primary"></i>
                            {"Customers".toUpperCase()}
                        </h2>
                        <button
                            className="btn btn-primary px-3 px-sm-4 py-2"
                            onClick={() => navigate("/addCustomer")}
                        >
                            <i className="bi bi-plus-lg me-1 me-sm-2"></i>
                            <span>Add Customer</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="row mb-3 mb-md-4 sticky-top bg-white py-2 z-index-1020">
                <div className="col-12">
                    <div className="card shadow-sm border ms-auto" style={{ maxWidth: "300px" }}>
                        <div className="input-group">
                            <span className="input-group-text bg-white border-end-0 pe-1">
                                <i className="bi bi-search text-muted"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control border-start-0 py-2"
                                placeholder="Search customers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => setSearchTerm("")}
                                >
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>


            {/* Customer List */}
            <div className="row g-3">
                {filteredCustomers.length === 0 ? (
                    <div className="col-12 text-center py-4 py-md-5">
                        <div className="card shadow-sm border-0">
                            <div className="card-body py-4 py-md-5">
                                <i className="bi bi-people fs-1 text-muted mb-3"></i>
                                <h4 className="mb-2">
                                    {searchTerm ? 'No matching customers found' : 'No customers available'}
                                </h4>
                                <p className="text-muted mb-3 mb-md-4">
                                    {searchTerm
                                        ? 'Try adjusting your search query'
                                        : 'Get started by adding your first customer'}
                                </p>
                                <button
                                    className="btn btn-primary px-4 py-2"
                                    onClick={() => navigate("/addCustomer")}
                                >
                                    <i className="bi bi-plus-lg me-2"></i> Add Customer
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    filteredCustomers.map((cus) => (
                        <div key={cus.id} className="col-12">
                            <div className="card shadow-sm border-0 overflow-hidden">
                                <div className="card-body p-3 p-sm-4">
                                    <div className="row gy-3">
                                        {/* Left Column - Customer Info */}
                                        <div className="col-md-7 col-lg-8">
                                            <div className="d-flex flex-column h-100">
                                                {/* Name and Balance */}
                                                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-2 mb-md-3 gap-2">
                                                    <h4 className="mb-0 text-dark fw-bold text-break">
                                                        <i className="bi bi-person-badge me-2"></i>
                                                        {cus.name.toUpperCase()}
                                                    </h4>
                                                    <span className={`d-inline-flex align-items-center ${cus.balance > 0 ? 'text-danger' : cus.balance < 0 ? 'text-success' : 'text-secondary'}`}>
                                                        <span className="fs-4 fs-sm-4 fw-bold me-1">₹{Math.abs(cus.balance || 0).toFixed(2)}</span>
                                                        <span className={`badge fs-6 border ${cus.balance > 0 ? 'text-danger border-danger' : cus.balance < 0 ? 'text-success border-success' : 'text-secondary border-secondary'} ms-1 align-middle`}>
                                                            {cus.balance > 0 ? 'Balance' : cus.balance < 0 ? 'Advance' : 'Settled'}
                                                        </span>
                                                    </span>
                                                </div>

                                                {/* Mobile and Shop */}
                                                <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-3 gap-sm-4 mb-2 mb-md-3">
                                                    <div className="d-flex align-items-center">
                                                        <i className="bi bi-telephone fs-5 text-primary me-2"></i>
                                                        <div>
                                                            <h6 className="mb-0 text-muted small">Mobile</h6>
                                                            <p className="mb-0 fw-medium">{cus.mobile || 'Not provided'}</p>
                                                        </div>
                                                    </div>
                                                    {cus.shopName && (
                                                        <div className="d-flex align-items-center">
                                                            <i className="bi bi-shop fs-5 text-primary me-2"></i>
                                                            <div>
                                                                <h6 className="mb-0 text-muted small">Shop</h6>
                                                                <p className="mb-0 fw-medium">{cus.shopName}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Address */}
                                                {cus.address && (
                                                    <div className="d-flex align-items-start">
                                                        <i className="bi bi-geo-alt fs-5 text-primary mt-1 me-2"></i>
                                                        <div>
                                                            <h6 className="mb-1 text-muted small">Address</h6>
                                                            <p className="mb-0 fw-medium text-break">{cus.address}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Right Column - Action Buttons */}
                                        <div className="col-md-5 col-lg-4">
                                            <div className="d-flex flex-column h-100 gap-2">
                                                {/* Primary Actions */}
                                                <div className="d-grid gap-2">
                                                    <button
                                                        className="btn btn-primary py-2 d-flex align-items-center justify-content-center"
                                                        onClick={() => navigate("/bill", { state: { name: cus?.name, mobile: cus?.mobile, id: cus?.id } })}
                                                    >
                                                        <i className="bi bi-receipt me-1 me-sm-2"></i>
                                                        <span>Create Bill</span>
                                                    </button>
                                                    <button
                                                        className="btn btn-success py-2 d-flex align-items-center justify-content-center"
                                                        onClick={() => handlePaymentClick(cus)}
                                                    >
                                                        <i className="bi bi-cash-coin me-1 me-sm-2"></i>
                                                        <span>Receive Payment</span>
                                                    </button>
                                                </div>

                                                {/* Secondary Actions */}
                                                <div className="btn-group w-100" role="group">
                                                    <button
                                                        className="btn btn-outline-secondary flex-fill py-2 d-flex align-items-center justify-content-center"
                                                        onClick={() => navigate("/addCustomer", { state: { ...cus } })}
                                                    >
                                                        <i className="bi bi-pencil-square me-1 d-none d-sm-inline"></i>
                                                        <span>Edit</span>
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-danger flex-fill py-2 d-flex align-items-center justify-content-center"
                                                        onClick={() => handleDelete(cus.id)}
                                                    >
                                                        <i className="bi bi-trash me-1 d-none d-sm-inline"></i>
                                                        <span>Delete</span>
                                                    </button>
                                                </div>

                                                {/* History Buttons */}
                                                <div className="btn-group w-100" role="group">
                                                    <button
                                                        className="btn btn-outline-info flex-fill py-2 d-flex align-items-center justify-content-center"
                                                        onClick={() => navigate("/purchaseHistory", { state: { id: cus.id } })}
                                                    >
                                                        <i className="bi bi-bag-check me-1"></i>
                                                        <span className="d-none d-sm-inline">History</span>
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-warning flex-fill py-2 d-flex align-items-center justify-content-center"
                                                        onClick={() => navigate("/creditHistory", { state: { customer: cus } })}
                                                    >
                                                        <i className="bi bi-credit-card me-1"></i>
                                                        <span className="d-none d-sm-inline">Credit</span>
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-dark flex-fill py-2 d-flex align-items-center justify-content-center"
                                                        onClick={() => navigate("/transactionHistory", { state: { id: cus.id } })}
                                                    >
                                                        <i className="bi bi-list-check me-1"></i>
                                                        <span className="d-none d-sm-inline">Transactions</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CustomerDetails;