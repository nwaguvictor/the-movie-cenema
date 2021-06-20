'use strict';

const MovieModel = require('../models/MovieModel');

/**
 * Movie Service Class
 */
class MovieService {
    static createMovie = async (movieData) => {
        const movie = await MovieModel.create(movieData);
        return {
            success: true,
            data: movie,
        };
    };
    static getMovies = async () => {
        const movies = await MovieModel.find({});
        return {
            success: true,
            data: movies,
        };
    };
}

// Export Movie Service
module.exports = MovieService;
