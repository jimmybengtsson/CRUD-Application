'use strict';

let bcrypt = require('bcrypt');

let mongoose = require('mongoose');

const SALT_WORK_FACTOR = 10;

// Make schema

let User = mongoose.Schema(
    {
        username: { type: String, unique: true },
        password: { type: String},
        firstName: String,
        lastName: String

    });



// Hash the password. Got help from: http://stackoverflow.com/questions/14588032/mongoose-password-hashing

User.pre('save', function(next) {
    let user = this;

     // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
        return next();
    }

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {

            return next(err);
        }

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

User.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }

        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', User);
