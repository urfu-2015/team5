'use strict';

var User = require('./../models/user');
var Comment = require('./../models/comment');

function getCommentData(data) {
    return new Promise(function (resolve, reject) {
        User.findById(data.user, function (error, user) {
            if (error) {
                console.error(error);
                reject();
            }
            if (user === null) {
                reject({
                    message: 'Error! No user found!',
                    error: { status: 404 }
                });
            }
            resolve({
                message: 'OK',
                user: user.username,
                content: data.content
            });
        });
    });
}

exports.getComment = function (req, res) {
    Comment.findOne({
        _id: req.params.comment_id
    })
        .then(function (data) {
            return getCommentData(data);
        })
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (error) {
            res.status(error.status || 500);
            res.render('error/error', {
                message: error.message,
                error: error
            });
        });
};

exports.addComment = function (req, res) {
    var comment = new Comment({
        user: req.user._id,
        content: req.body.content,
        picture: req.body.picture_id,
        quest: req.body.quest_id
    });
    comment
        .save()
        .then(function (data) {
            return getCommentData(data);
        })
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (error) {
            res.status(error.status || 500);
            res.render('error/error', {
                message: error.message,
                error: error
            });
        });
};

exports.delComment = function (req, res) {
    Comment.findOne({
        _id: req.params.comment_id,
        user: req.user._id
    })
        .remove()
        .then(function (data) {
            res.status(200).json({
                message: 'OK'
            });
        })
        .catch(function (error) {
            res.status(error.status || 500);
            res.render('error/error', {
                message: error.message,
                error: error
            });
        });
};

exports.updComment = function (req, res) {
    Comment.findOne({
        _id: req.params.comment_id,
        user: req.user._id
    })
        .then(function (data) {
            data.content = req.body.content;
            return data.save();
        })
        .then(function (data) {
            return getCommentData(data);
        })
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (error) {
            res.status(error.status || 500);
            res.render('error/error', {
                message: error.message,
                error: error
            });
        });
};
