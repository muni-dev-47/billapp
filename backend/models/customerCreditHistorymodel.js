const mongoose = require('mongoose');

const creditEntrySchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const customerCreditHistorySchema = new mongoose.Schema({
    customerId: {
        type: Number,
        required: true,
        unique: true
    },
    history: [creditEntrySchema]
});

module.exports = mongoose.model('CustomerCreditHistory', customerCreditHistorySchema);
