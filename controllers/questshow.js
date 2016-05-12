'use strict';

var Quest = require('./../models/quest');
var Comment = require('./../models/comment');
var Picture = require('./../models/picture');

exports.show = function (req, res) {
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

        var pictures = [];
        quest.pictures.forEach(function (item) {
            var comments = [];
            Picture.findById(item, function (error, pic) {
                pictures.push({
                    name: pic.name,
                    description: pic.description,
                    url: pic.url,
                    comments: comments
                });
            });
        });

        var comments = [];
        quest.comments.forEach(function (item) {
            Comment.findById(item, function (error, comment) {
                if (comment.picture === undefined) {
                    comments.push({});
                }
            });
        });

        res.render('quest/quest', {
            id: quest._id,
            name: quest.name,
            description: quest.description,
            url: quest.cover,
            comments: comments,
            pictures: pictures
        });
    });
};
