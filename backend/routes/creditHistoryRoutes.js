const express = require('express');
const router = express.Router();
const { getCreditHistory, updateDayCredits, addCreditHistory, updateCreditHistory, deleteCreditHistory } = require('../controllers/creditHistoryController');

router.post('/add', addCreditHistory);
router.get('/get/:customerId', getCreditHistory);
router.post("/dayCredits", updateDayCredits);
router.post("/updateCredit", updateCreditHistory)
router.delete("/deleteCreditHistory/:customerId/:date", deleteCreditHistory)

module.exports = router;
