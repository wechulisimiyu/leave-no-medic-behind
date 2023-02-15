const mongoose = require("mongoose")
const Order = require('./Order')
const Schema = mongoose.Schema;

const mpesaSchema = new Schema({
  Order_ID: {
    type: String,
    required: true,
  },
  MerchantRequestID: {
    type: String,
    required: true,
  },
  CheckoutRequestID: {
    type: String,
    required: true,
  },
  ResultCode: {
    type: String,
    required: true,
  },
  ResultDesc: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: String,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  MpesaReceiptNumber: {
    type: String,
    required: true,
  },
  TransactionDate: {
    type: Date,
    required: true,
  },
});

// mpesaSchema.pre('save', function (next) {
//     const orderId = this.Order_ID;
//     Mpesa.findOne({ Order_ID: orderId }, (err, mpesa) => {
//         if (err) {
//             return next(err);
//         }

//         if (!mpesa) {
//             return next(new Error('No corresponding Order found'));
//         }

//         Order.findOneAndUpdate({ _id: orderId }, { $set:  ... }, { new: true }, (err, order) => {
//             if (err) {
//                 return next(err);
//             }
//             next();
//         });
//     });
// });

const Mpesa = mongoose.model("Mpesa", mpesaSchema);

module.exports = Mpesa;
