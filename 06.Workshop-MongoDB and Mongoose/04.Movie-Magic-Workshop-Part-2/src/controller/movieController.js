const router = require('express').Router();

const movieService = require('../services/movieSer');
const castService = require('../services/castSer');

router.get('/create', (req, res) => {
    res.render('create')
})

router.post('/create', async (req, res) => {
    const newMovie = req.body

    try {
        await movieService.create(newMovie)

        res.redirect('/')
    } catch (err) {
        console.log(err.message);
        res.redirect('/create')
    }

})

router.get('/movies/:movieId', async (req, res) => {
    movieId = req.params.movieId

    const movie = await movieService.getOne(movieId).lean()
    // const stars = movie.rating
    movieRating = new Array(Number(movie.rating)).fill(true)

    res.render('details', { movie, movieRating })
})

router.get('/movies/:movieId/attach', async (req, res) => {
    const movie = await movieService.getOne(req.params.movieId).lean()
    const casts = await castService.getAll().lean()

    res.render('movie/attach', { ...movie, casts })
})

module.exports = router