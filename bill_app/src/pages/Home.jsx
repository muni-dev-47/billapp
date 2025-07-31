// import React, { useState, useMemo, useEffect } from 'react';
// import { useSelector } from 'react-redux';

// const Home = () => {
//     const customersTransactionHistory = useSelector(store => store.customer.customersTransactionHistory) || [];

//     const [selectedYear, setSelectedYear] = useState('all');
//     const [selectedMonth, setSelectedMonth] = useState('all');
//     const [selectedDay, setSelectedDay] = useState('all');

//     const months = [
//         "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//     ];

//     const years = useMemo(() => {
//         const unique = new Set(customersTransactionHistory.flatMap(cus => cus.history.map(e => new Date(e.date).getFullYear())));
//         return Array.from(unique).sort((a, b) => b - a);
//     }, [customersTransactionHistory]);

//     const getDaysInMonth = (year, monthIndex) => {
//         return new Date(year, monthIndex + 1, 0).getDate();
//     };

//     const availableDays = useMemo(() => {
//         if (selectedYear === 'all' || selectedMonth === 'all') {
//             return Array.from({ length: 31 }, (_, i) => i + 1);
//         }

//         const year = parseInt(selectedYear);
//         const monthIndex = months.indexOf(selectedMonth);
//         const daysInMonth = getDaysInMonth(year, monthIndex);
//         return Array.from({ length: daysInMonth }, (_, i) => i + 1);
//     }, [selectedYear, selectedMonth]);

//     const filteredData = useMemo(() => {
//         return customersTransactionHistory.flatMap(cus => cus.history).filter(entry => {
//             const date = new Date(entry.date);
//             const yearMatch = selectedYear === 'all' || date.getFullYear() === parseInt(selectedYear);
//             const monthMatch = selectedMonth === 'all' || date.getMonth() === months.indexOf(selectedMonth);
//             const dayMatch = selectedDay === 'all' || date.getDate() === parseInt(selectedDay);
//             return yearMatch && monthMatch && dayMatch;
//         });
//     }, [selectedYear, selectedMonth, selectedDay, customersTransactionHistory]);

//     useEffect(() => {
//         if (selectedYear === 'all') setSelectedMonth('all');
//     }, [selectedYear]);

//     useEffect(() => {
//         if (selectedMonth === 'all') setSelectedDay('all');
//     }, [selectedMonth]);

//     const totalCredit = filteredData
//         .filter(item => item.type === 'credit')
//         .reduce((sum, item) => sum + item.amount, 0);

//     const totalDebit = filteredData
//         .filter(item => item.type === 'debit')
//         .reduce((sum, item) => sum + item.amount, 0);

//     return (
//         <div className="container py-3 py-md-5">
//             <h1 className="mb-3 mb-md-4 display-5 fw-bold text-primary">{"Daily Sales Report".toUpperCase()}</h1>
//             <div className="row g-2 g-md-3 mb-4 mb-md-5">
//                 <div className="col-12 col-md-4">
//                     <label className="form-label fw-semibold">Year</label>
//                     <select
//                         className="form-select shadow-sm"
//                         value={selectedYear}
//                         onChange={e => setSelectedYear(e.target.value)}
//                     >
//                         <option value="all">All Years</option>
//                         {years.map(y => <option key={y} value={y}>{y}</option>)}
//                     </select>
//                 </div>
//                 <div className="col-12 col-md-4">
//                     <label className="form-label fw-semibold">Month</label>
//                     <select
//                         className="form-select shadow-sm"
//                         value={selectedMonth}
//                         onChange={e => setSelectedMonth(e.target.value)}
//                         disabled={selectedYear === 'all'}
//                     >
//                         <option value="all">All Months</option>
//                         {months.map((m, i) => <option key={i} value={m}>{m}</option>)}
//                     </select>
//                 </div>
//                 <div className="col-12 col-md-4">
//                     <label className="form-label fw-semibold">Day</label>
//                     <select
//                         className="form-select shadow-sm"
//                         value={selectedDay}
//                         onChange={e => setSelectedDay(e.target.value)}
//                         disabled={selectedMonth === 'all' || selectedYear === 'all'}
//                     >
//                         <option value="all">All Days</option>
//                         {availableDays.map(day => (
//                             <option key={day} value={day}>{day}</option>
//                         ))}
//                     </select>
//                 </div>
//             </div>

