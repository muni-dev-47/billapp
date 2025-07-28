const express = require('express');
const router = express.Router();
const {
    addCustomerBill,
    updateCustomerBill,
    deleteCustomerBill,
    getCustomerBills
} = require('../controllers/billController');

router.post('/add', addCustomerBill);

router.put('/update/:id/:invoiceId', updateCustomerBill);

router.delete('/delete/:id/:invoiceId', deleteCustomerBill);

router.get('/get/:id', getCustomerBills);

module.exports = router;
