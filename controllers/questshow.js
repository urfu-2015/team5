'use strict';

var Quest = require('./../models/quest');
var Picture = require('./../models/picture');
//var User = require('./../models/user');

exports.show = function (req, res) {
    Quest.findById(req.params.id, function (error, quest) {
        if (error) {
            console.error(error);
            return;
        }
        var pictures = [];
        quest.pictures.forEach(function (item) {
            Picture.findById(item, function (error, pic) {
                pictures.push({
                    name: pic.name,
                    description: pic.description,
                    url: pic.url
                });
            });
        });

        res.render('quest/quest', {
            name: quest.name,
            description: quest.description,
            url: quest.cover,
            pictures,
            authExists: req.authExists
        });
    });
};
