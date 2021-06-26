'use strict';

const { catchAsync } = require('../helpers');
const AppError = require('../helpers/AppError');
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
        const movie = await MovieService.getMovieById(req.movie._id);
        return res.status(200).json({
            status: 'success',
            data: movie,
        });
    });
    static updateMovie = catchAsync(async (req, res, next) => {
        const movie = await MovieService.updateMovie({
            movieId: req.movie._id,
            movieData: req.body,
        });
        return res.status(200).json({
            status: 'success',
            data: { movie },
        });
    });
    static deleteMovie = catchAsync(async (req, res, next) => {
        await MovieService.deleteMovie(req.movie._id);
        return res.status(200).json({
            status: 'success',
        });
    });

    static findAndAttach = async (req, res, next, id) => {
        try {
            const movie = await MovieService.getMovieById(id);
            if (!movie) return next(new AppError(`Movie with id: ${id} not found`, 404));

            req.movie = movie;
            next();
        } catch (error) {
            next(error);
        }
    };
}

// Export Movie Controller Class
module.exports = MovieController;
