'use strict';

const AppError = require('../helpers/AppError');
const MovieModel = require('../models/MovieModel');

/**
 * Movie Service Class
 */
class MovieService {
    static createMovie = async (movieData) => {
        const movie = await MovieModel.create(movieData);
        return movie;
    };
    static getMovie = async (movieData) => {
        const movies = await MovieModel.find({ movieData });
        return movies;
    };
    static getMovies = async () => {
        const movies = await MovieModel.find({});
        return movies;
    };
    static getMovieById = async (id) => {
        const movie = await MovieModel.findById(id);
        return movie;
    };
}

// Export Movie Service
module.exports = MovieService;
