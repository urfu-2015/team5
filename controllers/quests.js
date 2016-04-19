'use strict';

var Quest = require('./../models/quest');
var Picture = require('./../models/picture');

exports.list = function (req, res) {
    Quest.find(function (error, quests) {
        if (error) {
            console.error(error);
            res.sendStatus(500);
            return;
        }

        var data = {};
        data['quests'] = quests.map(function (item) {
            var picUrl = '';

            if (item.cover) {
                picUrl = item.cover;
            } else {
                item.pictures.reduce(function (lastLikes, curtPic) {
                    var likes;
                    var tmpUrl;
                    Picture.findById(curtPic, function (error, pic) {
                        if (error) {
                            console.error(error);
                            return;
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
                id: item._id,
                name: item.name,
                description: item.description,
                url: picUrl
            };
        });
        res.render('quests/quests', data);
    });
};

exports.addQuestPage = function (req, res) {
    res.render('addquest/addquest', {
        data: req.render_data
    });
};

exports.edit = function (req, res) {
    res.send('Not implemented');
};

exports.editQuestPage = function (req, res) {
    res.send('Not implemented');
};

exports.remove = function (req, res) {
    var questId = req.params.id;
    Quest.remove({
        user: req.user._id,
        _id: questId
    }, function (err, data) {
        res.redirect('/quests');
    });
};

