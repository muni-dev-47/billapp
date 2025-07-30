const CustomerCreditHistory = require('../models/customerCreditHistorymodel');
const CustomerTransaction = require("../models/customerTransactionModel");
const Customer = require("../models/customerModel");


const updateCreditHistory = async (req, res) => {
    try {
        const { customerId, amount, paymentMethod, date } = req.body;

        if (!customerId || !amount || !paymentMethod || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const creditDate = new Date(date);

        const creditHistory = await CustomerCreditHistory.findOne({ customerId });
        if (!creditHistory) {
            return res.status(404).json({ message: "Credit history not found" });
        }

        const historyIndex = creditHistory.history.findIndex(entry =>
            new Date(entry.date).getTime() === creditDate.getTime()
        );

        if (historyIndex === -1) {
            return res.status(404).json({ message: "Credit entry with given date not found" });
        }

        const oldAmount = creditHistory.history[historyIndex].amount;
        const customer = await Customer.findOne({ id: customerId });
        if (customer) {
            customer.balance = (customer.balance || 0) + oldAmount - amount;
            await customer.save();
        }

        creditHistory.history[historyIndex].amount = amount;
        creditHistory.history[historyIndex].paymentMethod = paymentMethod;
        await creditHistory.save();

        const txn = await CustomerTransaction.findOne({ id: customerId });
        if (txn) {
            const txnIndex = txn.history.findIndex(t =>
                new Date(t.date).getTime() === creditDate.getTime() && t.type === 'credit'
            );
            if (txnIndex !== -1) {
                txn.history[txnIndex].amount = amount;
                txn.history[txnIndex].paymentMethod = paymentMethod;
                await txn.save();
            }
        }

        return res.status(200).json({
            message: "Credit updated successfully",
            updatedCredit: creditHistory.history[historyIndex],
            updatedBalance: customer?.balance ?? null
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



const deleteCreditHistory = async (req, res) => {
    try {
        const { customerId, date } = req.params;
        console.log(customerId)
        if (!customerId || !date) {
            return res.status(400).json({ message: "Customer ID and date required" });
        }

        const creditDate = new Date(date);

        const creditHistory = await CustomerCreditHistory.findOne({ customerId });
        if (!creditHistory) {
            return res.status(404).json({ message: "Credit history not found" });
        }

        const historyIndex = creditHistory.history.findIndex(
            (entry) => new Date(entry.date).getTime() === creditDate.getTime()
        );
        if (historyIndex === -1) {
            return res.status(404).json({ message: "Credit entry not found for the given date" });
        }

        const amountToSubtract = creditHistory.history[historyIndex].amount;

        const customer = await Customer.findOne({ id: customerId });
        if (customer) {
            customer.balance = (customer.balance || 0) + amountToSubtract;
            await customer.save();
        }

        creditHistory.history.splice(historyIndex, 1);
        await creditHistory.save();

        const txn = await CustomerTransaction.findOne({ id: customerId });
        if (txn) {
            const txnIndex = txn.history.findIndex(
                (entry) =>
                    new Date(entry.date).getTime() === creditDate.getTime() &&
                    entry.type === "credit"
            );
            if (txnIndex !== -1) {
                txn.history.splice(txnIndex, 1);
                await txn.save();
            }
        }

        return res.status(200).json({
            message: "Credit entry deleted successfully",
            updatedBalance: customer?.balance ?? null
        });

    } catch (error) {
        console.error("Delete error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};



const updateDayCredits = async (req, res) => {
    try {
        const { dayCusCredits } = req.body;

        if (!Array.isArray(dayCusCredits)) {
            return res.status(400).json({ message: 'Invalid credits data' });
        }

        for (const credit of dayCusCredits) {
            const { customerId, date, amount, paymentMethod } = credit;

            let creditHistory = await CustomerCreditHistory.findOne({ customerId });

            if (!creditHistory) {
                creditHistory = new CustomerCreditHistory({
                    customerId,
                    history: [],
                });
            }

            creditHistory.history.push({ date, amount, paymentMethod });
            await creditHistory.save();

            let transactionHistory = await CustomerTransaction.findOne({ id: customerId });

            if (!transactionHistory) {
                transactionHistory = new CustomerTransaction({
                    customerId,
                    history: [],
                });
            }

            transactionHistory.history.push({
                date,
                type: 'credit',
                amount,
                paymentMethod,
                description: 'Customer payment',
                category: 'Payment',
            });

            await transactionHistory.save();

            const customer = await Customer.findOne({ id: customerId });

            if (customer) {
                customer.balance -= amount;
                await customer.save();
            }
        }

        res.status(200).json({ message: 'Day credits updated successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
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
    getCreditHistory,
    updateDayCredits,
    updateCreditHistory,
    deleteCreditHistory
};
