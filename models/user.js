'use strict';

let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    level: Number,
    quests: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Quest'
    }],
    comments: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    }],
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Like'
    }],
    checkins: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Checkin'
    }]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
