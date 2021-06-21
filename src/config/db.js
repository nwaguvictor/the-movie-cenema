'use strict';

const mongoose = require('mongoose');
const config = require('../config');

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: true,
};

// Disable autoIndex on production
if (process.env.NODE_ENV === 'production') options.autoIndex = false;

module.exports = async function () {
    mongoose
        .connect(config.DB_URI, options)
        .then(() => console.log(':: Database Connected Successfully'))
        .catch((error) => {
            console.error(`:: Error: ${error.message}`);
            process.exit();
        });

    mongoose.connection.on('disconnected', () => console.log(':: Database disconnected from MongoDB'));
};
