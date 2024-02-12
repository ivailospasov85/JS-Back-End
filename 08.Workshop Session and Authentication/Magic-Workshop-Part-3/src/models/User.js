const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const userScheme = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowerCase: true,
        unique: true,
        match: [/@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/, 'Invalid email address'],
        minLength:[10,'Email should be at least 10 characters'],
    },
    password: {
        type: String,
        match:[/^[a-zA-Z0-9]+$/,'Password should be alphanumeric'],
        required: true,
        minLength:[6,"Password too short"],

    }
})

userScheme.pre('save', async function () {

    const hash = await bcrypt.hash(this.password, 12)
    this.password = hash
})

userScheme.virtual('rePassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new MongooseError('Password mismatch')
        }

    })


const User = mongoose.model('User', userScheme)


module.exports = User