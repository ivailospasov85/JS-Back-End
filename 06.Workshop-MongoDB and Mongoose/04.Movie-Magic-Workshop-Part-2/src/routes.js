const router = require('express').Router()

const homeController = require('./controller/homeController')
const movieController=require('./controller/movieController')
const error404Controller=require('./controller/error404Controller')



router.use(homeController)
router.use(movieController)



router.use(error404Controller)

module.exports = router