const BookModel = require("../models/bookModel");
const orderModel = require("../models/orderModel");
const User = require("../models/userModel");


const placeOrder = async (req, res) => {
    try {
        const { userId, items } = req.body

        const userExists = await User.findById(userId).select('-password');
        if (!userExists) {
            return res.status(400).send({ message: 'User not found' })
        }
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Items array is required and should not be empty.' });
        }

        let totalPrice = 0;
        for (const item of items) {
            const book = await BookModel.findById(item.book);
            if (!book) {
                return res.status(404).json({ message: 'Book not found.' });
            }
            totalPrice += book.price * item.quantity;
        }

        const newOrder = new orderModel({
            user: userId,
            items,
            totalPrice,
        });

        await newOrder.save()

        const populatedOrder = await orderModel.findById(newOrder._id)
            .populate('user', '-password')
            .populate('items.book')

        return res.status(201).send({ message: 'Order placed successfully.', orderDetails: populatedOrder })
    } catch (err) {
        return res.status(500).send(err)
    }
}

const getAllOrder = async (req, res) => {
    try {
        const orders = await orderModel.find().populate('user', '-password').populate('items.book')
        return res.status(200).send(orders)
    } catch (error) {
        return res.status(500).send(error)
    }
}


module.exports = {
    placeOrder,
    getAllOrder
}