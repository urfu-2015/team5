'use strict';
var express = require('express');
var passport = require('passport');
var index = require('./controllers/index');
var auth = require('./controllers/auth');
var quest = require('./controllers/quests');
var like = require('./controllers/like');
var loader = require('./controllers/loader');
var multer = require('multer');
var router = express.Router();

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = function (app) {
    app.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));
    app.get('/login', auth.loginPage);
    app.post('/register', auth.register);
    app.post('/loader', multer({ dest: './uploads/'}).single('newImage'), loader.upload);
    app.get('/register', auth.registerPage);
    app.get('/logout', auth.logout);
    app.get('/quests', quest.list);
    app.get('/', index.index);
    app.use('/api/v1', router);

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
