const express = require('express');
const http = require('http');
const config = require('./config');
const logger = require('./helpers/logger');
const initDB = require('./config/db');
const AppError = require('./helpers/AppError');
const middlewares = require('./middlewares');
const errorController = require('./middlewares/errorController');

const app = express();

// Middlewares
middlewares(app);

// Routes
app.use('/api/v1', require('./routes'));

// Routes not defined
app.all('*', (req, res, next) => {
    return next(new AppError(`Endpoint: ${req.originalUrl} not found`, 404));
});

// Application Error Handler
app.use(errorController);

// Server
const server = http.createServer(app);
server.listen(config.PORT, () => {
    initDB();
    if (process.env.NODE_ENV !== 'production') {
        logger.info(`:: Application started on Port: ${config.PORT} Env: ${process.env.NODE_ENV}`);
    }
});

module.exports = server;
