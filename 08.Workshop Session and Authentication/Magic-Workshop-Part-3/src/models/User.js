const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const userScheme = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowerCase: true
    },
    password: {
        type: String,
        required: true,

    }
})

userScheme.pre('save', async function () {

    const hash = await bcrypt.hash(this.password, 12)
    this.password = hash
})

userScheme.virtual('rePassword')
    .set(function (value) {
        if(value !== this.password){
             throw new MongooseError('Password mismatch')
         }
       
    })

    
const User = mongoose.model('User', userScheme)


module.exports = User