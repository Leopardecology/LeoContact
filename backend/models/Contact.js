const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
            salutation: {
                type: String,
                enum: ['Mr', 'Mrs', 'Ms', 'Dr', 'Prof', ''],
                required: false
            },
            firstname: {
                type: String,
                required: true
            },
            lastname: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: false
            },
            email: {
                type: String,
                required: true
            },
            telephonePrivate: {
                type: String,
                default: '',
                required: false
            },
            telephoneBusiness: {
                type: String,
                default: '',
                required: false
            },
            role: {
                type: String,
                default: '',
                required: false
            },
            calendarEnglish: {
                type: Number,
                default: 0,
                required: true
            },
            calendarGerman: {
                type: Number,
                default: 0,
                required: true
            },
            annualReport: {
                type: Number,
                default: 0,
                required: true
            },
            address: {
                street: {
                    type: String,
                    required: false
                },
                streetAddition: {
                    type: String,
                    required: false
                },
                city: {
                    type: String,
                    required: false
                },
                zip: {
                    type: Number,
                    required: false
                },
                country: {
                    type: String,
                    required: false
                }
            },
            comment: {
                type: String,
                default: '',
                required: false
            },
            personal: {
                type: Boolean,
                default: false,
                required: true
            }
        },
        {
            timestamps: true
        }
    )
;

module.exports = mongoose.model('Contact', contactSchema);