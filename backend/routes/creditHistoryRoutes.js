const express = require('express');
const router = express.Router();
const { getCreditHistory, updateDayCredits, updateCreditHistory, deleteCreditHistory } = require('../controllers/creditHistoryController');

router.get('/get/:customerId', getCreditHistory);
router.post("/dayCredits", updateDayCredits);
router.post("/updateCredit", updateCreditHistory)
router.delete("/deleteCreditHistory/:customerId/:date", deleteCreditHistory)
module.exports = router;
