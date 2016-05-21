'use strict';

var passport = require('passport');
var User = require('./../models/user');

exports.loginPage = function (req, res, next) {
    res.render('login/login', {
        errors: req.flash('error'),
        login: true,
        isDev: req.isDev
    });
};

exports.registerPage = function (req, res) {
    res.render('registration/registration', {
        registration: true,
        isDev: req.isDev
    });
};

exports.register = function (req, res, next) {
    //Todo: написать обработчик ошибок, например UserExistsError и другие
    User.register(new User({
        username: req.body.username,
        email: req.body.email,
        level: 0
    }), req.body.password, function (err, user) {
        if (err) {
            return next(err);
        }
        req.logIn(user, function(err) {
            return err
                ? next(err)
                : res.redirect('/');
        });
    });
};

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};
