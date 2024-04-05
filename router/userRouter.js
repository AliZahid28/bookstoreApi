const express = require('express')
const { getAllUser, createNewUser, loginUser, getSingleUser, updateUser } = require('../controller/userController')
const UserAuthCheck = require('../middleware/authentication')
const router = express.Router()

router.use('/get',UserAuthCheck)
router.use('/getSingleUser/:_id',UserAuthCheck)
router.use('/updateUser/:_id',UserAuthCheck)



//public routes
router.post('/create',createNewUser)
router.get('/login',loginUser)

//private routes
router.get('/get',getAllUser)
router.get('/getSingleUser/:_id',getSingleUser)
router.patch('/updateUser/:_id',updateUser)


module.exports = router