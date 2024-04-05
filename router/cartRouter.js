const express = require('express')
const UserAuthCheck = require('../middleware/authentication')
const { CreateNewCart, getAllCart, deleteCart } = require('../controller/cartController')
const router = express.Router()

router.use('/create', UserAuthCheck)
router.use('/getAllCart', UserAuthCheck)
router.use('/deleteCart', UserAuthCheck)



router.post('/create', CreateNewCart)
router.get('/getAllCart', getAllCart)
router.delete('/deleteCart/:_id', deleteCart)



module.exports = router