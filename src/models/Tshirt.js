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
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

TShirtSchema.methods.updateStockCount = function(count) {
    this.stockCount = count;
    this.updatedAt = Date.now();
    return this.save();
}

// Tshirt.pre('save', function(next) { this.updatedAt = Date.now(); next() })

const TShirt = mongoose.model('TShirt', TShirtSchema);

module.exports = TShirt;
