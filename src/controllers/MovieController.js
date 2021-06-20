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
        if (!success) return next(new AppError('Error Creating Movie'));

        return res.status(201).json({
            status: 'success',
            data,
        });
    });
    static getMovies = catchAsync(async (req, res, next) => {
        const { data, success } = await MovieService.getMovies();
        if (!success) return next(new Error('Error Getting Movies'));

        return res.status(200).json({
            status: 'success',
            data,
        });
    });
    static getMovie = catchAsync(async (req, res, next) => {
        return res.status(200).json({
            status: 'success',
        });
    });
    static getMovieById = catchAsync(async (req, res, next) => {
        return res.status(200).json({
            status: 'success',
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
