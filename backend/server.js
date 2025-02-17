require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const path = require('path');
const {logger} = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOption = require('./config/corsOptions');
const connectDB = require('./config/dbConnection');
const mongoose = require('mongoose').default; //TODO: default because of bug?
const {logEvents} = require('./middleware/logger');
const PORT = process.env.PORT || 3500;

mongoose.set('strictQuery', false);

console.log(process.env.NODE_ENV);

connectDB().then(r => console.log(r)).catch(err => console.log(err));

app.use(logger);

app.use(cors(corsOption));

app.use(express.json());

app.use(cookieParser());

app.use('/api', express.static(path.join(__dirname, 'public')));

app.use('/api', require('./routes/root'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('jason')) {
        res.json({message: '404 Not Found'});
    } else {
        res.type('txt').send('404 Not Found');
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', err => {
    console.log(err);
    logEvents(`${err.errno}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
});