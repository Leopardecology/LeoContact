const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        enum: ['Admin', 'User'],
        required: true
    },
    active: {
        type: Boolean,
        default: true,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);