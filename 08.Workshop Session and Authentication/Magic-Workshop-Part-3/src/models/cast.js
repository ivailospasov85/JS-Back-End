const mongoose = require('mongoose')


const castScheme = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minLength:5,
        match:/^[a-zA-Z0-9\s]+$/,
    },

    age: {
        type: Number,
        required: true,
        max: 120,
        min: 1
    },

    born: {
        type: String,
        required: true,
        match:/^[a-zA-Z0-9\s]+$/,
    },

    nameInMovie: {
        type: String,
        required: true,
    },

    castImage: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^https?:\/\//.test(value)
            },
            message: (props) => `${props.value} is invalid ulr for the castImage! `
        },
    },
    movies:[{
        type:mongoose.Types.ObjectId,
        ref:'Movie'
    }]

})

const Cast = mongoose.model('Cast', castScheme)

module.exports = Cast



