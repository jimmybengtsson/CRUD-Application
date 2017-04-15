'use strict';

let mongoose = require('mongoose');

// Make schema

let messageSchema = mongoose.Schema(
    {
        text: { type: String, required: true },
        createdAt: { type: Date, required: true, default: Date.now},
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }

    });

// Create model.

let Message = mongoose.model('Message', messageSchema);

module.exports = Message;
