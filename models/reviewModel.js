const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    rating: { type: Number, default: 1, required: true },
    comment: { type: String, required: true }
})

const ReviewModel = new mongoose.model('Review', reviewSchema)

module.exports = ReviewModel