'use strict';

let configDB = {
        connectionString: 'mongodb://localhost/messagesDB'
    };

let configSession = {

    secret: 'qwert-asdfg-zxcvb',
    resave: false,
    saveUninitialized: true

};

module.exports.configDB = configDB;
module.exports.configSession = configSession;
