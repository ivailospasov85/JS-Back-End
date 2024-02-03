const router = require('express').Router()

const homeController = require('./controller/homeController')
const movieController = require('./controller/movieController')
const error404Controller = require('./controller/error404Controller')
const castController = require('./controller/castController')



router.use(homeController)
router.use(movieController)
router.use(castController)



router.use(error404Controller)

module.exports = router