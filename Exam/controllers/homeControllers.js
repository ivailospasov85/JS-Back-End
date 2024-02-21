
const stoneServices = require('../services/stoneServices')
const router = require('express').Router()

router.get('/', async (req, res) => {
    const last3Stones = await stoneServices.getLast3Stones().lean()
    res.render('home', { last3Stones })
})


module.exports = router