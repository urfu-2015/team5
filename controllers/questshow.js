'use strict';

var Quest = require('./../models/quest');
var Checkin = require("./../models/checkin.js");
var User = require('./../models/user');
var Picture = require('./../models/picture');
var Comment = require('./../models/comment');
var Like = require('./../models/like');

exports.show = function (req, res) {
    var addLikes = function (questId, pictureId) {
        return new Promise(function (resolve) {
            Like
                .find({
                    quest: questId,
                    picture: pictureId
                })
                .then(function (data) {
                    var likes = {
                        count: 0,
                        user: false
                    };
                    var user = req.authExists ? req.user._id : undefined;
                    data.forEach(function (item) {
                        if (item.user.equals(user)) {
                            likes.user = true;
                        }
                        likes.count++;
                    });
                    resolve(likes);
                });
        });
    };

    var addComments = function (questId, pictureId) {
        return new Promise(function (resolve) {
            Comment
                .find({
                    quest: questId,
                    picture: pictureId
                })
                .then(function (data) {
                    var comments = [];
                    var user = req.authExists ? req.user._id : undefined;
                    data.forEach(function (item) {
                        var edit = (item.user.equals(user));
                        comments.push({
                            id: item._id,
                            user: item.user,
                            content: item.content,
                            edit: edit
                        });
                    });
                    return comments;
                })
                .then(function (comments) {
                    var promises = [];
                    comments.forEach(function (item) {
                        promises.push(User.findById(item.user));
                    });
                    Promise
                        .all(promises)
                        .then(function (results) {
                            results.forEach(function (item, i) {
                                comments[i].user = item.username;
                            });
                            resolve(comments);
                        });
                });
        });
    };

    var addPicture = function (questId, pictureId) {
        return new Promise(function (resolve) {
            Picture
                .findById(pictureId)
                .then(function (pic) {
                    Promise
                        .all([
                            addComments(questId, pictureId),
                            addLikes(questId, pictureId)
                        ])
                        .then(function (results) {
                            resolve({
                                id: pic._id,
                                name: pic.name,
                                description: pic.description,
                                url: pic.url,
                                authExists: req.authExists,
                                comments: results[0],
                                likes: results[1]
                            });
                        });
                })
        });
    };

    Quest.findById(req.params.id, function (error, quest) {
        if (error) {
            console.error(error);
            res.status(error.status || 500);
            res.render('error/error', {
                message: error.message,
                error: error
            });
            return;
        }
        if (quest === null) {
            res.status(404);
            res.render('error/error', {
                message: 'Error! No found Quest!',
                error: { status: 404 }
             });
            return;
        }
        var promises = [];
        quest.pictures.forEach(function (item) {
            promises.push(addPicture(quest._id, item));
        });

        Promise
            .all(promises)
            .then(function (pictures) {
                Promise
                    .all([
                        addComments(quest._id),
                        addLikes(quest._id)
                    ])
                    .then(function (results) {
                        res.render('quest/quest', {
                            id: quest._id,
                            name: quest.name,
                            description: quest.description,
                            url: quest.cover,
                            authExists: req.authExists,
                            pictures: pictures,
                            comments: results[0],
                            likes: results[1]
                        });
                    });
            });
    });
};

function isChecked(pic, userId) {
    pic.checkins.forEach(function (checkinId) {
        Checkin.findById(checkinId, function (error, checkin) {
            //console.log(checkin);
            if (checkin.user === userId) {
                return true;
            }
        });
    });
    return false;
}
