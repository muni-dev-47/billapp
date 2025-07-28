// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import PaymentModal from './PaymentPage';
// import { updateBalance } from '../redux/customerSlice';

// const CustomerDetails = () => {
//     const customerList = useSelector(store => store.customer.customerDetails) ?? [];
//     const dispatch = useDispatch();
//     const [showPaymentModal, setShowPaymentModal] = useState(false);
//     const [selectedCustomer, setSelectedCustomer] = useState(null);
//     const navigate = useNavigate();


//     const handlePaymentClick = (customer) => {
//         setSelectedCustomer(customer);
//         setShowPaymentModal(true);
//     };

//     const handlePaymentSubmit = (paymentData) => {
//         dispatch(updateBalance({ ...paymentData }))
//         setShowPaymentModal(false);
//     };
//     return (
//         <div className="container-fluid mt-3 px-2">
//             {showPaymentModal && selectedCustomer && (
//                 <PaymentModal
//                     customer={selectedCustomer}
//                     onClose={() => setShowPaymentModal(false)}
//                     onSubmit={handlePaymentSubmit}
//                 />
//             )}
//             <div className="row">
//                 <div className="col-12">
//                     {customerList.map((cus) => (
//                         <div key={cus.id} className="mb-3">
//                             <div className="card shadow-sm border-0 ">
//                                 <div className="d-block d-sm-none card-header bg-light py-2">
//                                     <h6 className="mb-0 text-truncate">{cus.name.toUpperCase()}</h6>
//                                 </div>

//                                 <div className="card-body p-2 p-sm-3">
//                                     <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start mb-2 mb-sm-3">
//                                         <h5 className="card-title mb-2 mb-sm-0 d-none d-sm-block">
//                                             {cus.name.toUpperCase()}
//                                         </h5>

//                                         <div className="d-flex align-items-center gap-4">
//                                             <div className="text-nowrap">
//                                                 <span className={`fs-5 p-2 rounded ${cus.balance > 0 ? 'bg-danger text-white' : cus.balance < 0 ? 'bg-success text-white' : 'bg-secondary text-white'}`}>
//                                                     <strong>Balance: ₹{(cus.balance || 0).toFixed(2)}</strong>
//                                                 </span>
//                                             </div>

//                                             <div className="btn-group gap-1">
//                                                 <button
//                                                     className="btn btn-sm btn-outline-secondary rounded-circle "
//                                                     onClick={() => navigate("/addCustomer", { state: { ...cus } })}
//                                                     aria-label="Edit"
//                                                 >
//                                                     <i className="bi bi-pencil"></i>
//                                                 </button>
//                                                 <button
//                                                     className="btn btn-sm btn-outline-success rounded-circle"
//                                                     aria-label="Payment"
//                                                     onClick={() => handlePaymentClick(cus)}
//                                                 >
//                                                     <i className="bi bi-cash"></i>
//                                                 </button>
//                                                 <button
//                                                     className="btn btn-sm btn-outline-primary rounded-circle"
//                                                     onClick={() => navigate("/bill", { state: { name: cus?.name, mobile: cus?.mobile, id: cus?.id } })}
//                                                     aria-label="Add Bill"
//                                                 >
//                                                     <i className="bi bi-plus"></i>
//                                                 </button>
//                                                 <button
//                                                     className="btn btn-sm btn-outline-danger rounded-circle"
//                                                     aria-label="Delete"
//                                                 >
//                                                     <i className="bi bi-trash"></i>
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="mb-3">
//                                         <div className="d-flex align-items-start mb-2">
//                                             <i className="bi bi-shop mt-1 me-2 flex-shrink-0"></i>
//                                             <span className="text-break">{cus.shopName || 'No shop name'}</span>
//                                         </div>
//                                         <div className="d-flex align-items-start mb-2">
//                                             <i className="bi bi-telephone mt-1 me-2 flex-shrink-0"></i>
//                                             <span>{cus.mobile}</span>
//                                         </div>
//                                         <div className="d-flex align-items-start">
//                                             <i className="bi bi-geo-alt mt-1 me-2 flex-shrink-0"></i>
//                                             <span className="text-break">{cus.address || 'No address provided'}</span>
//                                         </div>
//                                     </div>

