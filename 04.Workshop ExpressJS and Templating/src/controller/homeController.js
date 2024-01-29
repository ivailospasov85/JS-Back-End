const router = require('express').Router()

const movieService = require('../services/movieSer');

router.get('/', (req, res) => {
    const movies = movieService.getAll()

    res.render('home', { movies })
})

router.get('/about', (req, res) => {
    res.render('about')
})

module.exports = router