'use strict';

const router = require('express').Router();
const { movieController } = require('../controllers');

router.param('movieId', movieController.findAndAttach);

router.route('/').get(movieController.getMovies).post(movieController.createMovies);
router
    .route('/:movieId')
    .get(movieController.getMovie)
    .patch(movieController.updateMovie)
    .delete(movieController.deleteMovie);

// Exports Movie Router
module.exports = router;
