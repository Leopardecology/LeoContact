const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const contactSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        role: [{
            type: String,
            default: "Person"
        }]
    },
    {
        timestamps: true
    }
);

//TODO: need?
contactSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 500
});

module.exports = mongoose.model('Contact', contactSchema);