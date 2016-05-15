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

    var isCheckined = function(pic, user) {
        if (!user) {
            return [];
        }
        return Promise.all(
            pic.checkins.map(checkinId => {
                return new Promise(function(resolve) {
                    Checkin.findById(checkinId)
                    .then(function(checkin) {
                        resolve(checkin.user.toString() === user._id.toString());
                    });
                })
            })
        );
    };

    var addPicture = function (questId, pictureId) {
        return new Promise(function (resolve) {
            Picture
                .findById(pictureId)
                .then(function (pic) {
                    Promise
                        .all([
                            addComments(questId, pictureId),
                            addLikes(questId, pictureId),
                            isCheckined(pic, req.user)
                        ])
                        .then(function (results) {
                            resolve({
                                id: pic._id,
                                name: pic.name,
                                description: pic.description,
                                url: pic.url,
                                authExists: req.authExists,
                                comments: results[0],
                                likes: results[1],
                                checked: results[2].some(elem => elem)
                            });
                        });
                })
        });
    };

    Quest.findById(req.params.id)
    .populate('user')
    .exec(function (error, quest) {
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

        var is_admin = (req.user) ? (req.user.username == quest.user.username) : false;

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
                            url: pictures[0].url,
                            authExists: req.authExists,
                            pictures: pictures,
                            comments: results[0],
                            likes: results[1],
                            is_admin: is_admin
                        });
                    });
            });
    });
};


