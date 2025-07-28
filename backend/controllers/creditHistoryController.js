const CustomerCreditHistory = require('../models/customerCreditHistorymodel');
const CustomerTransaction = require("../models/customerTransactionModel");
const Customer = require("../models/customerModel");
const addCreditHistory = async (req, res) => {
    try {
        const { customerId, amount, paymentMethod, date } = req.body;

        if (!customerId || !amount || !paymentMethod || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newEntry = {
            amount,
            paymentMethod,
            date: new Date(date)
        };

        let customerHistory = await CustomerCreditHistory.findOne({ customerId });

        if (customerHistory) {
            customerHistory.history.push(newEntry);
        } else {
            customerHistory = new CustomerCreditHistory({
                customerId,
                history: [newEntry]
            });
        }
        await customerHistory.save();

        const customer = await Customer.findOne({ id: customerId });
        if (customer) {
            customer.balance = (customer.balance || 0) - amount;
            await customer.save();
        }

        let txn = await CustomerTransaction.findOne({ id: customerId });
        const transactionEntry = {
            amount,
            date: new Date(date),
            type: 'credit',
            description: 'Sales payment',
            category: 'Sales'
        };

        if (txn) {
            txn.history.push(transactionEntry);
        } else {
            txn = new CustomerTransaction({
                id: customerId,
                history: [transactionEntry]
            });
        }
        await txn.save();

        res.status(201).json({
            message: 'Credit history, balance, and transaction updated successfully',
            data: {
                creditHistory: customerHistory,
                transactionHistory: txn,
                updatedCustomer: customer
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
const getCreditHistory = async (req, res) => {
    try {
        const { customerId } = req.params;

        const creditData = await CustomerCreditHistory.findOne({ customerId: Number(customerId) });

        if (!creditData) {
            return res.status(404).json({ message: 'No credit history found for this customer' });
        }

        res.status(200).json(creditData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching credit history', error });
    }
};

module.exports = {
    addCreditHistory,
    getCreditHistory
};
