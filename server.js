'use strict';

let express = require('express');
let handlebars = require('express-handlebars');

let app = express();
let port = process.env.Port || 8000;

// Configuration for handlebars.

app.engine('hbs', handlebars({
    defaultLayout: __dirname + '/views/layouts/index.hbs',
    extName: 'hbs'
}));

app.set('view engine', 'hbs');

// If get request.

app.get('/', (request, response) => {

    response.render('test');
});

// Start the application.

app.listen(port, () => {
    console.log('Express started on ' + port);
    console.log('Terminate with ctrl-c');
});
