'use strict';

let mongoose = require('mongoose');

let User = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    level: Number
});


module.exports = mongoose.model('User', User);
