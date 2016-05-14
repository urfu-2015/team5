'use strict';

var Quest = require('./../models/quest');
var Checkin = require("./../models/checkin.js");
var Picture = require('./../models/picture');

exports.show = function (req, res) {
    Quest.findById(req.params.id, function (error, quest) {
        if (error) {
            console.error(error);
            return;
        }

        var pictures = [];
        quest.pictures.forEach(function (item) {
            Picture.findById(item, function (error, pic) {
                //var checked =  req.user ? isChecked(pic, req.user._id) : false;
                pictures.push({
                    name: pic.name,
                    description: pic.description,
                    url: pic.url
                    //checked
                });
            });
        });

        res.render('quest/quest', {
            name: quest.name,
            description: quest.description,
            url: quest.cover,
            pictures: pictures
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
