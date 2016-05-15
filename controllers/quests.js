'use strict';

var Quest = require('./../models/quest');
var Like = require('./../models/like');
var Picture = require('./../models/picture');

exports.list = function (req, res) {
    var allQuest = Quest.find().populate('likes').populate('pictures').exec();
    allQuest
        .then(function (quests) {
            var data = {};

            data.questList = quests.map(function (item) {
                var picUrl = '';
                if (item.cover) {
                    picUrl = item.cover;
                } else {
                    item.pictures.reduce(function (lastLikes, curtPic) {
                        var likes = curtPic.likes.length;
                        var tmpUrl = curtPic.url;
                        if (likes >= lastLikes) {
                            picUrl = tmpUrl;
                            return likes;
                        }
                        return lastLikes;
                    }, 0);
                }
                var user_like_id = '';

                if (req.authExists) {
                    item.likes.forEach(function (like) {
                        if (like.user == String(req.user._id)) {
                            user_like_id = String(like._id);
                        }
                    });

                }
                return {
                    id: item._id,
                    name: item.name,
                    description: item.description.slice(0, 200) + '...',
                    url: picUrl,
                    quantity: item.likes.length,
                    user_like_id: user_like_id,
                    user_like_this_exist: user_like_id != ''
                }
            });
            data.authExists = req.authExists;
            data.quests = true;
            res.render('quests/quests', data);
        })
        .catch(
            function (error) {
                console.error(error);
                res.sendStatus(500);
            }
        );
};

exports.show = function (req, res) {

    var user = req.authExists ? req.user._id : undefined;
    console.log(user);
    var getComment = function (comment) {
        var edit = (comment.user === String(user));
        console.log(comment);
        return {
            id: comment._id,
            user: comment.user,
            content: comment.content,
            edit: edit
        }
    };

    var getPictures = function (pic) {
        var comments = pic.comments.map(getComment);
        var user_like_id = '';
        pic.likes.forEach(function (like) {
            if (like.user == String(user)) {
                user_like_id = String(like._id);
            }
        });

        var checkins = (user) ? (pic.checkins && String(pic.checkins.user) === String(user)) : false;
        return {
            id: pic._id,
            name: pic.name,
            description: pic.description,
            url: pic.url,
            authExists: req.authExists,
            comments: comments,
            user_like_id: user_like_id,
            user_like_this_exist: user_like_id != '',
            quantity_like: pic.likes.length,
            checked: checkins
        };
    };

    var query = Quest.findById(req.params.id)
        .populate('likes')
        .populate('user')
        .populate('comments')
        .populate({
                path: 'picture',
                populate: [
                    {path: 'likes'},
                    {path: 'comments'},
                    {path: 'checkins'}
                ]
            }
        ).populate('pictures').exec();
    query.then(function (quest) {
        var is_admin = (user) ? (String(user) === String(quest.user)) : false;
        var pictures = quest.pictures.map(getPictures);
        var comments = quest.comments.map(getComment);

        var user_like_id = '';
        quest.likes.forEach(function (like) {
            if (like.user == String(user)) {
                user_like_id = String(like._id);
            }
        });
        res.render('quest/quest', {
            id: quest._id,
            name: quest.name,
            description: quest.description,
            url: pictures[0].url,
            authExists: req.authExists,
            pictures: pictures,
            comments: comments,
            user_like_id: user_like_id,
            user_like_this_exist: user_like_id != '',
            quantity_like: quest.likes.length,
            is_admin: is_admin
        });
    }).catch(
        function (error) {
            console.error(error);
            res.sendStatus(500);
        }
    );
};


exports.addQuestPage = function (req, res) {
    res.render('managequest/managequest', {
        data: req.render_data,
        authExists: req.authExists,
        addquest: true,
        form_action_url: '/quests/add'
    });
};

exports.edit = function (req, res) {
    res.send('Not implemented');
};

exports.editQuestPage = function (req, res) {
    Quest.findById(req.params.id)
        .populate('pictures')
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
            res.render('managequest/managequest', {
                data: req.render_data,
                quest: quest,
                authExists: req.authExists,
                form_action_url: '/quests/edit/' + quest._id
            })
        });
};

exports.remove = function (req, res) {
    var questId = req.params.id;
    Quest.remove({
        user: req.user._id,
        _id: questId
    }, function (err, data) {
        res.redirect('/quests');
    });
};

