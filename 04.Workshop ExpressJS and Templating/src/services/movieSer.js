movies = [{
    _id: 1,
    title: 'Jungle Cuise 222',
    genre: 'Action',
    director: 'iv4o',
    data: '2024',
    imageUrl: 'ads',
    rating: '10',
    description: 'na iv4o filma'
}]

exports.getAll = () => {
    return movies.slice()
    // return [...movies]
    // return Array.from(movie)
}

exports.getOne = (movieId) => {
    const movie = movies.find(movie => movie._id == movieId)


    return movie
}

exports.create = (movieData) => {

    movieData._id = movies[movies.length - 1]._id + 1
    movies.push(movieData)
}