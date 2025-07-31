import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { deleteBill, deleteCustomerBill, fatchBillItems, softDeleteCustomerBill } from '../redux/customerSlice';
import ConfirmationPopup from '../component/ConfirmPopup';

const PurchaseHistory = () => {
    const location = useLocation();
    const { id } = location?.state;
    const customerBills = useSelector(state => state.customer.customerBills);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteType, setDeleteType] = useState('');
    const [selectedBillId, setSelectedBillId] = useState(null);
    const bills = customerBills.find(bill => bill.id === id)?.bills || []
    const purchases = bills?.map(val => ({ id: val.invoiceId, date: val.date, total: val.billItems.reduce((sum, val) => sum + (val.itemPrice * val.itemCount), 0) })) || []

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [customerBills]);

    useEffect(() => {
        const fetchBill = async () => {
            try {
                const data = await axios.get(`http://localhost:5000/api/bill/get/${location.state.id}`)
                dispatch(fatchBillItems({ ...data.data }))
            } catch (err) { }
        }
        fetchBill();
    }, [id, dispatch])

    const filteredPurchases = purchases?.filter(purchase => {
        if (filter === 'month') {
            const purchaseDate = new Date(purchase.date);
            const currentDate = new Date();
            return purchaseDate.getMonth() === currentDate.getMonth() &&
                purchaseDate.getFullYear() === currentDate.getFullYear();
        } else if (filter === 'year') {
            const purchaseDate = new Date(purchase.date);
            const currentDate = new Date();
            return purchaseDate.getFullYear() === currentDate.getFullYear();
        }
        return true;
    }).filter(purchase => {
        return purchase?.id?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            purchase.date.includes(searchTerm);
    });

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const handleDeleteBill = (id, invoiceId) => {
        dispatch(deleteBill({ id, invoiceId }))
        dispatch(deleteCustomerBill({ id, invoiceId }))

    }

    const cancelDelete = () => {
        setShowConfirm(false);
        setDeleteType('');
        setSelectedBillId(null);
    };
    const confirmDelete = async () => {
        if (deleteType === 'full') {
            handleDeleteBill(id, selectedBillId);
        } else if (deleteType === 'soft') {
            await dispatch(softDeleteCustomerBill({ id, invoiceId: selectedBillId })).unwrap();
            const fetchBill = async () => {
                try {
                    const data = await axios.get(`http://localhost:5000/api/bill/get/${location.state.id}`)
                    dispatch(fatchBillItems({ ...data.data }))
                } catch (err) { }
            }
            fetchBill();
        }
        cancelDelete();
    };

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
            {showConfirm && <ConfirmationPopup
                show={showConfirm}
                onHide={cancelDelete}
                onConfirm={confirmDelete}
                title={deleteType === 'full' ? "Delete & Adjust Balance" : "Remove from View"}
                message={
                    deleteType === 'full'
                        ? "Are you sure you want to delete this bill and adjust the balance?"
                        : "Are you sure you want to remove this bill from view? This won't affect balance."
                }
                confirmText={deleteType === 'full' ? "Delete" : "Remove"}
                cancelText="Cancel"
                variant={deleteType === 'full' ? "danger" : "secondary"}
            />
            }
            <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
                <div className="card-header bg-gradient-indigo text-dark">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
                        <div>
                            <h5 className="mb-1 fw-semibold">
                                <i className="bi bi-credit-card me-2"></i>
                                ORDER HISTORY
                            </h5>
                            <small className="text-white-80">View and manage your purchase records</small>
                        </div>

                        <div className="d-flex flex-column flex-sm-row gap-2 w-100 w-md-auto">
                            <div className="input-group input-group-sm bg-white rounded-pill shadow-xs flex-grow-1">
                                <span className="input-group-text bg-transparent border-0 ps-3">
                                    <i className="bi bi-search text-indigo-500"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control border-0 bg-transparent py-2"
                                    placeholder="Search by bill number or date..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <select
                                className="form-select form-select-sm bg-white border-0 rounded-pill shadow-xs"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="all">All Time</option>
                                <option value="month">This Month</option>
                                <option value="year">This Year</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="card-body p-0">
                    <div className="table-responsive d-none d-md-block">
                        <table className="table table-hover mb-0">
                            <thead className="bg-indigo-50">
                                <tr>
                                    <th className="ps-4 text-indigo-600 fw-semibold" style={{ width: '20%' }}>Order ID</th>
                                    <th className="text-indigo-600 fw-semibold" style={{ width: '20%' }}>Date</th>
                                    <th className="text-indigo-600 fw-semibold" style={{ width: '20%' }}>Amount</th>
                                    <th className="pe-4 text-end text-indigo-600 fw-semibold" style={{ width: '30%' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPurchases.length > 0 ? (
                                    filteredPurchases.map((purchase, index) => (
                                        <tr key={index} className="align-middle border-bottom border-light">
                                            <td className="ps-4 fw-medium text-indigo-800" style={{ width: '20%' }}>{purchase.id}</td>
                                            <td className="text-muted" style={{ width: '20%' }}>{formatDate(purchase.date)}</td>
                                            <td className="fw-bold text-indigo-600" style={{ width: '20%' }}>₹{purchase.total.toLocaleString()}</td>
                                            <td className="pe-4 text-end" style={{ width: '40%' }}>
                                                <div className="d-flex justify-content-end gap-2">
                                                    <button
                                                        className="btn btn-sm btn-outline-danger rounded-pill px-3"
                                                        onClick={() => {
                                                            setDeleteType('full');
                                                            setSelectedBillId(purchase.id);
                                                            setShowConfirm(true);
                                                        }}
                                                    >
                                                        <i className="bi bi-trash me-1"></i> Delete
                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-outline-secondary rounded-pill px-3"
                                                        onClick={() => {
                                                            setDeleteType('soft');
                                                            setSelectedBillId(purchase.id);
                                                            setShowConfirm(true);
                                                        }}
                                                    >
                                                        <i className="bi bi-x-lg me-1"></i> Remove
                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-outline-primary rounded-pill px-3"
                                                        onClick={() =>
                                                            navigate("/editBill", {
                                                                state: {
                                                                    cusId: id,
                                                                    billId: purchase.id,
                                                                    date: purchase.date,
                                                                },
                                                            })
                                                        }
                                                    >
                                                        <i className="bi bi-pencil-square me-1"></i> Edit
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-5">
                                            <div className="py-4">
                                                <i className="bi bi-file-earmark-text display-5 text-indigo-200"></i>
                                                <h5 className="mt-3 text-indigo-400 fw-normal">No orders found</h5>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile view remains the same */}
                    <div className="d-md-none">
                        {filteredPurchases.length > 0 ? (
                            filteredPurchases.map((purchase, index) => (
                                <div key={index} className="card border-0 shadow-sm mb-3 mx-2">
                                    <div className="card-body p-3">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <div>
                                                <h6 className="fw-bold text-indigo-800 mb-1">{purchase.id}</h6>
                                                <small className="text-muted">{formatDate(purchase.date)}</small>
                                            </div>
                                            <span className="badge bg-indigo-100 text-indigo-800 fw-bold">
                                                ₹{purchase.total.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="d-flex justify-content-end gap-2">
                                            <button
                                                className="btn btn-sm btn-outline-danger rounded-pill px-3"
                                                onClick={() => {
                                                    setDeleteType('full');
                                                    setSelectedBillId(purchase.id);
                                                    setShowConfirm(true);
                                                }}
                                            >
                                                <i className="bi bi-trash me-1"></i> Delete
                                            </button>

                                            <button
                                                className="btn btn-sm btn-outline-secondary rounded-pill px-3"
                                                onClick={() => {
                                                    setDeleteType('soft');
                                                    setSelectedBillId(purchase.id);
                                                    setShowConfirm(true);
                                                }}
                                            >
                                                <i className="bi bi-x-lg me-1"></i> Remove
                                            </button>

                                            <button
                                                className="btn btn-sm btn-outline-primary rounded-pill px-3"
                                                onClick={() =>
                                                    navigate("/editBill", {
                                                        state: {
                                                            cusId: id,
                                                            billId: purchase.id,
                                                            date: purchase.date,
                                                        },
                                                    })
                                                }
                                            >
                                                <i className="bi bi-pencil-square me-1"></i> Edit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-5 px-2">
                                <i className="bi bi-file-earmark-text display-5 text-indigo-200"></i>
                                <h5 className="mt-3 text-indigo-400 fw-normal">No orders found</h5>
                            </div>
                        )}
                    </div>
                </div>

                {filteredPurchases.length > 0 && (
                    <div className="card-footer bg-light py-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">
                                Showing {filteredPurchases.length} of {purchases.length} orders
                            </small>
                            <small className="text-indigo-600 fw-semibold">
                                Total: ₹{filteredPurchases.reduce((sum, p) => sum + p.total, 0).toLocaleString()}
                            </small>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PurchaseHistory;