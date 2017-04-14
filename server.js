'use strict';

let express = require('express');
let handlebars = require('express-handlebars');
let bodyParser = require('body-parser');
let path = require('path');
let session = require('express-session');
let cookieParser = require('cookie-parser');
const sessionConfig = require('./config/config.js').configSession;

let startDB = require('./libs/mongoMessages.js');

let app = express();
let port = process.env.PORT || 8000;

// Start database

startDB();

// Parse form data

app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON data

app.use(bodyParser.json());

app.use(cookieParser());

// Start session

app.use(session(sessionConfig));

// Configuration for handlebars.

app.engine('.hbs', handlebars({
    defaultLayout: __dirname + '/views/layouts/home.hbs',
    extName: 'hbs'
}));

app.set('view engine', 'hbs');

// Look for static files in public folder.

app.use(express.static(path.join(__dirname + 'public')));

// Load routes

app.use('/', require('./routes/start.js'));

app.use('/', require('./routes/messages.js'));

app.use('/', require('./routes/autho.js'));

/* If get request.

app.get('/', (request, response) => {

    response.render('start', {data: messages});
});*/

// Post message

/*app.post('/', (request, response) => {

    console.log('post');

    let obj = {};
    obj.message = request.body.message;
    messages.push(obj);
    response.redirect('/');
});*/

app.get('/message/messagesPublic', (request, response) => {

    response.render('message/messages');
});

app.get('/session/register', (request, response) => {

    response.render('session/register');
});

// Start the application.

app.listen(port, () => {
    console.log('Express started on ' + port);
    console.log('Terminate with ctrl-c');
});
