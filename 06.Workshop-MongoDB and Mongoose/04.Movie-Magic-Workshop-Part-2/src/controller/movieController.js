const router = require('express').Router();

const movieService = require('../services/movieSer');

router.get('/create', (req, res) => {
    res.render('create')
})

router.post('/create', (req, res) => {
    const newMovie = req.body
    movieService.create(newMovie)

    res.redirect('/')
})

router.get('/movies/:movieId', (req, res) => {
    movieId = req.params.movieId

    const movie = movieService.getOne(movieId)
    // const stars = movie.rating
    movieRating = new Array(Number(movie.rating)).fill(true)
  
res.render('details', { movie, movieRating})
})

module.exports = router