'use strict';

var Quest = require('./../models/quest');
var User = require('./../models/user');
var Checkin = require('./../models/checkin');
var Picture = require('./../models/picture');
var Helpers = require('./helpers');
var multiparty = require('multiparty');

exports.list = function (req, res) {
    var allQuest = Quest
        .find()
        .populate('likes')
        .populate({
            path: 'pictures',
            populate: {
                path: 'checkins'
            }
        })
        .exec();
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
                error: error,
                isDev: req.isDev
            });
        }
    );
};

exports.show = function (req, res) {
    var user = req.authExists ? req.user._id : undefined;

    var getComments = function (pictureId, comments) {
        var result = [];

        result = comments.filter(function (item) {
            return (String(item.picture) === String(pictureId));
        });
        result = result.map(function (item) {
            var edit = (String(item.user._id) === String(user));
            return {
                id: item._id,
                user: item.user.username,
                date: item.uploaded.toLocaleString("ru", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long',
                    timezone: 'UTC',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                }),
                content: item.content,
                edit: edit
            }
        });

        return result;
    };

    var getPictures = function (pic) {
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
            amountComments: pic.comments.length,
            user_like_id: user_like_id,
            type_like: 'picture',
            user_like_this_exist: user_like_id != '',
            likesQuantity: pic.likes.length,
            isCheckedPicture: isCheckined(req.user, pic),
            checkins: pic.checkins,
            amountCheckins: pic.checkins.length,
            isDev: req.isDev
        };
    };

    var query = Quest.findById(req.params.id)
        .populate('likes')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .populate({
            path: 'pictures',
            populate: [
                {path: 'comments'},
                {path: 'likes'},
                {path: 'checkins'}
            ]
        })
        .exec();
    query.then(function (quest) {
        var is_admin = (user) ? (String(user) === String(quest.user._id)) : false;

        var isStarted = quest.members.some(function (item) {
            return (String(item) == user);
        });

        var pictures = quest.pictures.map(getPictures);

        var checkinsCount = 0;
        pictures.forEach(function (pic) {
            if (isCheckined(req.user, pic)) {
                checkinsCount++;
            }
        });

        pictures.forEach(function (pic) {
            pic.isAdmin = is_admin;
            pic.isStarted = isStarted;
            pic.checkinsQuantity = checkinsCount;
            pic.allPicturesQuantity = pictures.length;
            pic.comments = getComments(pic.id, quest.comments);
            pic.isComments = pic.comments.length > 0;
        });

        var comments = getComments(undefined, quest.comments);

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
            isStarted: isStarted,
            pictures: pictures,
            comments: comments,
            amountComments: quest.comments.length,
            user_like_id: user_like_id,
            user_like_this_exist: user_like_id != '',
            likesQuantity: quest.likes.length,
            is_admin: is_admin,
            type_like: 'quest',
            checkinsQuantity: checkinsCount,
            allPicturesQuantity: pictures.length,
            isComments: comments.length > 0,
            isQuest: true
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
        addQuest: true,
        formActionUrl: '/quests/add',
        createQuest: true,
        isDev: req.isDev
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
                        currentPicture.description = fields['pictureDescriptions[]'][i];
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
                                error: error,
                                isDev: req.isDev
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
                    error: error,
                    isDev: req.isDev
                });
                return;
            }
            res.render('managequest/managequest', {
                data: req.render_data,
                quest: quest,
                authExists: req.authExists,
                form_action_url: '/quests/edit/' + quest._id,
                editQuest: true,
                isDev: req.isDev
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
                if (String(item._id) === String(user.checkins[i])) {
                    return true;
                }
            }
        });
    }
    return false;
}

