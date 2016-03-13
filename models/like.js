'use strict';

let mongoose = require('mongoose');

let Like = new mongoose.Schema({
    user: mongoose.Schema.Types.ObjectId,
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        picture: mongoose.Schema.Types.ObjectId,
        quest: mongoose.Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('Like', Like);
