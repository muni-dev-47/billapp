import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
    const customersTransactionHistory = useSelector(store => store.customer.customersTransactionHistory) || [];

    const [selectedYear, setSelectedYear] = useState('all');
    const [selectedMonth, setSelectedMonth] = useState('all');
    const [selectedDay, setSelectedDay] = useState('all');

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const years = useMemo(() => {
        const unique = new Set(customersTransactionHistory.flatMap(cus => cus.history.map(e => new Date(e.date).getFullYear())));
        return Array.from(unique).sort((a, b) => b - a);
    }, [customersTransactionHistory]);

    const getDaysInMonth = (year, monthIndex) => {
        return new Date(year, monthIndex + 1, 0).getDate();
    };

    const availableDays = useMemo(() => {
        if (selectedYear === 'all' || selectedMonth === 'all') {
            return Array.from({ length: 31 }, (_, i) => i + 1);
        }

        const year = parseInt(selectedYear);
        const monthIndex = months.indexOf(selectedMonth);
        const daysInMonth = getDaysInMonth(year, monthIndex);
        return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    }, [selectedYear, selectedMonth]);

    const filteredData = useMemo(() => {
        return customersTransactionHistory.flatMap(cus => cus.history).filter(entry => {
            const date = new Date(entry.date);
            const yearMatch = selectedYear === 'all' || date.getFullYear() === parseInt(selectedYear);
            const monthMatch = selectedMonth === 'all' || date.getMonth() === months.indexOf(selectedMonth);
            const dayMatch = selectedDay === 'all' || date.getDate() === parseInt(selectedDay);
            return yearMatch && monthMatch && dayMatch;
        });
    }, [selectedYear, selectedMonth, selectedDay, customersTransactionHistory]);

    useEffect(() => {
        if (selectedYear === 'all') setSelectedMonth('all');
    }, [selectedYear]);

    useEffect(() => {
        if (selectedMonth === 'all') setSelectedDay('all');
    }, [selectedMonth]);

    const totalCredit = filteredData
        .filter(item => item.type === 'credit')
        .reduce((sum, item) => sum + item.amount, 0);

    const totalDebit = filteredData
        .filter(item => item.type === 'debit')
        .reduce((sum, item) => sum + item.amount, 0);

    return (
        <div className="container py-3 py-md-5">
            <h1 className="mb-3 mb-md-4 display-5 fw-bold text-primary">{"Daily Sales Report".toUpperCase()}</h1>
            <div className="row g-2 g-md-3 mb-4 mb-md-5">
                <div className="col-12 col-md-4">
                    <label className="form-label fw-semibold">Year</label>
                    <select
                        className="form-select shadow-sm"
                        value={selectedYear}
                        onChange={e => setSelectedYear(e.target.value)}
                    >
                        <option value="all">All Years</option>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                </div>
                <div className="col-12 col-md-4">
                    <label className="form-label fw-semibold">Month</label>
                    <select
                        className="form-select shadow-sm"
                        value={selectedMonth}
                        onChange={e => setSelectedMonth(e.target.value)}
                        disabled={selectedYear === 'all'}
                    >
                        <option value="all">All Months</option>
                        {months.map((m, i) => <option key={i} value={m}>{m}</option>)}
                    </select>
                </div>
                <div className="col-12 col-md-4">
                    <label className="form-label fw-semibold">Day</label>
                    <select
                        className="form-select shadow-sm"
                        value={selectedDay}
                        onChange={e => setSelectedDay(e.target.value)}
                        disabled={selectedMonth === 'all' || selectedYear === 'all'}
                    >
                        <option value="all">All Days</option>
                        {availableDays.map(day => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Credit and Debit Cards */}
            <div className="row g-3 g-md-4">
                <div className="col-12 col-lg-6">
                    <div className="card border-0 shadow-lg h-100 bg-gradient-light" style={{ minHeight: '180px' }}>
                        <div className="card-body p-3 p-md-4 d-flex flex-column justify-content-between">
                            <div>
                                <div className="d-flex align-items-center mb-2">
                                    <i className="bi bi-arrow-down-circle fs-3 text-success me-2"></i>
                                    <h2 className="text-muted mb-0">Total Credit</h2>
                                </div>
                                <h1 className="display-5 display-md-4 fw-bold text-success mb-3">₹ {totalCredit.toLocaleString()}</h1>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="text-end w-100">
                                    <p className="text-muted mb-0 fs-6 fs-md-5">
                                        <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">
                                            Transactions: {filteredData.filter(i => i.type === 'credit').length}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className="card border-0 shadow-lg h-100 bg-gradient-light" style={{ minHeight: '180px' }}>
                        <div className="card-body p-3 p-md-4 d-flex flex-column justify-content-between">
                            <div>
                                <div className="d-flex align-items-center mb-2">
                                    <i className="bi bi-arrow-up-circle fs-3 text-danger me-2"></i>
                                    <h2 className="text-muted mb-0">Total Debit</h2>
                                </div>
                                <h1 className="display-5 display-md-4 fw-bold text-danger mb-3">₹ {totalDebit.toLocaleString()}</h1>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="text-end w-100">
                                    <p className="text-muted mb-0 fs-6 fs-md-5">
                                        <span className="badge bg-danger bg-opacity-10 text-danger px-3 py-2">
                                            Transactions: {filteredData.filter(i => i.type === 'debit').length}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;