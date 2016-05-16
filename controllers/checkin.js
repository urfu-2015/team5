'use strict';

var Quest = require('./../models/quest');
var Checkin = require('./../models/checkin');
var User = require('./../models/user');
var Picture = require('./../models/picture');
var geoLib = require('geolib');

exports.check = function (req, res) {
    const accuracy = 100;

    var compare = function (picLocation, userLocation) {
        var picCoord = picLocation.split(';');
        var userCoord = userLocation.split(';');

        var distance = geoLib.getDistance({
            latitude: picCoord[0],
            longitude: picCoord[1]
        }, {
            latitude: userCoord[0],
            longitude: userCoord[1]
        });

        return (distance <= 100);
    };

    var user = req.authExists ? req.user._id : undefined;

    var query = Picture
        .findById(req.params.picture_id)
        .populate('checkins')
        .exec();
    query
        .then(function (pic) {
            if (compare(pic.location, req.body.location)) {
                var data = pic.checkins.every(function (item) {
                    if (String(item.user) !== String(user)) {
                        return true;
                    }
                });
                if (user && data) {
                    var checkin = new Checkin({
                        user: user,
                        picture: pic._id
                    });
                    checkin
                        .save()
                        .then(function () {
                            res.status(200).json({
                                message: 'OK',
                                content: true,
                                picture_id: pic._id
                            });
                        });
                    return;
                }
            }
            res.status(200).json({
                message: 'OK',
                content: false
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
