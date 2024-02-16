const router = require('express').Router()

const homeController = require('./controllers/homeControllers')
const authController = require('./controllers/authController')

router.use(homeController)
router.use('/auth', authController)

router.get('/', (req, res) => {
    res.send('Hello World')

})   




module.exports = router