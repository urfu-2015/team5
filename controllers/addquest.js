'use strict';

var multiparty = require('multiparty');
var Quest = require('./../models/quest');
var Picture = require('./../models/picture');
var Loader = require('./loader');

var getPicturesUrl = function(paths, callback) {
    var promises = [];
    paths.forEach(function (item) {
        promises.push(Loader.upload(item));
    });
    Promise
        .all(promises)
        .then(function (results) {
            var urls = [];
            results.forEach(function (item) {
                urls.push(item.url);
            });
            callback(null, urls);
        }, function (error) {
            callback(error);
        });
};

exports.add = function(req, res) {


    var form = new multiparty.Form();
    form.parse(req, function (error, field, files) {
        var paths = files['pictureFiles[]']
        .filter(function (item) {
            return item.size;
        })
        .map(function (item) {
            return item.path;
        });
        
        if (!paths.length) {
            res.status(500); // TODO Отрефакторить
            res.render('error/error', {
                message: "Нет фотографий"
            });
        }
        
        getPicturesUrl(paths, function(error, picUrls) {
            if (error) {
                console.error(error);
                res.status(error.status || 500);
                res.render('error/error', {
                    message: error.message,
                    error: error
                });
                return;
            }

            var quest = new Quest({
                name: field.name,
                description: field.description,
                cover: picUrls[0],
                user: req.user._id
            });
            quest
                .save()
                .then(function () {
                    for (var i = 0; i < field['pictureNames[]'].length; ++i) {
                        var picture = new Picture({
                            name: field['pictureNames[]'][i],
                            location: field['pictureLocations[]'][i],
                            description: field['pictureDescriptions[]'][i],
                            url: picUrls[i + 1],
                            quest: quest._id
                        });
                        picture.save();
                    }
                    res.redirect('/quests');
                });
        });
    });
};
