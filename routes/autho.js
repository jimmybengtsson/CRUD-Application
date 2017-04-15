'use strict';

let router = require("express").Router();

let User = require("../models/User");

// Register a new user

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

    newUser.save((err, user) => {

        if (err) {
            console.log(err.message);

            res.redirect('register');
        }

        req.session.user = user;

        return res.redirect('/message/messages');

    });

});

// Render messages if online

router.route('/message/messages')
    .get((req, res) => {

        if (!req.session.user) {
            return res.status(401).send();
        }

        return res.render('/message/messages');

    });

// Handle login

router.route('/')
    .get((req, res) => {

        res.render('/');
    })

    .post((req, res) => {

        User.findOne({username: req.body.username}, (err, user) => {

            if (err) {
                console.log(err);
                res.status(500).send();
                return res.redirect('/');
            } else if (!user) {
                res.status(404).send();
                return res.redirect('/');
            }

            user.comparePassword(req.body.password, (err, isMatch) => {
                if (isMatch && isMatch === true) {

                    req.session.user = user;
                    return res.redirect('/message/messages');

                } else {
                    res.status(404).send();
                    return res.redirect('/');
                }
            });

        });
    });

// Logout

router.route('/session/logout')
    .get((req, res) => {

        res.render('session/logout');
    })
    .post((req, res) => {

        req.session.destroy();
        return res.redirect('/');

    });

module.exports = router;
