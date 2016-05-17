'use strict';

var Quest = require('./../models/quest');
var Like = require('./../models/like');
var Picture = require('./../models/picture');
var Helpers = require('./helpers');
var multiparty = require('multiparty');

exports.list = function (req, res) {
    var allQuest = Quest.find().populate('likes').populate('pictures').exec();
    allQuest
        .then(function (quests) {
            var data = getQuestListData(quests, req);
            res.render('quests/quests', data);
        })
        .catch(
            function (error) {
                console.error(error);
                res.status(error.status || 500);
                res.render('error/error', {
                    message: error.message,
                    error: error
                });
            }
        );
};

exports.show = function (req, res) {
    var user = req.authExists ? req.user._id : undefined;

    var getComment = function (comment) {
        var edit = (String(comment.user) === String(user));
        return {
            id: comment._id,
            user: comment.username,
            content: comment.content,
            edit: edit
        }
    };

    var getPictures = function (pic, index, allPictures) {
        var comments = pic.comments.map(getComment);
        var user_like_id = '';
        pic.likes.forEach(function (like) {
            if (like.user == String(user)) {
                user_like_id = String(like._id);
            }
        });
        var miniatureUrl = (pic.url.match(/upload/))
            ? pic.url.replace('/upload/', '/upload/c_fill,h_400,w_500/') : pic.url;

        return {
            id: pic._id,
            name: pic.name,
            description: pic.description,
            url: pic.url,
            miniatureUrl: miniatureUrl,
            authExists: req.authExists,
            comments: comments,
            amountComments: pic.comments.length,
            user_like_id: user_like_id,
            user_like_this_exist: user_like_id != '',
            likesQuantity: pic.likes.length,
            isCheckedPicture: isCheckined(req.user, pic)
        };
    };

    var query = Quest.findById(req.params.id)
        .populate('likes')
        .populate('user')
        .populate('comments')
        .populate({
                path: 'picture',
                populate: [
                    {path: 'likes'},
                    {path: 'comments'},
                    {path: 'checkins'}
                ]
            }
        ).populate('pictures').exec();
    query.then(function (quest) {
        var is_admin = (user) ? (String(user) === String(quest.user)) : false;

        var pictures = quest.pictures.map(getPictures);
        var checkinsCount = 0;

        pictures.forEach(function (pic) {
            if (isCheckined(req.user, pic)) {
                checkinsCount++;
            }
        });

        pictures.forEach(function (pic) {
            pic.checkinsQuantity = checkinsCount;
            pic.allPicturesQuantity = pictures.length;
        });

        var comments = quest.comments.map(getComment);

        var user_like_id = '';
        quest.likes.forEach(function (like) {
            if (like.user == String(user)) {
                user_like_id = String(like._id);
            }
        });

        var picUrl = pictures[0].url;

        res.render('quest/quest', {
            id: quest._id,
            name: quest.name,
            description: quest.description,
            url: picUrl,
            authExists: req.authExists,
            pictures: pictures,
            comments: comments,
            amountComments: quest.comments.length,
            user_like_id: user_like_id,
            user_like_this_exist: user_like_id != '',
            likesQuantity: quest.likes.length,
            is_admin: is_admin,
            checkinsQuantity: checkinsCount,
            allPicturesQuantity: pictures.length
        });
    }).catch(
        function (error) {
            console.error(error);
            res.status(error.status || 500);
            res.render('error/error', {
                message: error.message,
                error: error
            });
        }
    );
};

exports.addQuestPage = function (req, res) {
    res.render('managequest/managequest', {
        data: req.render_data,
        authExists: req.authExists,
        addquest: true,
        form_action_url: '/quests/add',
        createQuest: true
    });
};

exports.edit = function (req, res) {
    Quest.findById(req.params.id)
    .populate('pictures')
    .exec(function (error, quest) {
        var form = new multiparty.Form();
        var newPics = [];
        form.parse(req, function (error, fields, files) {
            quest.name = fields.name;
            quest.description = fields.description;
            for (var i = 0; i < fields['pictureId[]'].length; i++) {
                var currentPictureId = fields['pictureId[]'][i];
                if (currentPictureId) {
                    var currentPicture = quest.pictures.filter((picture) =>
                        picture._id.equals(currentPictureId))[0];
                    currentPicture.name = fields['pictureNames[]'][i];
                    currentPicture.description = fields['pictureDescriptions[]'];
                    currentPicture.save();
                } else {
                    files['pictureFiles[]'][i].size && newPics.push({
                        name: fields['pictureNames[]'][i],
                        description: fields['pictureDescriptions[]'][i],
                        location: fields['pictureLocations[]'][i],
                        path: files['pictureFiles[]'][i].path
                    });
                }
            }
            Helpers.getPicturesUrl(newPics.map(pic => pic.path),
                function (error, picUrls) {
                if (error) {
                    console.error(error);
                    res.status(error.status || 500);
                    res.render('error/error', {
                        message: error.message,
                        error: error
                    });
                    return;
                }
                var savePromises = [];
                for (var i = 0; i < picUrls.length; i++) {
                    var picture = new Picture({
                        name: newPics[i].name,
                        description: newPics[i].description,
                        location: newPics[i].location,
                        url: picUrls[i],
                        quest: quest._id
                    });
                    savePromises.push(picture.save());
                }
                savePromises.push(quest.save());
                Promise.all(savePromises).then(() =>
                    res.redirect('/quests/' + quest._id)
                );
            });
        });
    });
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
                form_action_url: '/quests/edit/' + quest._id,
                editQuest: true
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

function isCheckined(user, pic) {
    if (user) {
        return pic.checkins.some(function (item) {
            for (var i = 0; i < user.checkins.length; ++i) {
                if (String(item) === String(user.checkins[i])) {
                    return true;
                }
            }
        });
    }
    return false;
}

exports.search = function (req, res) {
    var obj = req.query.text ? { $text: { $search: req.query.text } } : {};
    var foundedQuests = Quest.find(obj).populate('likes').populate('pictures').exec();

    foundedQuests
        .then(function (quests) {
            var data = getQuestListData(quests, req);
            res.render('quests/quests', data);
        })
        .catch(
            function (error) {
                console.error(error);
                res.status(error.status || 500);
                res.render('error/error', {
                    message: error.message,
                    error: error
                });
            }
        );
};

function getQuestListData(quests, req) {
    var data = {};
    data.questList = quests.map(function (item) {
        var picUrl = '';
        picUrl = item.pictures[0].url;
        var user_like_id = '';
        var checkinsCount = 0;

        if (req.authExists) {
            item.likes.forEach(function (like) {
                if (like.user == String(req.user._id)) {
                    user_like_id = String(like._id);
                }
            });
            item.pictures.forEach(function (pic) {
                if (isCheckined(req.user, pic)) {
                    checkinsCount++;
                }
            });
        }
        return {
            id: item._id,
            name: item.name,
            description: item.description.slice(0, 200) + '...',
            url: picUrl,
            amount: item.comments.length,
            likesQuantity: item.likes.length,
            user_like_id: user_like_id,
            user_like_this_exist: user_like_id != '',
            checkinsQuantity: checkinsCount,
            allPicturesQuantity: item.pictures.length
        }
    });
    data.quests = true;
    data.authExists = req.authExists;
    return data;
}
