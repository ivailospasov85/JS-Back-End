const router = require('express').Router();

const movieService = require('../services/movieSer');

router.get('/create', (req, res) => {
    res.render('create')
})

router.post('/create', (req, res) => {
    const newMovie = req.body
    movieService.create(newMovie)
    console.log(newMovie);
    res.send('A movie shoud be created')
})

module.exports = router