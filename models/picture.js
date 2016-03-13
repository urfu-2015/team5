'use strict';

let mongoose = require('mongoose');
let relationship = require("mongoose-relationship");

let Picture = new mongoose.Schema({
    name: String,
    location: String,
    description: String,
    url: String,
    uploaded: {
        type: Date,
        default: Date.now
    },
    quest: {
        type: mongoose.Schema.ObjectId,
        ref: 'Quest',
        childPath: 'quests'
    },
    checkins: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Checkin'
    }],
    comments: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    }],
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Likes'
    }]
});

Picture.plugin(relationship, {
    relationshipPathName: 'quest'
});

module.exports = mongoose.model('Picture', Picture);
