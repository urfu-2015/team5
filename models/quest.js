'use strict';

let mongoose = require('mongoose');

let Quest = new mongoose.Schema({
    name: String,
    description: String,
    uploaded: {
        type: Date,
        default: Date.now
    },
    user: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Quest', Quest);
