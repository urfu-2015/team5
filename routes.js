'use strict';
var express = require('express');
var passport = require('passport');
var index = require('./controllers/index');
var auth = require('./controllers/auth');
var quest = require('./controllers/quests');
var like = require('./controllers/like');
var questShow = require('./controllers/questshow');
var multer = require('multer');
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
    app.post('/loader', multer({ dest: './uploads/'}).single('newImage'), loader.upload);
    app.get('/register', addUserMiddleware, auth.registerPage);
    app.get('/logout', auth.logout);
    app.get('/quests', addUserMiddleware, quest.list);
    app.get('/addquest', addUserMiddleware, quest.addQuestPage);
    app.get('/', addUserMiddleware, index.index);
    app.use('/api/v1', router);
    app.use('/quests/:id', questShow.show);

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
