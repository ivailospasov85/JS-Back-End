const router = require('express').Router()

const homeController = require('./controller/homeController')
const movieController=require('./controller/movieController')




router.use(homeController)
router.use(movieController)

module.exports = router