'use strict';

// Use express router

let router = require('express').Router();

// Will trigger on url '/'

router.route('/')
    .get((req, res) => {

        if (req.session.user) {
            return res.redirect('message/messages');
        }

        // Render start page
        res.render('start');
    });

module.exports = router;
