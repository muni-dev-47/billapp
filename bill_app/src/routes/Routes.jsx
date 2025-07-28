import React from 'react'
import { BrowserRouter, Routes as Router, Route } from 'react-router-dom'
import Bill from '../pages/Bill'
import Layout from '../layout/Layout';
import CustomerDetails from '../pages/CustomerDetails';
import AddCustomer from '../pages/AddCustomer';
import PurchaseHistory from '../pages/PurchaseHistory';
import EditBill from '../pages/EditBill';
import CreditHistory from '../pages/CreditHistory';
import TransactionHistory from '../pages/TransactionHistory';
import Home from '../pages/Home';

const Routes = () => {
    return (
        <BrowserRouter>
            <Router>
                <Route path='/' element={<Layout />}>
                    <Route path='/home' element={<Home />} />
                    <Route path='/bill' element={<Bill />} />
                    <Route path='/customerDetails' element={<CustomerDetails />} />
                    <Route path='/addCustomer' element={<AddCustomer />} />
                    <Route path='/purchaseHistory' element={<PurchaseHistory />} />
                    <Route path='/editBill' element={<EditBill />} />
                    <Route path='/creditHistory' element={<CreditHistory />} />
                    <Route path='/transactionHistory' element={<TransactionHistory />} />
                </Route>
            </Router>
        </BrowserRouter>
    )
}

export default Routes