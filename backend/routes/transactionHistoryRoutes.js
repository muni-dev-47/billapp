const express = require('express');
const router = express.Router();
const { addTransactionHistory, getTransactionHistory, getCustomerTransactionHistory } = require('../controllers/transactionHistoryController');

router.post('/add', addTransactionHistory);
router.get('/get', getTransactionHistory);
router.get('/get/:id', getCustomerTransactionHistory);

module.exports = router;
