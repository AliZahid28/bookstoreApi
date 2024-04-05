const BookModel = require("../models/bookModel");
const CartModel = require("../models/cartModel");
const User = require("../models/userModel");

const CreateNewCart = async (req, res) => {
    try {
        const { userId, bookId, quantity } = req.body;

        // Check if the user and book exist
        const userExists = await User.findById(userId);
        const bookExists = await BookModel.findById(bookId);

        if (!userExists || !bookExists) {
            return res.status(404).json({ message: 'User or book not found.' });
        }

        // // Check if the book is already in the user's cart
        const cart = await CartModel.findOne({ user: userId });
        const existingCartItem = cart ? cart.items.find(item => item.book.toString() === bookId) : null;
        console.log('resposne =====', existingCartItem)

        if (existingCartItem) {
            existingCartItem.quantity += quantity || 1;
        } else {
            if (!cart) {
                const newCart = new CartModel({ user: userId, items: [] });
                newCart.items.push({ book: bookId, quantity: quantity || 1 });
                await newCart.save();
                return res.status(200).json({ message: 'new Book added to cart of new user successfully.', newCart });
            } else {
                cart.items.push({ book: bookId, quantity: quantity || 1 });
                await cart.save();
                return res.status(200).json({ message: 'new Book added to cart of old user successfully.', cart });
            }
        }

        await cart.save();

        return res.status(200).json({ message: 'existing Book added to cart to existing user successfully.', cart });
    } catch (err) {
        return res.status(500).send(err)
    }
}

const getAllCart = async (req, res) => {
    try {
        const carts = await CartModel.find() //populate
            .populate({
                path: 'user',
                select: '-password'
            })
            .populate('items.book');
        // const carts = await CartModel.find()
        return res.status(200).send(carts)
    } catch (error) {
        return res.status(500).send(error)
    }
}

const deleteCart = async (req, res) => {
    try {
        const { _id } = req.params; 
        const {itemId} = req.body; 
        const cart = await CartModel.findById({_id});
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        const updatedItems = cart.items.filter(item => item._id.toString() !== itemId);
        cart.items = updatedItems;
        await cart.save();

        return res.status(200).json({ message: 'Item deleted successfully', cart });
    } catch (err) {
        return res.status(500).send(err);
    }
}

module.exports = {
    CreateNewCart,
    getAllCart,
    deleteCart
}