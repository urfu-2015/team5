'use strict';

let mongoose = require('mongoose');
let userModel = require('./user.js');

let Quest = new mongoose.Schema({
    name: String,
    description: String,
    uploaded: {
        type: Date,
        default: Date.now
    },
    user: userModel
});


module.exports = mongoose.model('Quest', Quest);
