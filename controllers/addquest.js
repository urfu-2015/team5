'use strict';

var Quest = require('./../models/quest');
var Picture = require('./../models/picture');

exports.add = function(req, res) {
    var data = req.body;
    var picturesList = [];

    var quest = new Quest({
        name: data.name,
        location: data.location,
        description: data.description,
        url: 'tmpUrl',
        user: req.user._id
    });
    quest.save();

    for (var i = 0; i < data.pictureNames.length; ++i) {
        var picture = new Picture({
            name: data.pictureNames[i],
            location: data.pictureLocations[i],
            description: data.pictureDescriptions[i],
            url: 'tmpUrl',
            quest: quest._id
        });
        picture.save();
        picturesList.push(picture._id);
    }
    Quest
        .where({ _id: quest._id })
        .update({ pictures: pictureList });

    res.sendStatus(200);
};
