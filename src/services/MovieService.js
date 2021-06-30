'use strict';

const { MovieModel } = require('../models');

/**
 * Movie Service Class
 */
class MovieService {
    static createMovie = async (movieData) => {
        const movie = await MovieModel.create(movieData);
        return movie;
    };
    static getMovies = async (query) => {
        const queryString = Object.assign({}, query);

        // Filtering
        const excludedQueryFields = ['page', 'sort', 'limit', 'fields'];
        excludedQueryFields.forEach((query) => delete queryString[query]);
        let queryResult = MovieModel.find(queryString);

        // Sorting
        if (query.sort) {
            const sortBy = query.sort.split(',').join(' ');
            queryResult = queryResult.sort(sortBy);
        } else {
            queryResult.sort('-createdAt');
        }

        // Fields to return
        if (query.fields) {
            const fields = query.fields.split(',').join(' ');
            queryResult.select(fields);
        } else {
            queryResult.select('-__v');
        }

        // Pagination
        let { page, limit } = query;
        page = Number(page) < 1 ? 1 : Number(page);
        limit = Number(limit) < 1 ? 10 : Number(limit);
        const skip = (page - 1) * limit;
        queryResult.skip(skip).limit(limit);

        const movies = await queryResult;
        return movies;
    };
    static getMovieById = async (movieId) => {
        const movie = await MovieModel.findById(movieId);
        return movie;
    };
    static updateMovie = async ({ movieId, movieData }) => {
        const movie = await MovieModel.findByIdAndUpdate(movieId, movieData, {
            runValidators: true,
            new: true,
        });
        return movie;
    };
    static deleteMovie = async (movieId) => {
        const movie = await MovieModel.findByIdAndDelete(movieId);
        return movie;
    };
}

// Export Movie Service
module.exports = MovieService;
