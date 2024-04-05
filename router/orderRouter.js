const express = require('express')
const UserAuthCheck = require('../middleware/authentication')
const { placeOrder, getAllOrder } = require('../controller/orderController')
const router = express.Router()

router.use('/placeOrder', UserAuthCheck)
router.use('/getAllOrder', UserAuthCheck)


//private routes
router.post('/placeOrder', placeOrder)
router.get('/getAllOrder', getAllOrder)



module.exports = router