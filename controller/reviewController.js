const BookModel = require("../models/bookModel")
const ReviewModel = require("../models/reviewModel")
const User = require("../models/userModel")

const createReview = async (req, res) => {
    try {
        const { user, book, rating, comment } = req.body

        const exitingUser = await User.findById(user)
        const existingBook = await BookModel.findById(book)

        if (!existingBook || !exitingUser) {
            return res.status(400).send({ message: 'User or Book not found' })
        }

        const newReview = new ReviewModel(req.body)
        await newReview.save()

        const populatedReview = await ReviewModel.findById(newReview?._id).populate('user', '-password').populate('book')
        return res.status(201).send({ message: 'Review Sent Successfully', Review: populatedReview })


    } catch (err) {
        return res.status(500).send(err)
    }
}

const getAllReview = async (req, res) => {
    try {
        // const reviews = await ReviewModel.find().populate('user','-password').populate('book')
        const reviews = await ReviewModel.find()
            .populate('user', '-password')
            .populate('book');
        return res.status(200).send(reviews)
    } catch (error) {
        return res.status(500).send(error)
    }
}



module.exports = {
    createReview,
    getAllReview

}