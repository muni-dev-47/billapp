const express = require('express');
const router = express.Router();
const { addCreditHistory , getCreditHistory} = require('../controllers/creditHistoryController');

router.post('/add', addCreditHistory);
router.get('/get/:customerId', getCreditHistory); 
module.exports = router;
