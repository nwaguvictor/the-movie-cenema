'use strict';

const { Schema, model } = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const config = require('../config');

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name field is required'],
        minlength: [5, 'name must be atleast 5 characters'],
        maxlength: [256, 'name must be below 256 characters'],
        trim: true,
    },
    username: {
        type: String,
        required: [true, 'username field is required'],
        minlength: [3, 'username must be atleast 3 characters'],
        maxlength: [256, 'username must be below 256 characters'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email address is required'],
        validate: [validator.isEmail, 'please provide valid email address'],
        trim: true,
    },
    phone: String,
    password: {
        type: String,
        required: [true, 'password field is required'],
        minlength: [5, 'password must be atleast 5 characters'],
        select: false,
    },
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer',
        select: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
        select: false,
    },
    isActive: {
        type: Boolean,
        default: true,
        select: false,
    },
    passwordResetToken: String,
    tokenExpires: Date,
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.signToken = function () {
    const token = jwt.sign({ id: this._id, role: this.role }, config.JWT_KEY, {
        expiresIn: config.JWT_EXPIRES,
    });
    return token;
};
UserSchema.methods.confirmPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.createPasswordResetToken = function () {
    const token = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
    this.tokenExpires = Date.now() + 1000 * 60 * 10;

    return token;
};

module.exports = model('User', UserSchema);
