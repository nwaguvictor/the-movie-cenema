'use strict';

const { catchAsync } = require('../helpers');
const AppError = require('../helpers/AppError');
const { MovieService } = require('../services');

/**
 * Movie Controller Class
 */
class MovieController {
    static createMovies = catchAsync(async (req, res, next) => {
        const { data, success } = await MovieService.createMovie(req.body);
        return res.status(201).json({
            status: 'success',
            data,
        });
    });
    static getMovies = catchAsync(async (req, res, next) => {
        const movies = await MovieService.getMovies();

        return res.status(200).json({
            status: 'success',
            data: { movies },
        });
    });
    static getMovie = catchAsync(async (req, res, next) => {
        const movie = await MovieService.getMovie({ id: req.params.id });
        return res.status(200).json({
            status: 'success',
            data: movie,
        });
    });
    static getMovieById = catchAsync(async (req, res, next) => {
        const movie = await MovieService.getMovieById(req.params.id);
        return res.status(200).json({
            status: 'success',
            data: movie,
        });
    });
    static updateMovie = catchAsync(async (req, res, next) => {
        return res.status(200).json({
            status: 'success',
        });
    });
    static deleteMovie = catchAsync(async (req, res, next) => {
        return res.status(204).json({
            status: 'success',
        });
    });
}

// Export Movie Controller Class
module.exports = MovieController;
