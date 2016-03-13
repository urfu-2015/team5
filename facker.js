/**
 * Created by Max on 13.03.2016.
 */
/**
 * Created by Max on 13.03.2016.
 */
'use strict';

var User = require("./models/user.js");
var Quest = require("./models/quest.js");
var Picture = require("./models/picture.js");
var Comment = require("./models/comment.js");
var Checkin = require("./models/checkin.js");
var Like = require("./models/like.js");
var mongoose = require('mongoose');

var user = new User({
    email: 'test@gmail.com',
    password: 'admin',
    username: 'bob',
    level: 1
});

var quest = new Quest({
    name: 'Wow',
    description: 'Cool',
    user: user._id
});

var picture = new Picture({
    name: String,
    location: String,
    description: String,
    url: String,
    quest: quest._id
});

var comment = new Comment({
    user: user._id,
    content: 'LOOOL',
    picture: picture._id,
    quest: quest._id
});

var checkin = new Checkin({
    user: user._id,
    picture: picture._id
});

var like1 = new Like({
    user: user._id,
    picture: picture._id
});

var like2 = new Like({
    user: user._id,
    quest: quest._id
});

var db = mongoose.connect('mongodb://localhost/team5', function(err) {
    if (err) {
        console.log('Could not connect to mongodb on localhost.');
    } else {
        Promise.all([
            Quest.remove({}),
            Picture.remove({}),
            Comment.remove({}),
            User.remove({}),
            Checkin.remove({}),
            Like.remove({})
        ])
        .then(() => {
            return user.save();
        })
        .then(() => {
            return quest.save();
        })
        .then(() => {
            return picture.save();
        })
        .then(() => {
            return comment.save();
        })
        .then(() => {
            return checkin.save();
        })
        .then(() => {
            return like1.save();
        })
        .then(() => {
            return like2.save();
        })
        .then(() => {
            mongoose.connection.close();
            done();
        })
    }
});
