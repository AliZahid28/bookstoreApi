const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "Its discriptions of this book"
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }

})

const BookModel = new mongoose.model('Book', bookSchema)

module.exports = BookModel