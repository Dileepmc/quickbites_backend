const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    menuId: { type: Schema.Types.ObjectId, ref: 'Menu', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, default: 1 }
});

const cartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [cartItemSchema]
}, { versionKey: false });
 
const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
