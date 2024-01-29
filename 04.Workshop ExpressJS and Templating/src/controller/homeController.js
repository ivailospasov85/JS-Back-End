const router = require('express').Router()


router.get('/', (req, res) => {
    res.render('home', { layout: false })
})

// router.get('/about',)

module.exports = router