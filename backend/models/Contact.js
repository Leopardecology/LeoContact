const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        address: {
            street: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: false
            },
            zip: {
                type: Number,
                required: true
            },
            country: {
                type: String,
                required: true
            }
        },
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Contact', contactSchema);