//                                     <div className="d-flex flex-wrap gap-2">
//                                         <button className="btn btn-outline-info btn-sm rounded-pill px-3 py-1 flex-grow-1 flex-sm-grow-0" onClick={() => navigate("/purchaseHistory", { state: { id: cus.id } })}>
//                                             <i className="bi bi-clock-history me-1"></i>
//                                             <span className="d-none d-sm-inline">History</span>
//                                             <span className="d-inline d-sm-none">History</span>
//                                         </button>
//                                         <button className="btn btn-outline-warning btn-sm rounded-pill px-3 py-1 flex-grow-1 flex-sm-grow-0" onClick={() => navigate("/creditHistory", { state: { id: cus.id } })}>
//                                             <i className="bi bi-share me-1"></i>
//                                             <span className="d-none d-sm-inline">Credit</span>
//                                             <span className="d-inline d-sm-none">Credit</span>
//                                         </button>
//                                         <button className="btn btn-outline-dark btn-sm rounded-pill px-3 py-1 flex-grow-1 flex-sm-grow-0" onClick={() => navigate("/transactionHistory", { state: { id: cus.id } })}>
//                                             <i className="bi bi-journal-text me-1"></i>
//                                             <span className="d-none d-sm-inline">Transactions</span>
//                                             <span className="d-inline d-sm-none">Txns</span>
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CustomerDetails;







// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import PaymentModal from './PaymentPage';
// import { updateBalance } from '../redux/customerSlice';

// const CustomerDetails = () => {
//     const customerList = useSelector(store => store.customer.customerDetails) ?? [];
//     const dispatch = useDispatch();
//     const [showPaymentModal, setShowPaymentModal] = useState(false);
//     const [selectedCustomer, setSelectedCustomer] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const navigate = useNavigate();

//     const filteredCustomers = customerList.filter(customer =>
//         customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         customer.mobile.includes(searchTerm) ||
//         (customer.shopName && customer.shopName.toLowerCase().includes(searchTerm.toLowerCase()))
//     );

//     const handlePaymentClick = (customer) => {
//         setSelectedCustomer(customer);
//         setShowPaymentModal(true);
//     };

//     const handlePaymentSubmit = (paymentData) => {
//         dispatch(updateBalance({ ...paymentData }))
//         setShowPaymentModal(false);
//     };

//     return (
//         <div className="container-fluid py-4">
//             {showPaymentModal && selectedCustomer && (
//                 <PaymentModal
//                     customer={selectedCustomer}
//                     onClose={() => setShowPaymentModal(false)}
//                     onSubmit={handlePaymentSubmit}
//                 />
//             )}

//             <div className="row g-4">
//                 {customerList.length === 0 ? (
//                     <div className="col-12 text-center py-5">
//                         <div className="alert alert-info">
//                             <i className="bi bi-people-fill fs-1 d-block mb-3"></i>
//                             <h4>No customers found</h4>
//                             <p>Add your first customer to get started</p>
//                             <button
//                                 className="btn btn-primary mt-2"
//                                 onClick={() => navigate("/addCustomer")}
//                             >
//                                 <i className="bi bi-plus-circle"></i> Add Customer
//                             </button>
//                         </div>
//                     </div>
//                 ) : (
//                     customerList.map((cus) => (
//                         <div key={cus.id} className="col-12">
//                             <div className="card shadow-sm border-0 overflow-hidden">
//                                 <div className="card-header bg-gradient-primary text-dark py-3">
//                                     <div className="d-flex justify-content-between align-items-center">
//                                         <h5 className="mb-0">
//                                             <i className="bi bi-person-circle me-2"></i>
//                                             {cus.name.toUpperCase()}
//                                         </h5>
//                                         <span className={`d-inline-flex align-items-center ${cus.balance > 0 ? 'text-danger' : cus.balance < 0 ? 'text-success' : 'text-secondary'}`}>
//                                             <span className="fs-3 fw-bold me-1">₹{Math.abs(cus.balance || 0).toFixed(2)}</span>
//                                             <span className={`badge fs-5 ${cus.balance > 0 ? 'bg-danger' : cus.balance < 0 ? 'bg-success' : 'bg-secondary'} ms-2 align-middle`}>
//                                                 {'balance'}
//                                             </span>
//                                         </span>
//                                     </div>
//                                 </div>

