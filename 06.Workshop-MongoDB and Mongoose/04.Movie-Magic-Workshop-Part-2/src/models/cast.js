const mongoose = require('mongoose')


const castScheme = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    age: {
        type: Number,
        required: true,
        max: 120,
        min: 14
    },

    born: {
        type: String,
        required: true,
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



