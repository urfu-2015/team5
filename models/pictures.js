'use strict';

let mongoose = require('mongoose');

let Picture = new mongoose.Schema({
    name: String,
    location: String,
    description: String,
    url: String,
    uploaded: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Picture', Picture);
