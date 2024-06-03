const router = require('express').Router()

const furnitureService = require('../services/furnitureService')

router.get('/', async (req, res) => {

    const furnitures = await furnitureService.getAll()

    res.json(furnitures)
})

router.post('/', async (req, res) => {
    const furnitureData = req.body

    const furniture = await furnitureService.create(furnitureData)

    res.json(furniture)
})


router.get('/:furnitureId', async (req, res) => {


    const furniture = await furnitureService.getOne(req.params.furnitureId)

    res.json(furniture)
})
router.put('/:furnitureId', async (req, res) => {
    const furnitureData = req.body
    const furnitureId = req.params.furnitureId

    const furniture = await furnitureService.update(furnitureId, furnitureData)

    res.json(furniture)
})

router.delete('/:furnitureId', async (req, res) => {
    
    const furnitureId = req.params.furnitureId

    await furnitureService.delete(furnitureId)

    res.json({})
})





module.exports = router