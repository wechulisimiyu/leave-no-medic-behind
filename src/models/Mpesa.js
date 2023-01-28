const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mpesaSchema = new Schema({
    Order_ID: {
        type: String,
        required: true
    },
    MerchantRequestID: {
        type: String,
        required: true
    },
    CheckoutRequestID: {
        type: String,
        required: true
    },
    ResultCode: {
        type: String,
        required: true
    },
    ResultDesc: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: String,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    MpesaReceiptNumber: {
        type: String,
        required: true
    },
    TransactionDate: {
        type: Date,
        required: true
    }
});

const Mpesa = mongoose.model("Mpesa", mpesaSchema)

module.exports = Mpesa