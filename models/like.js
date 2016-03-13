'use strict';

let mongoose = require('mongoose');
let relationship = require("mongoose-relationship");

let Like = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        childPath: 'likes'
    },
    date: {
        type: Date,
        default: Date.now
    },
    picture: {
        type: mongoose.Schema.ObjectId,
        ref: 'Picture',
        childPath: 'likes'
    },
    quest: {
        type: mongoose.Schema.ObjectId,
        ref: 'Quest',
        childPath: 'likes'
    }
});

Like.plugin(relationship, {
    relationshipPathName: 'user'
});
Like.plugin(relationship, {
    relationshipPathName: 'picture'
});
Like.plugin(relationship, {
    relationshipPathName: 'quest'
});

module.exports = mongoose.model('Like', Like);