//             {/* Credit and Debit Cards */}
//             <div className="row g-3 g-md-4">
//                 <div className="col-12 col-lg-6">
//                     <div className="card border-0 shadow-lg h-100 bg-gradient-light" style={{ minHeight: '180px' }}>
//                         <div className="card-body p-3 p-md-4 d-flex flex-column justify-content-between">
//                             <div>
//                                 <div className="d-flex align-items-center mb-2">
//                                     <i className="bi bi-arrow-down-circle fs-3 text-success me-2"></i>
//                                     <h2 className="text-muted mb-0">Total Credit</h2>
//                                 </div>
//                                 <h1 className="display-5 display-md-4 fw-bold text-success mb-3">₹ {totalCredit.toLocaleString()}</h1>
//                             </div>
//                             <div className="d-flex align-items-center justify-content-between">
//                                 <div className="text-end w-100">
//                                     <p className="text-muted mb-0 fs-6 fs-md-5">
//                                         <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">
//                                             Transactions: {filteredData.filter(i => i.type === 'credit').length}
//                                         </span>
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="col-12 col-lg-6">
//                     <div className="card border-0 shadow-lg h-100 bg-gradient-light" style={{ minHeight: '180px' }}>
//                         <div className="card-body p-3 p-md-4 d-flex flex-column justify-content-between">
//                             <div>
//                                 <div className="d-flex align-items-center mb-2">
//                                     <i className="bi bi-arrow-up-circle fs-3 text-danger me-2"></i>
//                                     <h2 className="text-muted mb-0">Total Debit</h2>
//                                 </div>
//                                 <h1 className="display-5 display-md-4 fw-bold text-danger mb-3">₹ {totalDebit.toLocaleString()}</h1>
//                             </div>
//                             <div className="d-flex align-items-center justify-content-between">
//                                 <div className="text-end w-100">
//                                     <p className="text-muted mb-0 fs-6 fs-md-5">
//                                         <span className="badge bg-danger bg-opacity-10 text-danger px-3 py-2">
//                                             Transactions: {filteredData.filter(i => i.type === 'debit').length}
//                                         </span>
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Home;

// import React, { useEffect, useState } from 'react';
// import PaymentModal from './PaymentPage';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { addDayCredit, clearDayCredits, fetchCustomers } from '../redux/customerSlice';

// const Home = () => {
//     const customerList = useSelector(store => store.customer.customerDetails) ?? [];
//     const dayCusCredits = useSelector(store => store.customer.dayCusCredits) || [];
//     const dispatch = useDispatch();
//     const [selectedCustomer, setSelectedCustomer] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [selectedDate, setSelectedDate] = useState(() => {
//         return new Date().toISOString().split("T")[0];
//     });

//     const [searchQuery, setSearchQuery] = useState("");

//     const handleOpenModal = (customer) => {
//         setSelectedCustomer(customer);
//     };

//     const handleCloseModal = () => {
//         setSelectedCustomer(null);
//     };

//     const handlePaymentSubmit = ({ customerId, amount, paymentMethod }) => {
//         dispatch(addDayCredit({ customerId, date: selectedDate, amount, paymentMethod }))
//         handleCloseModal();
//     };

//     const filteredCustomers = customerList.filter((customer, index) => {
//         const search = searchQuery.toLowerCase();
//         return (
//             (index + 1).toString().includes(search) ||
//             // customer.mobile.toLowerCase().includes(search) ||
//             customer.shopName.toLowerCase().includes(search)
//         );
//     });

//     const getCreditByCustomer = (customerId) => {
//         const creditEntry = dayCusCredits.find(entry =>
//             entry.customerId === customerId
//         );
//         return creditEntry?.amount || 0;
//     };

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setLoading(false);
//         }, 500);

//         return () => clearTimeout(timer);
//     }, [customerList]);

