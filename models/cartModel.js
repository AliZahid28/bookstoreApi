const { Schema } = require('mongoose');
const mongoose = require('mongoose')


const cartSchema =  mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, // Reference to the User model
    items: [{
        book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
        quantity: { type: Number, default: 1 }
    }],
});

const CartModel = new mongoose.model('Cart', cartSchema)

module.exports = CartModel