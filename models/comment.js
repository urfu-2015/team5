'use strict';

let mongoose = require('mongoose');
let relationship = require("mongoose-relationship");

let Comment = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        childPath: 'comments'
    },
    content: String,
    uploaded: {
        type: Date,
        default: Date.now
    },
    picture: {
        type: mongoose.Schema.ObjectId,
        ref: 'Picture',
        childPath: 'comments'
    },
    quest: {
        type: mongoose.Schema.ObjectId,
        ref: 'Quest',
        childPath: 'comments'
    }
});

Comment.plugin(relationship, {
    relationshipPathName: 'user'
});
Comment.plugin(relationship, {
    relationshipPathName: 'picture'
});
Comment.plugin(relationship, {
    relationshipPathName: 'quest'
});

module.exports = mongoose.model('Comment', Comment);
