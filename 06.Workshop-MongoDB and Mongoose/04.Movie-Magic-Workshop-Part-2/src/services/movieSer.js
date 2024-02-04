const Movie = require('../models/Movie')
const Cast = require('../models/cast')

exports.getAll = () => Movie.find()

exports.search = async (title, genre, year) => {
    let result = await Movie.find().lean()

    if (title) {
        result = result.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()))
    }

    if (genre) {
        result = result.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase())
    }
    if (year) {
        result = result.filter(movie => movie.year === year)
    }

    return result

}



exports.getOne = (movieId) => Movie.findById(movieId).populate('casts')


exports.create = (movieData) => Movie.create(movieData)


exports.attach = async(movieId, castId) => {
    const movie = await this.getOne(movieId)
    const cast = await Cast.findById(castId)

    movie.casts.push(cast)
    cast.movies.push(movie)
    await movie.save()
    await cast.save()
    // return movie.save()

  

    // return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } })


}