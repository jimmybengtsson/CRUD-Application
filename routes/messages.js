'use strict';

let router = require("express").Router();
let Message = require("../models/Message");

// Render all messages and check if logged in.

router.route('/message/messages')
    .get((req, res) => {

        if (!req.session.user) {
            req.session.flash = {
                type: 'errorFlash',
                message: 'Have to be logged in to view page. Redirecting to public messages.'
            };

            return res.redirect('/message/messagesPublic');
        }

        Message.find({}, (error, data) => {


                let context = {
                    messages: data.map(function(message) {

                        if (message.text === null) {
                            return;
                        }

                        let messageText = message.text;
                        messageText = messageText.replace(/\r?\n/g, '<br />');

                        return {
                            text: messageText,
                            createdAt: message.createdAt,
                            id: message._id,
                            firstName: message.firstName,
                            lastName: message.lastName
                        };

                    })
                };
                res.render('message/messages', context);
            });
    })

    // Create a message

    .post((req, res) => {

        let messageText = req.body.textArea;

        let message = new Message({
            text: messageText,
            firstName: req.session.user.firstName,
            lastName: req.session.user.lastName
        });

        message.save().then(() => {

            req.session.flash = {
                type: "success",
                message: "The post was created!"
            };

            res.redirect('messages');
        }).catch((error) => {
            req.session.flash = {
                type: 'errorFlash',
                message: error.message
            };

            res.redirect('messages');
        });
    });

// Render the public message page

router.route('/message/messagesPublic')
    .get((req, res) => {

        if (req.session.user) {
            return res.redirect('messages');
        }

        Message.find({}, (error, data) => {

            // mapping up the object for the view
            let context = {
                messages: data.map(function(message) {

                    if (message.text === null) {
                        return;
                    }

                    let messageText = message.text;
                    messageText = messageText.replace(/\r?\n/g, '<br />');

                    return {
                        text: messageText,
                        createdAt: message.createdAt,
                        id: message._id
                    };

                })
            };
            res.render('message/messagesPublic', context);
        });

    });

// Delete message

router.route('/message/delete/:id')
    .get((req, res) => {

        if (!req.session.user) {
            return res.status(401).send();
        }

        res.render('message/delete', {id: req.params.id});
    })
    .post((req, res) => {
        Message.findOneAndRemove({_id: req.params.id}, (error) => {
            if (error) {
                throw new Error('Something went wrong!');
            }

            req.session.flash = {
                type: "success",
                message: "The post was deleted!"
            };

            res.redirect('/message/messages');
        });

    });

// Update message

router.route('/message/update/:id')
    .get((req, res) => {

        if (!req.session.user) {

            req.session.flash = {
                type: 'errorFlash',
                message: 'Have to be logged in to update message'
            };

            return res.redirect('/');
        }

        Message.findById(req.params.id, (error, data) => {

            if (!data) {
                console.log(error);
            }

            return res.render("message/update", data);
        });
    })
    .post((req, res) => {
        Message.findOneAndUpdate({_id: req.params.id}, {$set:{text: req.body.textArea}}, {new: true}, (error) => {
            if (error) {
                req.session.flash = {
                    type: 'errorFlash',
                    message: error.message
                };
                res.redirect('/message/messages');
            }

            req.session.flash = {
                type: "success",
                message: "The post was updated!"
            };

            res.redirect('/message/messages');

        });

    });

module.exports = router;
