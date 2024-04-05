const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const UserAuthCheck = async(req, res, next) => {
    let token
    const { authorization } = req.headers
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(' ')[1]
            const {_id} = await jwt.verify(token , process.env.jwt_SecretKey)
            next()
        } catch (err) {
            return res.status(401).send({ message: 'Unauthorized User' })
        }
    }
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized User,no token' })
    }
}

module.exports = UserAuthCheck