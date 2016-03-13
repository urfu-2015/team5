'use strict';

let mongoose = require('mongoose');
let relationship = require("mongoose-relationship");

let Quest = new mongoose.Schema({
    name: String,
    description: String,
    uploaded: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        childPath: 'quests'
    },
    pictures: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Picture'
    }],
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Like'
    }],
    comments: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    }]
});

Quest.plugin(relationship, {
    relationshipPathName: 'user'
});

module.exports = mongoose.model('Quest', Quest);
