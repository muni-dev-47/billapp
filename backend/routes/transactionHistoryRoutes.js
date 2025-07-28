const express = require('express');
const router = express.Router();
const { addTransactionHistory , getTransactionHistory} = require('../controllers/transactionHistoryController');

router.post('/add', addTransactionHistory);
router.get('/get', getTransactionHistory); 

module.exports = router;
