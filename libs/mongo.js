'use strict';

let mongoose = require('mongoose');

function startDB() {

    // Get database configuration

    let configDB = require("../config/config.js").configDB;
    let db = mongoose.connection;

    // Event emitters

    db.on('error', (error) => {
        console.log('connection error', error);
    });

    db.once('open', () => {
        console.log('Database connected.');
    });

    process.on('SIGINT', () => {
        db.close(() => {
            console.log('Mongoose disconnected because of app termination.');
            process.exit(0);
        });
    });

    // Connect

    mongoose.Promise = global.Promise;

    return mongoose.connect(configDB.connectionString);
}

module.exports = startDB;
