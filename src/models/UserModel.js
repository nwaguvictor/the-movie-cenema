const { Schema, model } = require('mongoose');
const validator = require('validator');

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
    passwordConfirm: {
        type: String,
        required: [true, 'password confirm field is required'],
        validate: {
            validator: function (val) {
                return this.password === val;
            },
            message: 'passwords does not match',
        },
    },
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer',
        select: false,
    },
    isActive: {
        type: Boolean,
        default: true,
        select: false,
    },
});

module.exports = model('User', UserSchema);
