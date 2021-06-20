'use strict';

const morgan = require('morgan');
const express = require('express');

module.exports = (app) => {
    if (process.env.NODE_ENV !== 'production') {
        app.use(morgan('dev'));
    }
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    return app;
};
