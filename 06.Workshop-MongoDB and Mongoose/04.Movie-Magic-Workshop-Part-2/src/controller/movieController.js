const router = require('express').Router();

const movieService = require('../services/movieSer');

router.get('/create', (req, res) => {
    res.render('create')
})

router.post('/create', async(req, res) => {
    const newMovie = req.body
    
    try {
        await movieService.create(newMovie)
       
        res.redirect('/')
    } catch (err) {
        console.log(err.message);
        res.redirect('/create')
    }
   
})

router.get('/movies/:movieId', (req, res) => {
    movieId = req.params.movieId

    const movie = movieService.getOne(movieId)
    // const stars = movie.rating
    movieRating = new Array(Number(movie.rating)).fill(true)
  
res.render('details', { movie, movieRating})
})

module.exports = router