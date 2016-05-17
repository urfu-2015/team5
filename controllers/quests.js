'use strict';

var Quest = require('./../models/quest');
var Like = require('./../models/like');
var Picture = require('./../models/picture');

exports.list = function (req, res) {
    var allQuest = Quest.find().populate('likes').populate('pictures').exec();
    allQuest
        .then(function (quests) {
            var data = getQuestListData(quests);
            data.authExists = req.authExists;
            res.render('quests/quests', data);
        })
        .catch(
            function (error) {
                console.error(error);
                res.sendStatus(500);
            }
        );
};

exports.addQuestPage = function (req, res) {
    res.render('managequest/managequest', {
        data: req.render_data,
        authExists: req.authExists,
        addquest: true,
        form_action_url: '/quests/add'
    });
};

exports.edit = function (req, res) {
    res.send('Not implemented');
};

exports.editQuestPage = function (req, res) {
    Quest.findById(req.params.id)
    .populate('pictures')
    .exec(function (error, quest) {
        if (error) {
            console.error(error);
            res.status(error.status || 500);
            res.render('error/error', {
                message: error.message,
                error: error
            });
            return;
        }
        res.render('managequest/managequest', {
            data: req.render_data,
            quest: quest,
            authExists: req.authExists,
            form_action_url: '/quests/edit/' + quest._id
        })
     });
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

exports.search = function (req, res) {
    var obj = req.query.text ? { $text: { $search: req.query.text } } : {};
    Quest.find(obj, function (error, quests) {
        if (error) {
            console.error(error);
            res.sendStatus(500);
            return;
        }
        var data = getQuestListData(quests);
        data.authExists = req.authExists;
        res.render('quests/quests', {
            questList: data.questList,
            authExists: req.authExists
        });
    });
};

function getQuestListData(quests) {
    var data = {};
    data.questList = quests.map(function (item) {
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
            description: item.description.slice(0, 200) + '...',
            url: picUrl
        };
    });
    data.quests = true;
    return data;
}
