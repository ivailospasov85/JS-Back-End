const { error } = require('server/router')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('../lib/jwt')
const { SECRET } = require("../config/config")



// TODO :Chek if user exist
exports.register = (userData) => {

    const user = User.findOne({ email: userData.email })

    if (user) {
        throw new Error('Email already exists')
    }


    return User.create(userData)
}


exports.login = async (email, password) => {
    // Get user from db
    const user = await User.findOne({ email })

    // check if user exist
    if (!user) {
        throw new Error('Cannot find email or password')
    }

    // check if password is valid
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
        throw new Error('Cannot find email or password')
    }

    // Generate jwt token
    const payload = {
        _id: user.id,
        email: user.email,
    }

    const token = await jwt.sign(payload, SECRET, { expiresIn: '2h' })

    return token

    // return token
}