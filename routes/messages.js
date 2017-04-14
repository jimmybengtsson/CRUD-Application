'use strict';

let router = require("express").Router();
let Message = require("../models/Message");

router.route('/message/messages')
    .get((req, res) => {

        Message.find({}, function(error, data) {

                // mapping up the object for the view
                let context = {
                    messages: data.map(function(message) {
                        return {
                            text: message.text,
                            createdAt: message.createdAt,
                            id: message._id
                        };

                    })
                };
                res.render('message/messages', context);
            });

    });
router.route('/message/create')
    .get((req, res) => {

        res.render('message/create');
    })
    .post((req, res) => {

        let messageText = req.body.message;

        let message = new Message({
                text: messageText
            });

        console.log(message);

        message.save().then(() => {

                res.redirect('messages');
            }).catch((error) => {
                console.log(error.message);

                //res.redirect('/');
            });
    });

// Delete message

router.route('/message/delete/:id')
    .get((req, res) => {

        res.render("message/delete", {id: req.params.id});
    })
    .post((req, res) => {
        Message.findOneAndRemove({_id: req.params.id}, (error) => {
            if (error) {
                throw new Error('Something went wrong!');
            }

            res.redirect('/message/messages');
        });

    });

module.exports = router;