//                                 {/* Card Body */}
//                                 <div className="card-body p-0">
//                                     <div className="row g-0">
//                                         <div className="col-md-8 p-4">
//                                             <div className="row g-3">
//                                                 <div className="col-sm-6">
//                                                     <div className="d-flex align-items-start mb-3">
//                                                         <i className="bi bi-shop fs-5 text-muted mt-1 me-2"></i>
//                                                         <div>
//                                                             <h6 className="mb-1 text-muted">Shop Name</h6>
//                                                             <p className="mb-0">{cus.shopName || 'Not specified'}</p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-sm-6">
//                                                     <div className="d-flex align-items-start mb-3">
//                                                         <i className="bi bi-telephone fs-5 text-muted mt-1 me-2"></i>
//                                                         <div>
//                                                             <h6 className="mb-1 text-muted">Mobile</h6>
//                                                             <p className="mb-0">{cus.mobile || 'Not provided'}</p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-12">
//                                                     <div className="d-flex align-items-start">
//                                                         <i className="bi bi-geo-alt fs-5 text-muted mt-1 me-2"></i>
//                                                         <div>
//                                                             <h6 className="mb-1 text-muted">Address</h6>
//                                                             <p className="mb-0">{cus.address || 'No address provided'}</p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {/* Action Buttons Column */}
//                                         <div className="col-md-4 bg-light p-4 border-start">
//                                             <div className="d-flex flex-column h-100 justify-content-between">
//                                                 <div className="btn-group-vertical w-100 mb-3">
//                                                     <button
//                                                         className="btn btn-outline-primary text-start py-2"
//                                                         onClick={() => navigate("/bill", { state: { name: cus?.name, mobile: cus?.mobile, id: cus?.id } })}
//                                                     >
//                                                         <i className="bi bi-plus-circle me-2"></i> Create Bill
//                                                     </button>
//                                                     <button
//                                                         className="btn btn-outline-success text-start py-2"
//                                                         onClick={() => handlePaymentClick(cus)}
//                                                     >
//                                                         <i className="bi bi-cash-coin me-2"></i> Receive Payment
//                                                     </button>
//                                                     <button
//                                                         className="btn btn-outline-secondary text-start py-2"
//                                                         onClick={() => navigate("/addCustomer", { state: { ...cus } })}
//                                                     >
//                                                         <i className="bi bi-pencil-square me-2"></i> Edit Details
//                                                     </button>
//                                                 </div>

//                                                 <div className="btn-group w-100">
//                                                     <button
//                                                         className="btn btn-outline-info flex-fill"
//                                                         onClick={() => navigate("/purchaseHistory", { state: { id: cus.id } })}
//                                                     >
//                                                         <i className="bi bi-clock-history"></i>
//                                                         <span className="d-none d-md-inline ms-1">History</span>
//                                                     </button>
//                                                     <button
//                                                         className="btn btn-outline-warning flex-fill"
//                                                         onClick={() => navigate("/creditHistory", { state: { id: cus.id } })}
//                                                     >
//                                                         <i className="bi bi-share"></i>
//                                                         <span className="d-none d-md-inline ms-1">Credit</span>
//                                                     </button>
//                                                     <button
//                                                         className="btn btn-outline-dark flex-fill"
//                                                         onClick={() => navigate("/transactionHistory", { state: { id: cus.id } })}
//                                                     >
//                                                         <i className="bi bi-journal-text"></i>
//                                                         <span className="d-none d-md-inline ms-1">Txns</span>
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CustomerDetails;







// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import PaymentModal from './PaymentPage';
// import { updateBalance } from '../redux/customerSlice';

// const CustomerDetails = () => {
//     const customerList = useSelector(store => store.customer.customerDetails) ?? [];
//     const dispatch = useDispatch();
//     const [showPaymentModal, setShowPaymentModal] = useState(false);
//     const [selectedCustomer, setSelectedCustomer] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const navigate = useNavigate();

//     const filteredCustomers = customerList.filter(customer =>
//         customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         customer.mobile.includes(searchTerm) ||
//         (customer.shopName && customer.shopName.toLowerCase().includes(searchTerm.toLowerCase()))
//     );

//     const handlePaymentClick = (customer) => {
//         setSelectedCustomer(customer);
//         setShowPaymentModal(true);
//     };

//     const handlePaymentSubmit = (paymentData) => {
//         dispatch(updateBalance({ ...paymentData }))
//         setShowPaymentModal(false);
//     };

//     return (
//         <div className="container-fluid py-4">
//             {showPaymentModal && selectedCustomer && (
//                 <PaymentModal
//                     customer={selectedCustomer}
//                     onClose={() => setShowPaymentModal(false)}
//                     onSubmit={handlePaymentSubmit}
//                 />
//             )}