//     useEffect(() => {
//         const fetch = async () => {
//             try {
//                 const data = await axios.get("http://localhost:5000/api/customers/get");
//                 dispatch(fetchCustomers([...data.data]))
//             } catch (error) {

//             }
//         }
//         fetch()
//     }, [])

//     if (loading) {
//         return (
//             <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
//                 <div className="spinner-border text-indigo-500" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </div>
//             </div>
//         );
//     }


//     return (
//         <div className="container-fluid py-4">
//             <div className="bg-primary text-white p-4 rounded-top shadow">
//                 <div className="d-flex justify-content-between align-items-center">
//                     <div>
//                         <h2 className="fw-bold mb-1">DAILY SALES REPORT</h2>
//                         <p className="mb-0">
//                             <i className="bi bi-calendar me-2"></i>
//                             {new Date(selectedDate).toLocaleDateString('en-US', {
//                                 weekday: 'long',
//                                 year: 'numeric',
//                                 month: 'long',
//                                 day: 'numeric'
//                             })}
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             <div className="d-flex justify-content-between align-items-center my-3 gap-2 flex-wrap">
//                 <input
//                     type="text"
//                     placeholder="Search by index, mobile or shop..."
//                     className="form-control form-control-sm p-2"
//                     style={{ maxWidth: "300px" }}
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                 />

//                 <input
//                     type="date"
//                     value={selectedDate}
//                     onChange={(e) => setSelectedDate(e.target.value)}
//                     className="form-control form-control-sm p-2"
//                     style={{ maxWidth: "200px" }}
//                 />
//             </div>

//             {/* Table */}
//             <div className="card shadow-sm border-top-0 rounded-top-0">
//                 <div className="card-body p-0">
//                     <div className="table-responsive">
//                         <table className="table table-hover align-middle mb-0">
//                             <thead className="table-light">
//                                 <tr>
//                                     <th width="5%" className="text-center">#</th>
//                                     <th width="30%">Shop Name</th>
//                                     <th width="15%" className="text-end">Debit</th>
//                                     <th width="15%" className="text-end">Credit</th>
//                                     <th width="15%" className="text-center">Pay</th>
//                                     <th width="20%" className="text-end">Balance</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredCustomers.map((customer, index) => {
//                                     const dailyCredit = getCreditByCustomer(customer.id);
//                                     const balance = (customer.balance || 0) - dailyCredit;
//                                     return (
//                                         <tr key={customer._id}>
//                                             <td className="text-center fw-bold">{index + 1}</td>
//                                             <td>
//                                                 <strong>{customer.shopName}</strong>
//                                             </td>
//                                             <td className="text-end text-danger fw-bold">
//                                                 ₹{(customer.balance || 0).toLocaleString('en-IN')}
//                                             </td>
//                                             <td className="text-end text-success fw-bold">
//                                                 ₹{dailyCredit.toLocaleString('en-IN')}
//                                             </td>
//                                             <td className="text-center">
//                                                 <button
//                                                     className="btn btn-sm btn-success px-3"
//                                                     onClick={() => handleOpenModal(customer)}
//                                                 >
//                                                     <i className="bi bi-cash-coin me-1"></i> Pay
//                                                 </button>
//                                             </td>
//                                             <td className="text-end fw-bold" style={{
//                                                 color: balance >= 0 ? '#28a745' : '#dc3545'
//                                             }}>
//                                                 ₹{balance.toLocaleString('en-IN')}
//                                             </td>
//                                         </tr>
//                                     );
//                                 })}
//                             </tbody>
//                             <tfoot className="table-secondary">
//                                 <tr>
//                                     <th colSpan="2" className="text-end">Totals:</th>
//                                     <th className="text-end text-danger">
//                                         ₹{filteredCustomers.reduce((sum, c) => sum + (c.balance || 0), 0).toLocaleString('en-IN')}
//                                     </th>
//                                     <th className="text-end text-success">
//                                         ₹{filteredCustomers.reduce((sum, c) => sum + getCreditByCustomer(c.id), 0).toLocaleString('en-IN')}
//                                     </th>
//                                     <th></th>
//                                     <th className="text-end fw-bold">
//                                         ₹{filteredCustomers.reduce((sum, c) =>
//                                             sum + ((c.balance || 0) - getCreditByCustomer(c.id)), 0
//                                         ).toLocaleString('en-IN')}
//                                     </th>
//                                 </tr>
//                             </tfoot>

