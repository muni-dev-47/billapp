const mongoose = require('mongoose');

const billItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    itemPrice: {
        type: String,
        required: true
    },
    itemCount: {
        type: String,
        required: true
    }
});

const billSchema = new mongoose.Schema({
    invoiceId: {
        type: String,
        required: true
    },
    billItems: [billItemSchema],
    date: {
        type: String,
        required: true
    }
});

const customerBillSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    bills: [billSchema]
});

module.exports = mongoose.model('CustomerBill', customerBillSchema);
