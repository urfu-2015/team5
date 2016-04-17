'use strict';
var express = require('express');
var passport = require('passport');
var index = require('./controllers/index');
var auth = require('./controllers/auth');
var quests = require('./controllers/quests');
var like = require('./controllers/like');
var quest = require('./controllers/quest');
var router = express.Router();

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

function addUserMiddleware(req, res, next) {
    req.render_data || (req.render_data = {});
    req.render_data.user = req.user;
    next();
}

module.exports = function (app) {
    app.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));
    app.get('/login', addUserMiddleware, auth.loginPage);
    app.post('/register', auth.register);
    app.get('/register', addUserMiddleware, auth.registerPage);
    app.get('/logout', auth.logout);
    app.get('/quests', addUserMiddleware, quests.list);
    app.get('/addquest', addUserMiddleware, quests.addQuestPage);
    app.get('/', addUserMiddleware, index.index);
    app.use('/api/v1', router);
    app.use('/quests/:id', addUserMiddleware, quest.getQuestPage);
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
