const { isValidObjectId } = require('mongoose');
const User = require('../models/userModel')
const bcrypt = require('bcrypt');


const createNewUser = async (req, res) => {
    try {
        const { email, username, password, address } = req.body
        const isUser = await User.find({ email: email })
        if (isUser.length > 0) {
            return res.status(400).send({ message: 'Email Already Exists' })
        } else {
            const user = new User(req.body)
            await user.save()
            return res.status(201).send(user)
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email && password) {
            const user = await User.findOne({ email })
            if (user) {
                const isMatch = await bcrypt.compare(password, user.password)
                if (isMatch) {
                    const { password: _, ...User } = user.toObject()
                    const token = await user.generateToken()
                    return res.status(200).send({ User, token })
                } else {
                    return res.status(404).send({
                        message: 'Invalid Credentials'
                    })
                }
            }
            else {
                return res.status(404).send({ message: 'Invalid Credentials' })
            }
        } else {
            return res.status(404).send({ message: 'credentials are required' })
        }
    } catch (err) {
        return res.status(500).send(err)
    }
}

const getAllUser = async (req, res) => {
    try {
        const users = await User.find()
        // .select('-password')
        return res.status(200).send(users)
    } catch (err) {
        return res.status(500).send(err)
    }
}

const getSingleUser = async (req, res) => {
    try {
        const { _id } = req?.params
        if (_id) {
            if (isValidObjectId(_id)) {
                const users = await User.findOne({ _id }).select('-password')
                return res.status(200).send(users)
            } else {
                return res.status(400).send({ message: 'Please Enter a Valid Id' })
            }

        } else {
            return res.status(400).send({ message: 'Please enter a user id' })
        }
    } catch (err) {
        return res.status(500).send(err)
    }
}

const updateUser = async (req, res) => {
    try {
        const {_id} = req.params
        const updatedUser = await User.findByIdAndUpdate(_id, req.body, { new: true });
        await updatedUser.save()
        return res.status(200).json({ message: 'User updated successfully.', updatedUser });
    } catch (err) {
        return res.status(500).send(err)
    }
}



module.exports = {
    getAllUser,
    createNewUser,
    loginUser,
    getSingleUser,
    updateUser
}