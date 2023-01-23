const mongoose = require('mongoose');

const TShirtSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['polo', 'round'],
        required: true
    },
    size: {
        type: String,
        enum: ['small', 'medium', 'large'],
        required: true
    },
    stockCount: {
        type: Number,
        required: true,
        default: 0 
    }
});

const TShirt = mongoose.model('TShirt', TShirtSchema);

module.exports = TShirt;
