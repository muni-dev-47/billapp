const CustomerTransactionHistory = require('../models/customerTransactionModel');

const addTransactionHistory = async (req, res) => {
    try {
        const { id, amount, date, type, description, category } = req.body;

        if (!id || !amount || !date || !type || !description || !category) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newTransaction = {
            amount,
            date,
            type,
            description,
            category
        };

        // Check if transaction history exists for the customer
        let customerHistory = await CustomerTransactionHistory.findOne({ id });

        if (customerHistory) {
            // Add to existing history
            customerHistory.history.push(newTransaction);
        } else {
            // Create new customer with initial transaction
            customerHistory = new CustomerTransactionHistory({
                id,
                history: [newTransaction]
            });
        }

        await customerHistory.save();
        res.status(201).json({ message: 'Transaction added successfully', data: customerHistory });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// const getTransactionHistory = async (req, res) => {
//     try {
//         const transactionData = await CustomerTransactionHistory.find({}); // get all docs

//         if (!transactionData || transactionData.length === 0) {
//             return res.status(404).json({ message: 'No transaction histories found' });
//         }

//         res.status(200).json(transactionData);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching transaction histories', error });
//     }
// };

// const getCustomerTransactionHistory = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const customerHistory = await CustomerTransactionHistory.findOne({ id });

//         if (!customerHistory) {
//             return res.status(404).json({ message: 'No transaction history found for this customer' });
//         }

//         res.json({ history: customerHistory.history });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error' });
//     }
// };


module.exports = {
    // getCustomerTransactionHistory,
    addTransactionHistory,
    // getTransactionHistory
};
