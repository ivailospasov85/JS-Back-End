const Stones = require("../models/Stones");
const User = require('../models/User')


exports.getAll = () => Stones.find()

exports.getOne = (stoneId) => Stones.findById(stoneId)

exports.getOneWhitPopulate = (stoneId) => this.getOne(stoneId).populate('owner').populate('likedList')

exports.getLast3Stones = () => Stones.find().sort({ createdAt: -1 }).limit(3)


exports.create = async (userId, stoneDate) => {
    const createdStone = await Stones.create({
        owner: userId,
        ...stoneDate,
    })


    return createdStone
}

exports.edit = (stoneId, stoneDate) => Stones.findByIdAndUpdate(stoneId, stoneDate, { runValidators: true })

exports.delete = (stoneId) => Stones.findByIdAndDelete(stoneId)


exports.search = (name) => {
    let result = {}
    if (name) {
        result = result.filter(stone => stone.name.toLowerCase().includes(name.toLowerCase()))
       
    }

    return Stones.find(result)

}

exports.likenUp = async (stoneId, userId) => {
    await Stones.findByIdAndUpdate(stoneId, { $push: { likedList: userId } }, { runValidators: true })
    await User.findByIdAndUpdate(userId, { $push: { likedStones: stoneId } }, { runValidators: true })
}