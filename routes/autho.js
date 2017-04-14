'use strict';

let router = require("express").Router();

let User = require("../models/User");

router.route('/session/register')
    .get((req, res) => {

        res.render('session/register');
    })
    .post((req, res) => {

    let newUser = new User({

        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstname,
        lastName: req.body.lastname
    });

    console.log(newUser);

    newUser.save().then(() => {

        res.redirect('/message/messages');
    }).catch((error) => {
        console.log(error.message);

        res.redirect('register');
    });

});

router.route('/message/messages')
    .get((req, res) => {

        if (!req.session.user) {
            return res.status(401).send();
        }

        return res.render('/message/messages');

    });

router.route('/')
    .get((req, res) => {

        res.render('/');
    })

    .post((req, res) => {

        User.findOne({username: req.body.username, password: req.body.password}, (err, user) => {

            console.log(user);

            if (err) {
                console.log(err);
                res.status(500).send();
                res.redirect('/');
            } else if (!user) {
                res.status(404).send();
                res.redirect('/');
            }

            req.session.user = user;

            return res.redirect('/message/messages');
        });
    });

module.exports = router;
