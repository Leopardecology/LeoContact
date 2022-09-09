const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
    {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        zip: {
            type: Number,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    }
);

const contactSchema = new mongoose.Schema(
    {
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
        address: [addressSchema],
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Contact', contactSchema);