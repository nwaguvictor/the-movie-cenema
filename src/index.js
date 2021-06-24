const express = require('express');
const http = require('http');
const config = require('./config');
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
    if (process.env.NODE_ENV !== 'production') {
        console.log(`:: Application started on port: ${config.PORT} --${process.env.NODE_ENV}`);
    }
    initDB();
});

module.exports = server;