exports.search = function (req, res) {
    var obj = req.query.text ? { $text: { $search: req.query.text, $language: "ru"} } : {};
    var foundedQuests = Quest.find(obj).populate('likes').populate('pictures').exec();

    foundedQuests
        .then(function (quests) {
            var data = getQuestListData(quests, req);
            data.isDev = req.isDev;
            res.render('quests/quests', data);
        })
        .catch(
        function (error) {
            console.error(error);
            res.status(error.status || 500);
            res.render('error/error', {
                message: error.message,
                error: error,
                isDev: req.isDev
            });
        }
    );
};

function sortQuests(questList, param) {
    var comp;
    switch (param) {
        case 'ageasc':
            comp = function (a, b) {
                return b.uploaded - a.uploaded;
            };
            break;
        case 'agedesc':
            comp = function (a, b) {
                return a.uploaded - b.uploaded;
            };
            break;
        case 'commasc':
            comp = function (a, b) {
                return b.amountComments - a.amountComments;
            };
            break;
        case 'likeasc':
            comp = function (a, b) {
                return b.likesQuantity - a.likesQuantity;
            };
            break;
        case 'alphasc':
            comp = function (a, b) {
                return a.name.localeCompare(b.name) === 1;
            };
            break;
        default:
            return;
    }
    questList.sort(comp);
}

exports.sort = function (req, res) {
    var foundedQuests = Quest
        .find()
        .populate('likes')
        .populate({
            path: 'pictures',
            populate: {
                path: 'checkins'
            }
        })
        .exec();

    foundedQuests
        .then(function (quests) {
            var data = getQuestListData(quests, req);
            sortQuests(data.questList, req.query.sp);
            data.selectedOrder = req.query.sp;
            data[req.query.sp] = true;
            data.isDev = req.isDev;
            res.render('quests/quests', data);
        })
        .catch(
            function (error) {
                console.error(error);
                res.status(error.status || 500);
                res.render('error/error', {
                    message: error.message,
                    error: error,
                    isDev: req.isDev
                });
            }
        );
};

function getQuestListData(quests, req) {
    var data = {};
    data.questList = quests.map(function (item) {
        var picUrl = item.pictures[0].url;
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
            amountComments: item.comments.length,
            likesQuantity: item.likes.length,
            user_like_id: user_like_id,
            user_like_this_exist: user_like_id != '',
            checkinsQuantity: checkinsCount,
            type_like: 'quest',
            allPicturesQuantity: item.pictures.length,
            uploaded: item.uploaded
        }
    });
    data.quests = true;
    data.authExists = req.authExists;
    return data;
}

exports.start = function (req, res) {
    Quest
        .findById(req.params.id)
        .then(function (quest) {
            quest.members.push(req.user._id);
            return quest.save();
        })
        .then(function () {
            res.status(200).json({
                message: 'OK'
            });
        })
        .catch(function (error) {
            res.status(error.status || 500);
        });
};

exports.end = function (req, res) {
    var query = Quest
        .findById(req.params.id)
        .populate({
            path: 'members'
        })
        .exec();
    query
        .then(function (quest) {
            quest.members = quest.members.filter(function (user) {
                return (String(user._id) != req.user._id);
            });
            quest
                .save()
                .then(function () {
                    res.status(200).json({
                        message: 'OK'
                    });
                });
        })
        .catch(function (error) {
            res.status(error.status || 500);
        });
};

exports.reset = function (req, res) {
    var query = User
        .findById(req.user._id)
        .populate({
            path: 'checkins',
            populate: {
                path: 'picture'
            }
        })
        .exec();
    query
        .then(function (user) {
            var promises = [];
            user.checkins = user.checkins.filter(function (item) {
                if (String(item.picture.quest) == req.params.id) {
                    promises.push(Checkin
                        .findById(item._id)
                        .remove());
                    return false;
                }
                return true;
            });
            Promise
                .all(promises)
                .then(function () {
                    return user.save();
                })
                .then(function () {
                    res.status(200).json({
                        message: 'OK'
                    });
                });
        })
        .catch(function (error) {
            res.status(error.status || 500);
        });
};
