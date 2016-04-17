'use strict';

var Quest = require('./../models/quest');
var Picture = require('./../models/picture');

exports.list = function (req, res) {
    Quest.find(function (error, quests) {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        }

        var data = {};
        data['quests'] = quests.map(function (item) {
            var picUrl = '';
            if (item.cover) {
                Picture.findById(item.cover, function (error, pic) {
                    if (error) {
                        console.error(error);
                        res.status(500).json(error);
                    }
                    picUrl = pic.url;
                });
            } else {
                item.pictures.reduce(function (lastLikes, curtPic) {
                    var likes;
                    var tmpUrl;
                    Picture.findById(curtPic, function (error, pic) {
                        if (error) {
                            console.error(error);
                            res.status(500).json(error);
                        }
                        likes = pic.likes.length;
                        tmpUrl = pic.url;
                    });
                    if (likes >= lastLikes) {
                        picUrl = tmpUrl;
                        return likes;
                    }
                    return lastLikes;
                }, 0);
            }

            return {
                name: item.name,
                description: item.description,
                url: picUrl
            };
        });
        res.render('quests/list', data);
    });
};
