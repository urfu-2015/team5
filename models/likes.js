'use strict';

let mongoose = require('mongoose');
let userModel = require('./user.js');
let questModel = require('./quest.js');
let pictureModel = require('./picture.js');

let Like = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    user: userModel,
    type: {
        picture: pictureModel,
        quest: questModel
    }
});


module.exports = mongoose.model('Like', Like);
