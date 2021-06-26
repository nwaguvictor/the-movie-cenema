'use strict';

const router = require('express').Router();
const { movieController } = require('../controllers');
const AppError = require('../helpers/AppError');
const { MovieService } = require('../services');

router.route('/').get(movieController.getMovies).post(movieController.createMovies);

router.param('movie', async (req, res, next, id) => {
    const movie = await MovieService.getMovieById(id);
    if (!movie) return next(new AppError(`Movie with id: ${id} not found`, 404));
    next();
});

router
    .route('/:movie')
    .get(movieController.getMovieById)
    .patch(movieController.updateMovie)
    .delete(movieController.deleteMovie);

// Exports Movie Router
module.exports = router;
