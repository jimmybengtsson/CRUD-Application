'use strict';

let mongoose = require('mongoose');

// Make schema

let userSchema = mongoose.Schema(
    {
        username: { type: String, unique: true },
        password: { type: String},
        firstName: '',
        lastName: String

    });

// Create model.

let User = mongoose.model('User', userSchema);

module.exports = User;
