const CustomerBill = require('../models/customerbillModel');
const Customer = require('../models/customerModel');
const CustomerTransaction = require('../models/customerTransactionModel');

const addCustomerBill = async (req, res) => {
    try {
        const { id, billItems, date } = req.body;
        console.log(id)
        if (!id || !billItems || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const year = new Date().getFullYear();

        const allBills = await CustomerBill.find();
        const allInvoiceIds = allBills.flatMap(customer =>
            customer.bills.map(b => b.invoiceId)
        );

        const thisYearInvoices = allInvoiceIds.filter(inv => inv?.startsWith(`INV-${year}`));
        let maxNumber = 0;

        for (const inv of thisYearInvoices) {
            const num = parseInt(inv.split('-')[2]);
            if (num > maxNumber) maxNumber = num;
        }

        const newInvoiceId = `INV-${year}-${String(maxNumber + 1).padStart(4, '0')}`;

        const newBill = {
            invoiceId: newInvoiceId,
            billItems,
            date
        };

        let existing = await CustomerBill.findOne({ id });

        if (existing) {
            existing.bills.push(newBill);
            await existing.save();
        } else {
            existing = new CustomerBill({
                id,
                bills: [newBill]
            });
            await existing.save();
        }

        const totalAmount = billItems.reduce((sum, item) => sum + item.itemPrice * item.itemCount, 0);
        const customer = await Customer.findOne({ id });

        if (customer) {
            console.log(customer)
            customer.balance += totalAmount;
            await customer.save();
        }

        const transaction = await CustomerTransaction.findOne({ id });

        const newTransaction = {
            amount: totalAmount,
            date,
            type: 'debit',
            description: 'Customer payment',
            category: 'Payment'
        };

        if (transaction) {
            transaction.history.push(newTransaction);
            await transaction.save();
        } else {
            const newCustomerTransaction = new CustomerTransaction({
                id,
                history: [newTransaction]
            });
            await newCustomerTransaction.save();
        }

        res.status(201).json({
            message: 'Bill added successfully with transaction and balance updated',
            data: existing
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err });
    }
};

const getCustomerBills = async (req, res) => {
    try {
        const { id } = req.params;
        const customerBills = await CustomerBill.findOne({ id: Number(id) });

        if (!customerBills) {
            return res.status(404).json({ message: 'No bills found for this customer' });
        }

        res.status(200).json(customerBills);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bills', error });
    }
};
const updateCustomerBill = async (req, res) => {
    try {
        const { id, invoiceId } = req.params;
        const { billItems, date } = req.body;
        console.log(id, invoiceId, date)
        const customerBill = await CustomerBill.findOne({ id });
        if (!customerBill) {
            return res.status(404).json({ message: 'Customer bill not found' });
        }

        const billToUpdate = customerBill.bills.find(b => b.invoiceId === invoiceId);
        if (!billToUpdate) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        const oldTotal = billToUpdate.billItems.reduce((sum, item) => sum + item.itemCount * item.itemPrice, 0);
        const newTotal = billItems.reduce((sum, item) => sum + item.itemCount * item.itemPrice, 0);
        const diff = newTotal - oldTotal;

        billToUpdate.billItems = billItems;
        if (date) billToUpdate.date = date;

        await customerBill.save();

        const customer = await Customer.findOne({ id });
        if (customer) {
            customer.balance = customer.balance + diff;
            await customer.save();
        }

        const transactionRecord = await CustomerTransaction.findOne({ id: Number(id) });
        if (transactionRecord) {
            const transactionToUpdate = transactionRecord.history.find(h =>
                h.date === billToUpdate.date &&
                h.type === 'debit'
            );

            if (transactionToUpdate) {
                transactionToUpdate.amount = newTotal;
                if (date) transactionToUpdate.date = date;
                await transactionRecord.save();
            }
        }

        res.json({ message: 'Bill and transaction updated successfully', data: customerBill });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


const deleteCustomerBill = async (req, res) => {
    try {
        const { id, invoiceId } = req.params;

        const customer = await CustomerBill.findOne({ id });

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        const originalLength = customer.bills.length;

        customer.bills = customer.bills.filter(bill => bill.invoiceId !== invoiceId);

        if (customer.bills.length === originalLength) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        await customer.save();
        res.json({ message: 'Bill deleted successfully', customer });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    addCustomerBill,
    updateCustomerBill,
    deleteCustomerBill,
    getCustomerBills
};