//                         </table>
//                     </div>
//                 </div>
//             </div>

//             <div className="text-end p-3 border-top bg-light rounded-bottom">
//                 <button
//                     className="btn btn-primary px-4" onClick={() => dispatch(clearDayCredits())}
//                 >
//                     <i className="bi bi-check2-circle me-2"></i> Submit All Payments
//                 </button>
//             </div>

//             {/* Modal */}
//             {selectedCustomer && (
//                 <PaymentModal
//                     customer={selectedCustomer}
//                     onClose={handleCloseModal}
//                     onSubmit={handlePaymentSubmit}
//                 />
//             )}
//         </div>
//     );
// };

// export default Home;


import React, { useEffect, useState } from 'react';
import PaymentModal from './PaymentPage';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addDayCredit, clearDayCredits, fetchCustomers, postDayCredits } from '../redux/customerSlice';
import ConfirmationPopup from '../component/ConfirmPopup';

const Home = () => {
    const customerList = useSelector(store => store.customer.customerDetails) ?? [];
    const dayCusCredits = useSelector(store => store.customer.dayCusCredits) || [];
    const dispatch = useDispatch();
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedDate, setSelectedDate] = useState(() => {
        return new Date().toISOString().split("T")[0];
    });
    const [searchQuery, setSearchQuery] = useState("");

    const handleOpenModal = (customer) => {
        setSelectedCustomer(customer);
    };

    const todayTime = new Date();
    const selectedDateObj = new Date(selectedDate);

    selectedDateObj.setHours(todayTime.getHours());
    selectedDateObj.setMinutes(todayTime.getMinutes());
    selectedDateObj.setSeconds(todayTime.getSeconds());
    selectedDateObj.setMilliseconds(todayTime.getMilliseconds());
    const handleCloseModal = () => {
        setSelectedCustomer(null);
    };

    const handlePaymentSubmit = ({ customerId, amount, paymentMethod }) => {
        const todayTime = new Date();
        const selectedDateObj = new Date(selectedDate);

        selectedDateObj.setHours(todayTime.getHours());
        selectedDateObj.setMinutes(todayTime.getMinutes());
        selectedDateObj.setSeconds(todayTime.getSeconds());
        selectedDateObj.setMilliseconds(todayTime.getMilliseconds());

        dispatch(addDayCredit({ customerId, date: selectedDateObj.toISOString(), amount, paymentMethod }))
        handleCloseModal();
    };

    const filteredCustomers = customerList.filter((customer, index) => {
        const search = searchQuery.toLowerCase();
        return (
            (index + 1).toString().includes(search) ||
            customer.shopName.toLowerCase().includes(search)
        );
    });

    const getCreditByCustomer = (customerId) => {
        const creditEntry = dayCusCredits.find(entry =>
            entry.customerId === customerId
        );
        return creditEntry?.amount || 0;
    };

    const handleDayCredits = async () => {
        try {

            await dispatch(postDayCredits(dayCusCredits)).unwrap();

            const { data } = await axios.get("http://localhost:5000/api/customers/get");
            dispatch(fetchCustomers([...data]));

            dispatch(clearDayCredits());

        } catch (error) {
            console.error("Error in handleDayCredits:", error);
        }
    };


    const handleConfirmSubmit = () => {
        if (dayCusCredits.length !== 0) {
            handleDayCredits();
        }
        setShowConfirm(false);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [customerList]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await axios.get("http://localhost:5000/api/customers/get");
                dispatch(fetchCustomers([...data.data]))
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        }
        fetch()
    }, [])

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

        <div className="container-fluid px-0">
            {/* Header */}
            <div
                className="py-4 px-3"
                style={{
                    background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                    color: "#fff",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"
                }}
            >
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div>
                            <h1 className="h4 h-md-3 fw-bold mb-2" style={{ letterSpacing: "0.5px" }}>
                                <i className="bi bi-graph-up-arrow me-2"></i>DAILY SALES REPORT
                            </h1>
                            <p className="mb-0 opacity-75" style={{ fontSize: "0.9rem" }}>
                                <i className="bi bi-calendar3 me-2"></i>
                                {new Date(selectedDate).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>

                            {/* Mobile Date Picker - Only shows on small screens */}
                            <div className="mt-2 d-md-none">
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="form-control form-control-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="container-fluid mt-3">
                <div className="row g-2">
                    <div className="col-12 col-md-8">
                        <div className="input-group">
                            <span className="input-group-text bg-white border-end-0">
                                <i className="bi bi-search"></i>
                            </span>
                            <input
                                type="text"
                                placeholder="Search by shop name..."
                                className="form-control border-start-0"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-4 d-none d-md-block">
                        <div className="input-group">
                            <span className="input-group-text bg-white">
                                <i className="bi bi-calendar"></i>
                            </span>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary Cards - Mobile Stacked, Desktop Horizontal */}
            <div className="container-fluid mt-3">
                <div className="row g-2">
                    <div className="col-12 col-md-4">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body p-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="text-uppercase text-muted mb-1 small">Total Debit</h6>
                                        <h4 className="mb-0 text-danger h5 h-md-4">
                                            ₹{filteredCustomers.reduce((sum, c) => sum + (c.balance || 0), 0).toLocaleString('en-IN')}
                                        </h4>
                                    </div>
                                    <div className="bg-danger bg-opacity-10 p-2 rounded">
                                        <i className="bi bi-arrow-up-circle text-danger"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body p-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="text-uppercase text-muted mb-1 small">Total Credit</h6>
                                        <h4 className="mb-0 text-success h5 h-md-4">
                                            ₹{filteredCustomers.reduce((sum, c) => sum + getCreditByCustomer(c.id), 0).toLocaleString('en-IN')}
                                        </h4>
                                    </div>
                                    <div className="bg-success bg-opacity-10 p-2 rounded">
                                        <i className="bi bi-arrow-down-circle text-success"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body p-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="text-uppercase text-muted mb-1 small">Net Balance</h6>
                                        <h4 className="mb-0 text-primary h5 h-md-4">
                                            ₹{filteredCustomers.reduce((sum, c) =>
                                                sum + ((c.balance || 0) - getCreditByCustomer(c.id)), 0
                                            ).toLocaleString('en-IN')}
                                        </h4>
                                    </div>
                                    <div className="bg-primary bg-opacity-10 p-2 rounded">
                                        <i className="bi bi-cash-stack text-primary"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Customers Table - Desktop */}
            <div className="container-fluid mt-3 d-none d-md-block">
                <div className="card border-0 shadow-sm">
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th width="5%" className="text-center">#</th>
                                        <th width="30%">Shop Name</th>
                                        <th width="15%" className="text-center">Debit</th>
                                        <th width="15%" className="text-center">Credit</th>
                                        <th width="15%" className="text-center">Action</th>
                                        <th width="20%" className="text-center">Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCustomers.length > 0 ? (
                                        filteredCustomers.map((customer, index) => {
                                            const dailyCredit = getCreditByCustomer(customer.id);
                                            const balance = dailyCredit === 0 ? "0" : ((customer.balance || 0) - dailyCredit);
                                            return (
                                                <tr key={customer.id} className="border-top">
                                                    <td className="text-center fw-bold text-muted">{index + 1}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                                                                <i className="bi bi-shop text-primary"></i>
                                                            </div>
                                                            <div>
                                                                <strong>{customer.shopName}</strong>
                                                                <small className="d-block text-muted">{customer.mobile}</small>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-end">
                                                        <span className="badge bg-danger bg-opacity-10 text-danger p-2 fs-5 w-100">
                                                            ₹{(customer.balance || 0).toLocaleString('en-IN')}
                                                        </span>
                                                    </td>
                                                    <td className="text-end">
                                                        <span className="badge bg-success bg-opacity-10 text-success fs-5 p-2 w-100">
                                                            ₹{dailyCredit === 0 ? "0" : dailyCredit.toLocaleString('en-IN')}
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <button
                                                            className="btn btn-sm btn-outline-primary rounded-pill px-3"
                                                            onClick={() => handleOpenModal(customer)}
                                                        >
                                                            <i className="bi bi-plus-circle me-1"></i> Add Payment
                                                        </button>
                                                    </td>
                                                    <td className="text-end">
                                                        <span className={`badge p-2 fs-5 w-100 ${balance >= 0 ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}>
                                                            ₹{balance.toLocaleString('en-IN')}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4">
                                                <div className="d-flex flex-column align-items-center justify-content-center">
                                                    <i className="bi bi-exclamation-circle fs-1 text-muted mb-2"></i>
                                                    <h5 className="text-muted">No customers found</h5>
                                                    <p className="text-muted">Try adjusting your search query</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Customer Cards */}
            <div className="container-fluid mt-3 d-md-none">
                {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer, index) => {
                        const dailyCredit = getCreditByCustomer(customer.id);
                        const balance = dailyCredit === 0 ? "0" : ((customer.balance || 0) - dailyCredit);

                        return (
                            <div key={customer.id} className="card mb-3 border-0 shadow-sm">
                                <div className="card-body">
                                    {/* Customer Info */}
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                                                <i className="bi bi-shop text-primary"></i>
                                            </div>
                                            <div>
                                                <h6 className="fw-bold mb-1">{customer.shopName}</h6>
                                                <small className="text-muted">{customer.mobile}</small>
                                            </div>
                                        </div>
                                        <span className="badge bg-light text-dark">#{index + 1}</span>
                                    </div>

                                    {/* Payment Info */}
                                    <div className="row mt-3 g-2">
                                        <div className="col-6">
                                            <div className="p-2 bg-danger bg-opacity-10 rounded text-center">
                                                <small className="text-muted d-block">Debit</small>
                                                <span className="fw-bold text-danger">
                                                    ₹{(customer.balance || 0).toLocaleString('en-IN')}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="p-2 bg-success bg-opacity-10 rounded text-center">
                                                <small className="text-muted d-block">Credit</small>
                                                <span className="fw-bold text-success">
                                                    ₹{dailyCredit === 0 ? "0" : dailyCredit.toLocaleString('en-IN')}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-12 mt-2">
                                            <div className={`p-2 ${balance >= 0 ? 'bg-success bg-opacity-10' : 'bg-danger bg-opacity-10'} rounded text-center`}>
                                                <small className="text-muted d-block">Balance</small>
                                                <span className={`fw-bold ${balance >= 0 ? 'text-success' : 'text-danger'}`}>
                                                    ₹{balance.toLocaleString('en-IN')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="d-grid mt-3">
                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() => handleOpenModal(customer)}
                                        >
                                            <i className="bi bi-plus-circle me-1"></i> Add Payment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="card border-0 shadow-sm">
                        <div className="card-body text-center py-4">
                            <i className="bi bi-exclamation-circle fs-1 text-muted mb-2"></i>
                            <h5 className="text-muted">No customers found</h5>
                            <p className="text-muted">Try adjusting your search query</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <div className="container-fluid mt-3">
                <div className="d-flex justify-content-end">
                    <button
                        className="btn btn-primary px-4 rounded-pill"
                        onClick={() => setShowConfirm(true)}
                    >
                        <i className="bi bi-check-circle me-2"></i> Submit All
                    </button>
                </div>
            </div>

            {/* Modals */}
            {selectedCustomer && (
                <PaymentModal
                    customer={selectedCustomer}
                    onClose={handleCloseModal}
                    onSubmit={handlePaymentSubmit}
                />
            )}

            <ConfirmationPopup
                show={showConfirm}
                onHide={() => setShowConfirm(false)}
                onConfirm={handleConfirmSubmit}
                title="Submit All Payments"
                message={`Are you sure you want to submit ${dayCusCredits.length} payments? This action cannot be undone.`}
                confirmText="Submit"
                cancelText="Cancel"
                variant="primary"
            />
        </div>
    );
};

export default Home;