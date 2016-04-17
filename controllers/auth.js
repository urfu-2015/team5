'use strict';

var passport = require('passport');
var User = require('./../models/user');

exports.loginPage = function (req, res, next) {
    res.render('login/login', {errors: req.flash('error')});
};

exports.registerPage = function (req, res) {
    res.render('registration/registration');
};

exports.register = function (req, res, next) {
    User.register(new User({
        username: req.body.username,
        email: req.body.email,
        level: 0
    }), req.body.password, function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });

    console.log(req.user);
};

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};
