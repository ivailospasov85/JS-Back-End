movies = [{
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

exports.create = (movieData) => {
    movies.push(movieData)
}