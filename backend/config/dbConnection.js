const mongoose = require('mongoose').default; //TODO: default because of bug?
const asyncHandler = require('express-async-handler');


const connectDB = asyncHandler(async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
    } catch (err) {
        console.log(err);
    }
});

module.exports = connectDB;