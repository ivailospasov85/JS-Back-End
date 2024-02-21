const router = require('express').Router()

const homeController = require('./controllers/homeControllers')
const authController = require('./controllers/authController')
const stoneController = require('./controllers/stonesController')

router.use(homeController)
router.use( authController)
router.use('/stones', stoneController)

router.all('*', (req, res) => {
    res.render('404')

})   





module.exports = router