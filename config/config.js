'use strict';

// Config for Database

let configDB = {
        connectionString: 'mongodb://localhost/messagesDB'
    };

// Config for session

let configSession = {

    secret: 'qwert-asdfg-zxcvb',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 //1 day
    }

};

module.exports.configDB = configDB;
module.exports.configSession = configSession;
