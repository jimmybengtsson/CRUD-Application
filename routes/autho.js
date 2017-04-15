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

    // Check so new username doesnt exist etc.. And save it.

    newUser.save((err, user) => {

        if (err) {
            console.log(err.message);

            req.session.flash = {
                type: 'errorFlash',
                message: err.message
            };

            return res.redirect('register');
            }

        req.session.flash = {
            type: "success",
            message: "User created!"
        };

        req.session.user = user;

        return res.redirect('/message/messages');

    });

});

// Render messages if online if not redirect to public.

router.route('/message/messages')
    .get((req, res) => {

        if (!req.session.user) {
            req.session.flash = {
                type: 'errorFlash',
                message: 'Have to be logged in to view page. Redirecting to public messages.'
            };

            return res.redirect('/message/messagesPublic');
        }

        return res.render('/message/messages');

    });

// Handle login

router.route('/')
    .get((req, res) => {

        res.render('/');
    })

    .post((req, res) => {

    // Find the username from database

        User.findOne({username: req.body.username}, (err, user) => {

            if (err) {
                console.log(err);
                req.session.flash = {
                    type: "error",
                    message: err.message
                };
                return res.redirect('/');
            } else if (!user) {
                req.session.flash = {
                    type: 'errorFlash',
                    message: "Username is incorrect! Please try again."
                };
                return res.redirect('/');
            }

            // Compare with hashed password in database

            user.comparePassword(req.body.password, (err, isMatch) => {
                if (isMatch && isMatch === true) {

                    req.session.user = user;

                    req.session.flash = {
                        type: "success",
                        message: "Logged in!"
                    };

                    return res.redirect('/message/messages');

                } else {

                    req.session.flash = {
                        type: 'errorFlash',
                        message: "Password is incorrect! Please try again."
                    };

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