//             {/* Search Bar */}
//             <div className="row mb-4 sticky-top bg-white py-2">
//                 <div className="col-12">
//                     <div className="card shadow-sm border-0">
//                         <div className="card-body p-2">
//                             <div className="input-group input-group-lg">
//                                 <span className="input-group-text bg-white border-end-0">
//                                     <i className="bi bi-search text-muted"></i>
//                                 </span>
//                                 <input
//                                     type="text"
//                                     className="form-control border-start-0 py-2"
//                                     placeholder="Search customers by name, mobile or shop..."
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                 />
//                                 {searchTerm && (
//                                     <button
//                                         className="btn btn-outline-secondary"
//                                         type="button"
//                                         onClick={() => setSearchTerm('')}
//                                     >
//                                         <i className="bi bi-x-lg"></i>
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="row g-4">
//                 {filteredCustomers.length === 0 ? (
//                     <div className="col-12 text-center py-5">
//                         <div className="alert alert-info">
//                             <i className="bi bi-people-fill fs-1 d-block mb-3"></i>
//                             <h4>
//                                 {searchTerm ? 'No matching customers found' : 'No customers found'}
//                             </h4>
//                             <p>
//                                 {searchTerm
//                                     ? 'Try a different search term'
//                                     : 'Add your first customer to get started'}
//                             </p>
//                             <button
//                                 className="btn btn-primary mt-2"
//                                 onClick={() => navigate("/addCustomer")}
//                             >
//                                 <i className="bi bi-plus-circle"></i> Add Customer
//                             </button>
//                         </div>
//                     </div>
//                 ) : (
//                     filteredCustomers.map((cus) => (
//                         <div key={cus.id} className="col-12">
//                             <div className="card shadow-sm border-0 overflow-hidden">
//                                 <div className="card-header bg-gradient-primary text-dark py-3">
//                                     <div className="d-flex justify-content-between align-items-center">
//                                         <h5 className="mb-0">
//                                             <i className="bi bi-person-circle me-2"></i>
//                                             {cus.name.toUpperCase()}
//                                         </h5>
//                                         <span className={`d-inline-flex align-items-center ${cus.balance > 0 ? 'text-danger' : cus.balance < 0 ? 'text-success' : 'text-success'}`}>
//                                             <span className="fs-3 fw-bold me-1">₹{Math.abs(cus.balance || 0).toFixed(2)}</span>
//                                             <span className={`badge fs-4 ${cus.balance > 0 ? 'bg-danger' : cus.balance < 0 ? 'bg-success' : 'bg-secondary'} ms-1 align-middle`}>
//                                                 {cus.balance > 0 ? 'Balance' : cus.balance < 0 ? 'Advance' : 'Settled'}
//                                             </span>
//                                         </span>
//                                     </div>
//                                 </div>

//                                 {/* Card Body */}
//                                 <div className="card-body p-0">
//                                     <div className="row g-0">
//                                         {/* Customer Info Column */}
//                                         <div className="col-md-8 p-4">
//                                             <div className="row g-3">
//                                                 <div className="col-sm-6">
//                                                     <div className="d-flex align-items-start mb-3">
//                                                         <i className="bi bi-shop fs-5 text-muted mt-1 me-2"></i>
//                                                         <div>
//                                                             <h6 className="mb-1 text-muted">Shop Name</h6>
//                                                             <p className="mb-0">{cus.shopName || 'Not specified'}</p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-sm-6">
//                                                     <div className="d-flex align-items-start mb-3">
//                                                         <i className="bi bi-telephone fs-5 text-muted mt-1 me-2"></i>
//                                                         <div>
//                                                             <h6 className="mb-1 text-muted">Mobile</h6>
//                                                             <p className="mb-0">{cus.mobile || 'Not provided'}</p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-12">
//                                                     <div className="d-flex align-items-start">
//                                                         <i className="bi bi-geo-alt fs-5 text-muted mt-1 me-2"></i>
//                                                         <div>
//                                                             <h6 className="mb-1 text-muted">Address</h6>
//                                                             <p className="mb-0">{cus.address || 'No address provided'}</p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {/* Action Buttons Column */}
//                                         <div className="col-md-4 bg-light p-4 border-start">
//                                             <div className="d-flex flex-column h-100 justify-content-between">
//                                                 <div className="btn-group-vertical w-100 mb-3">
//                                                     <button
//                                                         className="btn btn-outline-primary text-start py-2"
//                                                         onClick={() => navigate("/bill", { state: { name: cus?.name, mobile: cus?.mobile, id: cus?.id } })}
//                                                     >
//                                                         <i className="bi bi-plus-circle me-2"></i> Create Bill
//                                                     </button>
//                                                     <button
//                                                         className="btn btn-outline-success text-start py-2"
//                                                         onClick={() => handlePaymentClick(cus)}
//                                                     >
//                                                         <i className="bi bi-cash-coin me-2"></i> Receive Payment
//                                                     </button>
//                                                     <button
//                                                         className="btn btn-outline-secondary text-start py-2"
//                                                         onClick={() => navigate("/addCustomer", { state: { ...cus } })}
//                                                     >
//                                                         <i className="bi bi-pencil-square me-2"></i> Edit Details
//                                                     </button>
//                                                 </div>

