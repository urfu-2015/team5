'use strict';

let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    level: Number
});

User.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', User);
