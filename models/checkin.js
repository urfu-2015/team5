'use strict';

let mongoose = require('mongoose');
let relationship = require("mongoose-relationship");

let Checkin = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        childPath: 'checkins'
    },
    picture: {
        type: mongoose.Schema.ObjectId,
        ref: 'Picture',
        childPath: 'checkins'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

Checkin.plugin(relationship, {
    relationshipPathName: 'user'
});
Checkin.plugin(relationship, {
    relationshipPathName: 'picture'
});

module.exports = mongoose.model('Checkin', Checkin);
