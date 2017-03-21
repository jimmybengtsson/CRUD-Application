'use strict';

let express = require('express');
let handlebars = require('express-handlebars');
let bodyParser   = require('body-parser');
let startDB = require('./libs/mongo.js');

let messages = [{message: 'test'}, {message: 'test2'}];

let app = express();
let port = process.env.PORT || 8000;

// Start database

startDB();

// Configuration for handlebars.

app.engine('hbs', handlebars({
    defaultLayout: __dirname + '/views/layouts/index.hbs',
    extName: 'hbs'
}));

app.set('view engine', 'hbs');

// Parse form data

app.use(bodyParser.urlencoded({ extended: true }));

// If get request.

app.get('/', (request, response) => {

    response.render('start', {data: messages});
});

app.get('/register', (request, response) => {

    response.render('register');
});

// Post message

app.post('/', (request, response) => {

    let obj = {};
    obj.message = request.body.message;
    messages.push(obj);
    response.redirect('/');
});

// Start the application.

app.listen(port, () => {
    console.log('Express started on ' + port);
    console.log('Terminate with ctrl-c');
});
