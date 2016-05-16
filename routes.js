'use strict';
var express = require('express');
var passport = require('passport');
var index = require('./controllers/index');
var auth = require('./controllers/auth');
var quests = require('./controllers/quests');
var comment = require('./controllers/comment');
var like = require('./controllers/like');
var addQuest = require('./controllers/addquest');
var router = express.Router();
var authorizationMiddleware = require('./middleware/authorizationMiddleware');


module.exports = function (app) {
    router.route('/login')
        .get(auth.loginPage)
        .post(
            passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/login',
                failureFlash: true
            })
        );

    router.route('/register')
        .post(auth.register)
        .get(auth.registerPage);

    router.route('/logout')
        .get(auth.logout);

    router.route('/quests')
        .get(authorizationMiddleware.checkAuthorization, quests.list);

    router.route('/quests/add')
        .get(authorizationMiddleware.loggedIn,
            authorizationMiddleware.checkAuthorization,
            quests.addQuestPage)
        .post(authorizationMiddleware.loggedIn,
            addQuest.add);

    router.route('/quests/edit/:id')
        .get(authorizationMiddleware.loggedIn,
            authorizationMiddleware.checkAuthorization,
            quests.editQuestPage)
        .post(authorizationMiddleware.loggedIn, quests.edit);

    router.route('/quests/remove/:id')
        .post(authorizationMiddleware.loggedIn, quests.remove);

    router.route('/')
        .get(authorizationMiddleware.checkAuthorization, index.index);

    router.route('/quests/:id')
        .get(authorizationMiddleware.checkAuthorization,
            quests.show);

    router.route('/comment')
        .post(authorizationMiddleware.checkAuthorization,
            authorizationMiddleware.requireAuthorization,
            comment.addComment);
    router.route('/comment/:comment_id')
        .get(authorizationMiddleware.checkAuthorization,
            comment.getComment);
    router.route('/comment/:comment_id')
        .delete(authorizationMiddleware.checkAuthorization,
            authorizationMiddleware.requireAuthorization,
            comment.delComment);
    router.route('/comment/:comment_id')
        .put(authorizationMiddleware.checkAuthorization,
            authorizationMiddleware.requireAuthorization,
            comment.updComment);

    router.route('/picture/:picture_id/like')
        .post(authorizationMiddleware.loggedIn,
            like.addLike)
        .get(like.getAllLike);

    router.route('/picture/:picture_id/like/:like_id')
        .get(like.getLike)
        .delete(like.delLike);

    router.route('/quest/:quest_id/like')
        .post(authorizationMiddleware.checkAuthorization,
            authorizationMiddleware.requireAuthorization,
            like.addLike)
        .get(like.getAllLike);

    router.route('/quest/:quest_id/like/:like_id')
        .get(like.getLike)
        .delete(like.delLike);

    app.use(router);
};
