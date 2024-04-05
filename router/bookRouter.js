const express = require('express')
const { getAllBooks, createNewBook, getSingleBook } = require('../controller/bookController')
const UserAuthCheck = require('../middleware/authentication')
const router = express.Router()

router.use('/getAllBooks', UserAuthCheck)
router.use('/create', UserAuthCheck)
router.use('/getSingleBook/:_id', getSingleBook)

//private routes
router.post('/create', createNewBook)
router.get('/getAllBooks', getAllBooks)
router.get('/getSingleBook/:_id', getSingleBook)


module.exports = router