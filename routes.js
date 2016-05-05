'use strict';
var express = require('express');
var passport = require('passport');
var index = require('./controllers/index');
var auth = require('./controllers/auth');
var quests = require('./controllers/quests');
var like = require('./controllers/like');
var addQuest = require('./controllers/addquest');
var questShow = require('./controllers/questshow');
var router = express.Router();

//TODO: перенести этот код из routes.js?
function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

//TODO: перенести этот код из routes.js?
function checkAuthorization(req, res, next) {
    req.authExists = (req.user != undefined);
    next();
}

module.exports = function (app) {
    app.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));
    app.get('/login', auth.loginPage);
    app.post('/register', auth.register);
    app.get('/register', auth.registerPage);
    app.get('/logout', auth.logout);
    app.get('/quests', checkAuthorization, quests.list);
    app.get('/quests/add', loggedIn, checkAuthorization, quests.addQuestPage);
    app.post('/quests/add', loggedIn, addQuest.add);
    app.get('/quests/edit/:id', loggedIn, checkAuthorization, quests.editQuestPage);
    app.post('/quests/edit/:id', loggedIn, quests.edit);
    app.post('/quests/remove/:id', loggedIn, quests.remove);
    app.get('/', checkAuthorization, index.index);
    app.use('/api/v1', router);
    app.get('/quests/:id', checkAuthorization, questShow.show);

    router.route('/picture/:picture_id/like')
        .post(like.addLike);

    router.route('/picture/:picture_id/like/:like_id')
        .get(like.getLike)
        .delete(like.delLike);

    router.route('/quest/:quest_id/like')
        .post(like.addLike);

    router.route('/quest/:id/like/:like_id')
        .get(like.getLike)
        .delete(like.delLike);
};
