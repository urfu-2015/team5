'use strict';

var express = require('express');
var passport = require('passport');
var index = require('./controllers/index');
var auth = require('./controllers/auth');
var quest = require('./controllers/quests');
var like = require('./controllers/like');
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
    app.get('/register', auth.registerPage);
    app.get('/logout', auth.logout);
    app.get('/quests', quest.list);
    app.get('/', index.index);

    // API
    app.use('/api/v1', router);

    router.route('/like')
        .post(loggedIn, like.addLike);

    router.route('/like/:like_id')
        .get(loggedIn, like.getLike)
        .delete(loggedIn, like.delLike);
};
