'use strict';

var Quest = require('./../models/quest');
var Checkin = require("./../models/checkin.js");
var User = require('./../models/user');
var Picture = require('./../models/picture');

exports.check = function (req, res) {
    var accuracy = 0.005;

    var compare = function (picLocation, userLocation) {
        var picCoord = picLocation.split(';');
        var userCoord = userLocation.split(';');
        return (Math.abs(picCoord[0] - userCoord[0]) < accuracy &&
            Math.abs(picCoord[1] - userCoord[1]) < accuracy);
    };

    var addCheckin = function (userId, pictureId) {
        Checkin.findOne({
            user: userId,
            picture: pictureId
        }).then(function (data) {
            if (data === null) {
                var checkin = new Checkin({
                    user: userId,
                    picture: pictureId
                });
                checkin
                    .save()
                    .then(function () {
                        res.status(200).json({
                            message: 'OK',
                            content: true,
                            picture_id: pictureId
                        });
                    });
            } else {
                res.status(200).json({
                    message: 'OK',
                    content: false
                });
            }
        });
    };

    Picture
        .findById(req.params.picture_id)
        .then(function (pic) {
            if (compare(pic.location, req.body.location)) {
                return pic._id;
            }
        })
        .then(function (picture_id) {
            if (picture_id) {
                addCheckin(req.user._id, picture_id);
            } else {
                res.status(200).json({
                    message: 'OK',
                    content: false
                });
            }
        })
        .catch(function (error) {
            res.status(error.status || 500);
            res.render('error/error', {
                message: error.message,
                error: error
            });
        });
};
