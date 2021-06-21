'use strict';

/**
 * Movie Schema
 */
const { Schema, model } = require('mongoose');

const MovieSchema = new Schema({
    adult: Boolean,
    title: {
        type: String,
        required: [true, 'Movie title is required'],
        minLength: [3, 'Movie title must be at least 3 charracters'],
        unique: true,
        trim: true,
    },
    tagline: {
        type: String,
        minLength: [10, 'Movie tagline should be 10 or more characters'],
        trim: true,
    },
    overview: {
        type: String,
        minLength: [20, 'Movie overview should be 20 or more characters'],
    },
    status: {
        type: String,
        enum: {
            values: ['Rumored', 'Planned', 'In Production', 'Released', 'Cancelled'],
            message: '{VALUE} is not supported',
        },
        required: [true, 'Movie status is required'],
    },
    runtime: Number,
    language: String,
    original_title: String,
    release_date: {
        type: [Date],
        default: Date.now,
    },
    backdrop_path: String,
    slug: String,
});

// Export Movie Model
module.exports = model('Movie', MovieSchema);
