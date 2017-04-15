'use strict';

let express = require('express');
let handlebars = require('express-handlebars');
let bodyParser = require('body-parser');
let path = require('path');
let session = require('express-session');
const sessionConfig = require('./config/config.js').configSession;

let startDB = require('./libs/mongoMessages.js');

let app = express();
let port = process.env.PORT || 8000;

// Start database

startDB();

// Configure Handlebars
let hbs = handlebars.create({
    defaultLayout: 'main',
    extname: '.hbs',

    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
});

// Views folder and engine
app.set('views', __dirname + '/views/');
app.set('view engine', '.hbs');
app.engine('.hbs', hbs.engine);

// Parse JSON data

app.use(bodyParser.json());

// Parse form data

app.use(bodyParser.urlencoded({ extended: true }));

// Start session

app.use(session(sessionConfig));

// Flash messages

app.use(function(req, res, next) {

    // Add it...

    if (req.session.flash) {
        res.locals.flash = req.session.flash;

        // then delete it after 1 look
        delete req.session.flash;
    }

    next();
});

// Look for static files in public folder.

app.use(express.static(path.join(__dirname + '/public')));

// Load routes

app.use('/', require('./routes/start.js'));

app.use('/', require('./routes/messages.js'));

app.use('/', require('./routes/autho.js'));

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