//                                                 <div className="btn-group w-100">
//                                                     <button
//                                                         className="btn btn-outline-info flex-fill"
//                                                         onClick={() => navigate("/purchaseHistory", { state: { id: cus.id } })}
//                                                     >
//                                                         <i className="bi bi-bag-check"></i>
//                                                         <span className="d-none d-md-inline ms-1">History</span>
//                                                     </button>
//                                                     <button
//                                                         className="btn btn-outline-warning flex-fill"
//                                                         onClick={() => navigate("/creditHistory", { state: { id: cus.id } })}
//                                                     >
//                                                         <i className="bi bi-wallet2"></i>
//                                                         <span className="d-none d-md-inline ms-1">Credit</span>
//                                                     </button>
//                                                     <button
//                                                         className="btn btn-outline-dark flex-fill"
//                                                         onClick={() => navigate("/transactionHistory", { state: { id: cus.id } })}
//                                                     >
//                                                         <i className="bi bi-cash-coin"></i>
//                                                         <span className="d-none d-md-inline ms-1">Transaction</span>
//                                                     </button>
//                                                 </div>

//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CustomerDetails;









// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import PaymentModal from './PaymentPage';
// import { updateBalance } from '../redux/customerSlice';

// const CustomerDetails = () => {
//     const customerList = useSelector(store => store.customer.customerDetails) ?? [];
//     const dispatch = useDispatch();
//     const [showPaymentModal, setShowPaymentModal] = useState(false);
//     const [selectedCustomer, setSelectedCustomer] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const navigate = useNavigate();

//     const filteredCustomers = customerList.filter(customer =>
//         customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         customer.mobile.includes(searchTerm) ||
//         (customer.shopName && customer.shopName.toLowerCase().includes(searchTerm.toLowerCase()))
//     );

//     const handlePaymentClick = (customer) => {
//         setSelectedCustomer(customer);
//         setShowPaymentModal(true);
//     };

//     const handlePaymentSubmit = (paymentData) => {
//         dispatch(updateBalance({ ...paymentData }))
//         setShowPaymentModal(false);
//     };

//     return (
//         <div className="container-fluid px-3 py-3">
//             {showPaymentModal && selectedCustomer && (
//                 <PaymentModal
//                     customer={selectedCustomer}
//                     onClose={() => setShowPaymentModal(false)}
//                     onSubmit={handlePaymentSubmit}
//                 />
//             )}

