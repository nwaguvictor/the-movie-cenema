'use strict';

const router = require('express').Router();
const { movieController } = require('../controllers');

router.route('/').get(movieController.getMovies).post(movieController.createMovies);

router
    .route('/:id')
    .get(movieController.getMovieById)
    .patch(movieController.updateMovie)
    .delete(movieController.deleteMovie);

// Exports Movie Router
module.exports = router;
