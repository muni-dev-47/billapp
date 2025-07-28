const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['credit', 'debit'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const customerTransactionSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    history: [transactionSchema]
});

module.exports = mongoose.model('CustomerTransactionHistory', customerTransactionSchema);
