const express = require('express')
const UserAuthCheck = require('../middleware/authentication')
const { createReview, getAllReview } = require('../controller/reviewController')
const router = express.Router()

router.use('/createReview', UserAuthCheck)


router.post('/createReview', createReview)
router.get('/getAllReview', getAllReview)






module.exports = router