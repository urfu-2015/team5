'use strict';

let mongoose = require('mongoose');

let Comment = new mongoose.Schema({
    user: mongoose.Schema.Types.ObjectId,
    content: String,
    uploaded: {
        type: Date,
        default: Date.now
    },
    type: {
        picture: mongoose.Schema.Types.ObjectId,
        quest: mongoose.Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('Comment', Comment);
