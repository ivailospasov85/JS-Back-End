const Cast = require('../models/cast')



exports.getAll = () => Cast.find()
exports.create = (castData) => Cast.create(castData)