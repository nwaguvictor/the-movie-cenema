'use strict';

const { MovieService } = require('../services');

/**
 * Movie Controller Class
 */
class MovieController {
    static createMovies = async (req, res, next) => {
        const { data, success } = await MovieService.createMovie(req.body);
        if (!success) return next(new Error('Error Creating Movie'));

        return res.status(201).json({
            status: 'success',
            data,
        });
    };
    static getMovies = async (req, res, next) => {
        const { data, success } = await MovieService.getMovies();
        if (!success) return next(new Error('Error Getting Movies'));

        return res.status(200).json({
            status: 'success',
            data,
        });
    };
    static getMovie = async (req, res, next) => {
        return res.status(200).json({
            status: 'success',
        });
    };
    static getMovieById = async (req, res, next) => {
        return res.status(200).json({
            status: 'success',
        });
    };
    static updateMovie = async (req, res, next) => {
        return res.status(200).json({
            status: 'success',
        });
    };
    static deleteMovie = async (req, res, next) => {
        return res.status(204).json({
            status: 'success',
        });
    };
}

// Export Movie Controller Class
module.exports = MovieController;
