'use strict';

let mongoose = require('mongoose');

let Checkin = new mongoose.Schema({
    user: mongoose.Schema.Types.ObjectId,
    picture: mongoose.Schema.Types.ObjectId,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Checkin', Checkin);
