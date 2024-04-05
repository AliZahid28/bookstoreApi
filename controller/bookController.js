const BookModel = require("../models/bookModel")


const createNewBook = async (req, res) => {
    try {
        const book = new BookModel(req.body)
        await book.save()
        return res.status(201).send(book)
    } catch (error) {
        return res.status(500).send(err)
    }
}

const getAllBooks = async (req, res) => {
    try {
        const books = await BookModel.find()
        return res.status(200).send(books)
    } catch (err) {
        return res.status(500).send(err)
    }
}

const getSingleBook = async (req, res) => {
    try {
        const { _id } = req?.params
        const books = await BookModel.findOne({ _id })
        return res.status(200).send(books)
    } catch (err) {
        return res.status(500).send(err)
    }
}



module.exports = {
    getAllBooks,
    createNewBook,
    getSingleBook
}