'use strict';

let mongoose = require('mongoose');
let relationship = require("mongoose-relationship");

let Quest = new mongoose.Schema({
    name: { type: String, index: true },
    description: String,
    cover: String,
    uploaded: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        childPath: 'quests'
    },
    members: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
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

Quest.index({ name: 1 });

module.exports = mongoose.model('Quest', Quest);
