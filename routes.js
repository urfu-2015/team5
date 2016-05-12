'use strict';
var express = require('express');
var passport = require('passport');
var index = require('./controllers/index');
var auth = require('./controllers/auth');
var quest = require('./controllers/quests');
var comment = require('./controllers/comment');
var like = require('./controllers/like');
var addQuest = require('./controllers/addquest');
var questShow = require('./controllers/questshow');
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
    app.get('/quests/add', loggedIn, quest.addQuestPage);
    app.post('/quests/add', loggedIn, addQuest.add);
    app.get('/quests/edit/:id', loggedIn, quest.editQuestPage);
    app.post('/quests/edit/:id', loggedIn, quest.edit);
    app.post('/quests/remove/:id', loggedIn, quest.remove);
    app.get('/', index.index);
    app.use('/api/v1', router);
    app.get('/quests/:id', questShow.show);

    app.post('/comment', loggedIn, comment.addComment);
    app.get('/comment/:comment_id', loggedIn, comment.getComment);
    app.put('/comment/:comment_id', loggedIn, comment.updComment);
    app.delete('/comment/:comment_id', loggedIn, comment.delComment);

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
