const express = require("express");
const router = express.Router();

const {
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getAllCustomers
} = require('../controllers/customerController');

router.post('/add', addCustomer);

router.put('/update/:id', updateCustomer);

router.delete('/delete/:id', deleteCustomer);

router.get('/get', getAllCustomers);


module.exports = router;