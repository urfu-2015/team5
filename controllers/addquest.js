'use strict';

var multiparty = require('multiparty');
var Quest = require('./../models/quest');
var Picture = require('./../models/picture');
var Loader = require('./loader');

exports.add = function(req, res) {
    var form = new multiparty.Form();
    form.parse(req, function (error, field, files) {
        console.log(files);
        var picturesList = [];

        var quest = new Quest({
            name: field.name,
            description: field.description,
            url: Loader.upload(files.cover[0]),
            user: req.user._id
        });
        quest.save();

        for (var i = 0; i < field['pictureNames[]'].length; ++i) {
            var picture = new Picture({
                name: field['pictureNames[]'][i],
                location: field['pictureLocations[]'][i],
                description: field['pictureDescriptions[]'][i],
               // url: Loader.upload(files.pictureFiles[i]),
                quest: quest._id
            });
            picture.save();
            picturesList.push(picture._id);
        }
        Quest
            .where({ _id: quest._id })
            .update({ pictures: picturesList });

        res.redirect('/quests');
    });
};
