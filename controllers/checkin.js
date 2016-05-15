'use strict';

var Quest = require('./../models/quest');
var Checkin = require("./../models/checkin.js");
var User = require('./../models/user');
var Picture = require('./../models/picture');

function compare(picLocation, userLocation) {
    //Функция сравнение координат, что считать одной точкой
    return true;
}

exports.check = function (req, res) {
    Picture
        .findById(req.params.picture_id)
        .then(function (pic) {
            if (compare(pic.location, req.body.location)) {
                return pic._id;
            }
        })
        .then(function (picture_id) {
            if (picture_id) {
                var checkin = new Checkin({
                    user: req.user._id,
                    picture: picture_id
                });
                checkin
                    .save()
                    .then(function () {
                        res.status(200).json({
                            message: 'OK',
                            content: true
                        });
                    });
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
