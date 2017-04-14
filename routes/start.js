'use strict';

// Use express router

let router = require('express').Router();

// Will trigger on url '/'

router.route('/')
    .get((request, response) => {

    console.log('start route');

        // Render start page
        response.render('start');
    });

module.exports = router;
