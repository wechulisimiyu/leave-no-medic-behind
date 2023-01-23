const mongoose = require('mongoose');
const TShirt = require('./Tshirt')
const Order = require('./Order')

const PickupSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Order',
        required: true
      },
      pickUpPoint: {
          type: String, 
          enum: ['kenyatta-national-hospital', 'chiromo-campus'], 
          required: true
      },
      pickedUp: { 
          type: Boolean, 
          default: false 
      }
});

PickupSchema.pre('save', async function (next) {
    if (this.pickedUp) {
        const tshirt = await TShirt.findOne({ type: this.order.tshirtType, size: this.order.tshirtSize });
        if (!tshirt) {
          throw new Error("The requested tshirt is not available");
        }
        if (tshirt.stockCount === 0) {
          throw new Error("The requested tshirt is out of stock");
        }
        tshirt.stockCount--;
        await tshirt.save();
    }
    next();
});

const Pickup = mongoose.model('Pickup', PickupSchema);
module.exports = Pickup;
