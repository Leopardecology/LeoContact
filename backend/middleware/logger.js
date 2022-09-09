const {format} = require('date-fns');
const {v4: uuid} = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const asyncHandler = require('express-async-handler');

const logEvents = asyncHandler(async (message, logFileName) => {
    const dateTime = format(new Date(), 'dd-MM-yyyy\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem);
    } catch (err) {
        console.log(err);
    }
});

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log'); //TODO: logs everything (change it)
    console.log(`${req.method} ${req.path}`);
    next();
};

module.exports = {logEvents, logger};