const Customer = require("../models/customerModel");
const CustomerCreditHistory = require('../models/customerCreditHistorymodel');
const CustomerTransactionHistory = require('../models/customerTransactionModel');
const CustomerBills = require('../models/customerbillModel');

const addCustomer = async (req, res) => {
    try {
        const { id, name, mobile, address, shopName, balance } = req.body;
        console.log(id)
        if (!id || !name || !mobile || !address || !shopName) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existing = await Customer.findOne({ mobile, address });
        if (existing) {
            return res.status(409).json({ message: 'Customer already exists' });
        }

        const newCustomer = new Customer({
            id,
            name,
            mobile,
            address,
            shopName,
            balance
        });

        await newCustomer.save();
        res.status(201).json({ message: 'Customer added successfully', customer: newCustomer });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching customers', error });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const customer = await Customer.findOneAndDelete({ id });

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        await CustomerCreditHistory.findOneAndDelete({ customerId: id });
        await CustomerBills.findOneAndDelete({ id }); // Assuming 'id' is used in Bills
        await CustomerTransactionHistory.findOneAndDelete({ id }); // Same here

        res.json({ message: 'Customer and related data deleted successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, mobile, address, shopName, balance } = req.body;

        const customer = await Customer.findOne({ id });

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        if (name) customer.name = name;
        if (mobile) customer.mobile = mobile;
        if (address) customer.address = address;
        if (shopName) customer.shopName = shopName;
        if (balance !== undefined) customer.balance = balance;

        await customer.save();

        res.json({ message: 'Customer updated successfully', customer });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    addCustomer,
    updateCustomer,
    getAllCustomers,
    deleteCustomer
};