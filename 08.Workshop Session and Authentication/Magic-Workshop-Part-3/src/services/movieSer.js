const Movie = require('../models/Movie')
const Cast = require('../models/Cast')

exports.getAll = () => Movie.find()

exports.search = (title, genre, year) => {
    let query = {}
    if (title) {
        // result = result.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()))
        query.title = new RegExp(title, "i")
    }

    if (genre) {
        // result = result.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase())
        query.genre = new RegExp(genre, "i")
    }
    if (year) {
        // result = result.filter(movie => movie.year === year)
        query.year = year
    }

    return Movie.find(query)

}



exports.getOne = (movieId) => Movie.findById(movieId).populate('casts')


exports.create = (movieData) => Movie.create(movieData)


exports.attach = async (movieId, castId) => {
    const movie = await this.getOne(movieId)
    const cast = await Cast.findById(castId)

    movie.casts.push(cast)
    cast.movies.push(movie)
    await movie.save()
    await cast.save()
    // return movie.save()



    // return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } })


}