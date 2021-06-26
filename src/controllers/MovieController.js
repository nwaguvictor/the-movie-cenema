'use strict';

const { catchAsync } = require('../helpers');
const { MovieService } = require('../services');

/**
 * Movie Controller Class
 */
class MovieController {
    static createMovies = catchAsync(async (req, res, next) => {
        const movie = await MovieService.createMovie(req.body);
        return res.status(201).json({
            status: 'success',
            data: { movie },
        });
    });
    static getMovies = catchAsync(async (req, res, next) => {
        const movies = await MovieService.getMovies(req.query);

        return res.status(200).json({
            status: 'success',
            total: movies.length,
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
        const movie = await MovieService.updateMovie({
            id: req.params.id,
            movieData: req.body,
        });
        return res.status(200).json({
            status: 'success',
            data: { movie },
        });
    });
    static deleteMovie = catchAsync(async (req, res, next) => {
        await MovieService.deleteMovie(req.params.id);
        return res.status(200).json({
            status: 'success',
        });
    });
}

// Export Movie Controller Class
module.exports = MovieController;
