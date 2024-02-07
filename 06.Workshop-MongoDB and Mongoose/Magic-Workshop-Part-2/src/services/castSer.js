const Cast = require('../models/cast')
const Movie = require('../models/Movie')


exports.getAll = () => Cast.find()
exports.create = (castData) => Cast.create(castData)
exports.getByIds = (getByIds) => {
    
    const casts = Cast.find({ _id: { $in: getByIds }})

    return casts
}