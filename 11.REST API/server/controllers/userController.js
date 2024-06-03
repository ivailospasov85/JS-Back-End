const router = require('express').Router()


const userService = require('../services/userService')

router.post('/register', async (req, res) => {
    const userDate = req.body

    const result = await userService.register(userDate)

    res.json(result)
})


router.post('/login', async (req, res) => {
    const userDate = req.body

    const result = await userService.login(userDate)

    res.json(result)
})

router.get('/logout', (req, res) => {

    res.json({ ok: true })
})

module.exports = router