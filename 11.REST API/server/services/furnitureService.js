const Furniture = require('../models/Furniture')


exports.getAll = () => Furniture.find()

exports.getOne = (furnitureId) => Furniture.findById(furnitureId)

exports.create = (furnitureData) => Furniture.create(furnitureData)

exports.update = (furnitureId, furnitureData) => Furniture.findByIdAndUpdate(furnitureId, furnitureData)

exports.delete = (furnitureId) => Furniture.findByIdAndDelete(furnitureId)