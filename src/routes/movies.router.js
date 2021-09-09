'use strict';

const router = require('express').Router();
const { movieController } = require('../controllers');
const { auth } = require('../middlewares/AuthMiddleware');

router.param('movieId', movieController.findAndAttach);

router.route('/').get(movieController.getMovies).post(auth, movieController.createMovies);

// Protect all routes after the auth middleware
router.use('/:movieId', auth);
router
    .route('/:movieId')
    .get(movieController.getMovie)
    .patch(movieController.updateMovie)
    .delete(movieController.deleteMovie);

// Exports Movie Router
module.exports = router;
