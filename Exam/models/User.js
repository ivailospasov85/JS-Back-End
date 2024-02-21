const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({

  
    email: {
        type: String,
        required: [true,'Username is required'],
      minLength:10,
       
    },
    password: {
        type: String,
        required: [true,'Username is required'],
         minLength:4,
    },
    likedStones:{
        type:String
    }
})

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12)
})

const User = mongoose.model('User', userSchema)

module.exports = User