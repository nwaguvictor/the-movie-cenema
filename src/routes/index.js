'use strict';

const router = require('express').Router();

module.exports = (function () {
    router.use('/movies', require('./movies.router'));

    return router;
})();