//             <div className="row mb-4">
//                 <div className="col-12">
//                     <div className="d-flex justify-content-between align-items-center">
//                         <div>
//                             <h2 className="fw-bold mb-1">
//                                 <i className="bi bi-people-fill me-2 text-primary"></i>
//                                 Customers
//                             </h2>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="row mb-4 sticky-top bg-white py-2">
//                 <div className="col-12">
//                     <div className="card shadow-sm border">
//                         <div className="card-body p-2">
//                             <div className="input-group input-group-lg">
//                                 <span className="input-group-text bg-white border-end-0">
//                                     <i className="bi bi-search text-muted"></i>
//                                 </span>
//                                 <input
//                                     type="text"
//                                     className="form-control border-start-0 py-2"
//                                     placeholder="Search customers by name, mobile or shop..."
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                 />
//                                 {searchTerm && (
//                                     <button
//                                         className="btn btn-outline-secondary"
//                                         type="button"
//                                         onClick={() => setSearchTerm('')}
//                                     >
//                                         <i className="bi bi-x-lg"></i>
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Customer Cards */}
//             <div className="row g-4">
//                 {filteredCustomers.length === 0 ? (
//                     <div className="col-12 text-center py-5">
//                         <div className="card shadow-sm border-0">
//                             <div className="card-body py-5">
//                                 <i className="bi bi-people fs-1 text-muted mb-3"></i>
//                                 <h4 className="mb-2">
//                                     {searchTerm ? 'No matching customers found' : 'No customers available'}
//                                 </h4>
//                                 <p className="text-muted mb-4">
//                                     {searchTerm
//                                         ? 'Try adjusting your search query'
//                                         : 'Get started by adding your first customer'}
//                                 </p>
//                                 <button
//                                     className="btn btn-primary px-4"
//                                     onClick={() => navigate("/addCustomer")}
//                                 >
//                                     <i className="bi bi-plus-lg me-2"></i> Add Customer
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 ) : (
//                     filteredCustomers.map((cus) => (
//                         <div key={cus.id} className="col-12">
//                             <div className="card shadow-sm border-0 overflow-hidden">
//                                 <div className="card-header bg-light py-3">
//                                     <div className="d-flex justify-content-between align-items-center">
//                                         <h5 className="mb-0 text-dark">
//                                             <i className="bi bi-person-badge me-2"></i>
//                                             {cus.name.toUpperCase()}
//                                         </h5>
//                                         <span className={`d-inline-flex align-items-center ${cus.balance > 0 ? 'text-danger' : cus.balance < 0 ? 'text-success' : 'text-secondary'}`}>
//                                             <span className="fs-3 fw-bold me-1">₹{Math.abs(cus.balance || 0).toFixed(2)}</span>
//                                             <span className={`badge fs-4 ${cus.balance > 0 ? 'bg-danger' : cus.balance < 0 ? 'bg-success' : 'bg-secondary'} ms-1 align-middle`}>
//                                                 {cus.balance > 0 ? 'Balance' : cus.balance < 0 ? 'Advance Paid' : 'No Balance'}
//                                             </span>
//                                         </span>
//                                     </div>
//                                 </div>

//                                 <div className="card-body p-0">
//                                     <div className="row g-0">
//                                         <div className="col-md-8 p-4">
//                                             <div className="row g-3">
//                                                 <div className="col-sm-6">
//                                                     <div className="d-flex align-items-start mb-3">
//                                                         <i className="bi bi-shop fs-5 text-primary mt-1 me-2"></i>
//                                                         <div>
//                                                             <h6 className="mb-1 text-muted">Shop Name</h6>
//                                                             <p className="mb-0 fw-medium">{cus.shopName || 'Not specified'}</p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-sm-6">
//                                                     <div className="d-flex align-items-start mb-3">
//                                                         <i className="bi bi-telephone fs-5 text-primary mt-1 me-2"></i>
//                                                         <div>
//                                                             <h6 className="mb-1 text-muted">Mobile</h6>
//                                                             <p className="mb-0 fw-medium">{cus.mobile || 'Not provided'}</p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-12">
//                                                     <div className="d-flex align-items-start">
//                                                         <i className="bi bi-geo-alt fs-5 text-primary mt-1 me-2"></i>
//                                                         <div>
//                                                             <h6 className="mb-1 text-muted">Address</h6>
//                                                             <p className="mb-0 fw-medium">{cus.address || 'No address provided'}</p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="col-md-4 bg-light p-4 border-start">
//                                             <div className="d-flex flex-column h-100 justify-content-between">
//                                                 <div className="d-flex flex-column gap-2 w-100 mb-3">
//                                                     <div className="d-flex gap-2">
//                                                         <button
//                                                             className="btn btn-primary text-start py-2 d-flex align-items-center flex-grow-1"
//                                                             onClick={() => navigate("/bill", { state: { name: cus?.name, mobile: cus?.mobile, id: cus?.id } })}
//                                                         >
//                                                             <i className="bi bi-receipt me-2"></i>
//                                                             Create Bill
//                                                         </button>
//                                                         <button
//                                                             className="btn btn-success text-start py-2 d-flex align-items-center flex-grow-1"
//                                                             onClick={() => handlePaymentClick(cus)}
//                                                         >
//                                                             <i className="bi bi-cash-coin me-2"></i>
//                                                             Receive Payment
//                                                         </button>
//                                                     </div>

//                                                     <div className="d-flex gap-2">
//                                                         <button
//                                                             className="btn btn-secondary text-start py-2 d-flex align-items-center flex-grow-1"
//                                                             onClick={() => navigate("/addCustomer", { state: { ...cus } })}
//                                                         >
//                                                             <i className="bi bi-pencil-square me-2"></i>
//                                                             Edit Details
//                                                         </button>
//                                                         <button
//                                                             className="btn btn-danger text-start py-2 d-flex align-items-center flex-grow-1"
//                                                             onClick={() => console.log("Hello")}
//                                                         >
//                                                             <i className="bi bi-trash me-2"></i>
//                                                             Delete Customer
//                                                         </button>
//                                                     </div>
//                                                 </div>

//                                                 <div className="btn-group w-100 gap-2">
//                                                     <button
//                                                         className="btn btn-outline-info flex-fill d-flex align-items-center justify-content-center"
//                                                         onClick={() => navigate("/purchaseHistory", { state: { id: cus.id } })}
//                                                     >
//                                                         <i className="bi bi-bag-check me-1"></i>
//                                                         <span className="d-none d-md-inline">History</span>
//                                                     </button>
//                                                     <button
//                                                         className="btn btn-outline-warning flex-fill d-flex align-items-center justify-content-center"
//                                                         onClick={() => navigate("/creditHistory", { state: { id: cus.id } })}
//                                                     >
//                                                         <i className="bi bi-credit-card me-1"></i>
//                                                         <span className="d-none d-md-inline">Credit</span>
//                                                     </button>
//                                                     <button
//                                                         className="btn btn-outline-dark flex-fill d-flex align-items-center justify-content-center"
//                                                         onClick={() => navigate("/transactionHistory", { state: { id: cus.id } })}
//                                                     >
//                                                         <i className="bi bi-list-check me-1"></i>
//                                                         <span className="d-none d-md-inline">Transactions</span>
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CustomerDetails;


// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import PaymentModal from './PaymentPage';
// import { updateBalance } from '../redux/customerSlice';

// const CustomerDetails = () => {
//     const customerList = useSelector(store => store.customer.customerDetails) ?? [];
//     const dispatch = useDispatch();
//     const [showPaymentModal, setShowPaymentModal] = useState(false);
//     const [selectedCustomer, setSelectedCustomer] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const navigate = useNavigate();

//     const filteredCustomers = customerList.filter(customer =>
//         customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         customer.mobile.includes(searchTerm) ||
//         (customer.shopName && customer.shopName.toLowerCase().includes(searchTerm.toLowerCase()))
//     );

//     const handlePaymentClick = (customer) => {
//         setSelectedCustomer(customer);
//         setShowPaymentModal(true);
//     };

//     const handlePaymentSubmit = (paymentData) => {
//         dispatch(updateBalance({ ...paymentData }))
//         setShowPaymentModal(false);
//     };

//     return (
//         <div className="container-fluid px-3 py-3">
//             {showPaymentModal && selectedCustomer && (
//                 <PaymentModal
//                     customer={selectedCustomer}
//                     onClose={() => setShowPaymentModal(false)}
//                     onSubmit={handlePaymentSubmit}
//                 />
//             )}

//             <div className="row mb-4">
//                 <div className="col-12">
//                     <div className="d-flex justify-content-between align-items-center">
//                         <div>
//                             <h2 className="fw-bold mb-1">
//                                 <i className="bi bi-people-fill me-2 text-primary"></i>
//                                 Customers
//                             </h2>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="row mb-4 sticky-top bg-white py-2">
//                 <div className="col-12">
//                     <div className="card shadow-sm border">
//                         <div className="card-body p-2">
//                             <div className="input-group input-group-lg">
//                                 <span className="input-group-text bg-white border-end-0">
//                                     <i className="bi bi-search text-muted"></i>
//                                 </span>
//                                 <input
//                                     type="text"
//                                     className="form-control border-start-0 py-2"
//                                     placeholder="Search customers by name, mobile or shop..."
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                 />
//                                 {searchTerm && (
//                                     <button
//                                         className="btn btn-outline-secondary"
//                                         type="button"
//                                         onClick={() => setSearchTerm('')}
//                                     >
//                                         <i className="bi bi-x-lg"></i>
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="row g-4">
//                 {filteredCustomers.length === 0 ? (
//                     <div className="col-12 text-center py-5">
//                         <div className="card shadow-sm border-0">
//                             <div className="card-body py-5">
//                                 <i className="bi bi-people fs-1 text-muted mb-3"></i>
//                                 <h4 className="mb-2">
//                                     {searchTerm ? 'No matching customers found' : 'No customers available'}
//                                 </h4>
//                                 <p className="text-muted mb-4">
//                                     {searchTerm
//                                         ? 'Try adjusting your search query'
//                                         : 'Get started by adding your first customer'}
//                                 </p>
//                                 <button
//                                     className="btn btn-primary px-4"
//                                     onClick={() => navigate("/addCustomer")}
//                                 >
//                                     <i className="bi bi-plus-lg me-2"></i> Add Customer
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 ) : (
//                     filteredCustomers.map((cus) => (
//                         <div key={cus.id} className="col-12">
//                             <div className="card shadow-sm border-0 overflow-hidden">
//                                 <div className="card-body p-4">
//                                     <div className="row">
//                                         <div className="col-md-8">
//                                             <div className="d-flex flex-column h-100">
//                                                 <div className="d-flex justify-content-between align-items-center mb-3">
//                                                     <h4 className="mb-0 text-dark fw-bold">
//                                                         <i className="bi bi-person-badge me-2"></i>
//                                                         {cus.name.toUpperCase()}
//                                                     </h4>
//                                                     <span className={`d-inline-flex align-items-center ${cus.balance > 0 ? 'text-danger' : cus.balance < 0 ? 'text-success' : 'text-secondary'}`}>
//                                                         <span className="fs-4 fw-bold me-1">₹{Math.abs(cus.balance || 0).toFixed(2)}</span>
//                                                         <span className={`badge fs-5 border ${cus.balance > 0 ? 'text-danger border-danger' : cus.balance < 0 ? 'text-success border-success' : 'text-secondary border-secondary'} ms-1 align-middle`}>
//                                                             {cus.balance > 0 ? 'Balance' : cus.balance < 0 ? 'Advance Paid' : 'No Balance'}
//                                                         </span>
//                                                     </span>
//                                                 </div>

//                                                 <div className="d-flex align-items-center gap-4 mb-3">
//                                                     <div className="d-flex align-items-center">
//                                                         <i className="bi bi-telephone fs-5 text-primary me-2"></i>
//                                                         <div>
//                                                             <h6 className="mb-0 text-muted small">Mobile</h6>
//                                                             <p className="mb-0 fw-medium">{cus.mobile || 'Not provided'}</p>
//                                                         </div>
//                                                     </div>
//                                                     <div className="d-flex align-items-center">
//                                                         <i className="bi bi-shop fs-5 text-primary me-2"></i>
//                                                         <div>
//                                                             <h6 className="mb-0 text-muted small">Shop</h6>
//                                                             <p className="mb-0 fw-medium">{cus.shopName || 'Not specified'}</p>
//                                                         </div>
//                                                     </div>
//                                                 </div>

//                                                 {/* Address */}
//                                                 <div className="d-flex align-items-start">
//                                                     <i className="bi bi-geo-alt fs-5 text-primary mt-1 me-2"></i>
//                                                     <div>
//                                                         <h6 className="mb-1 text-muted small">Address</h6>
//                                                         <p className="mb-0 fw-medium">{cus.address || 'No address provided'}</p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {/* Right side - Action Buttons */}
//                                         <div className="col-md-4">
//                                             <div className="d-flex flex-column h-100">
//                                                 {/* Top 4 buttons */}
//                                                 <div className="d-flex flex-wrap gap-2 mb-3">
//                                                     <button
//                                                         className="btn btn-primary flex-grow-1 py-2 d-flex align-items-center justify-content-center"
//                                                         onClick={() => navigate("/bill", { state: { name: cus?.name, mobile: cus?.mobile, id: cus?.id } })}
//                                                     >
//                                                         <i className="bi bi-receipt me-2"></i>
//                                                         Create Bill
//                                                     </button>
//                                                     <button
//                                                         className="btn btn-success flex-grow-1 py-2 d-flex align-items-center justify-content-center"
//                                                         onClick={() => handlePaymentClick(cus)}
//                                                     >
//                                                         <i className="bi bi-cash-coin me-2"></i>
//                                                         Receive Payment
//                                                     </button>
//                                                     <button
//                                                         className="btn btn-outline-secondary flex-grow-1 py-2 d-flex align-items-center justify-content-center"
//                                                         onClick={() => navigate("/addCustomer", { state: { ...cus } })}
//                                                     >
//                                                         <i className="bi bi-pencil-square me-2"></i>
//                                                         Edit
//                                                     </button>
//                                                     <button
//                                                         className="btn btn-outline-danger flex-grow-1 py-2 d-flex align-items-center justify-content-center"
//                                                     // onClick={() => handleDeleteClick(cus)}
//                                                     >
//                                                         <i className="bi bi-trash me-2"></i>
//                                                         Delete
//                                                     </button>
//                                                 </div>

//                                                 {/* Bottom history buttons */}
//                                                 <div className="mt-auto">
//                                                     <div className="btn-group w-100 gap-2">
//                                                         <button
//                                                             className="btn btn-outline-info flex-fill d-flex align-items-center justify-content-center py-2"
//                                                             onClick={() => navigate("/purchaseHistory", { state: { id: cus.id } })}
//                                                         >
//                                                             <i className="bi bi-bag-check me-1"></i>
//                                                             <span className="d-none d-md-inline">History</span>
//                                                         </button>
//                                                         <button
//                                                             className="btn btn-outline-warning flex-fill d-flex align-items-center justify-content-center py-2"
//                                                             onClick={() => navigate("/creditHistory", { state: { id: cus.id } })}
//                                                         >
//                                                             <i className="bi bi-credit-card me-1"></i>
//                                                             <span className="d-none d-md-inline">Credit</span>
//                                                         </button>
//                                                         <button
//                                                             className="btn btn-outline-dark flex-fill d-flex align-items-center justify-content-center py-2"
//                                                             onClick={() => navigate("/transactionHistory", { state: { id: cus.id } })}
//                                                         >
//                                                             <i className="bi bi-list-check me-1"></i>
//                                                             <span className="d-none d-md-inline">Transactions</span>
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CustomerDetails;


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaymentModal from './PaymentPage';
import { deleteCustomerById, postCreditHistory, updateBalance } from '../redux/customerSlice';
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
        dispatch(updateBalance({ ...paymentData }))
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
            <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                <div className="spinner-border text-indigo-500" role="status">
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
                                                        onClick={() => navigate("/creditHistory", { state: { id: cus.id } })}
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