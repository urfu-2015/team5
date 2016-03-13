'use strict';

var passport = require('passport');
var User = require('./../models/user');

exports.loginPage = function (req, res) {
	    res.render('login');
};

exports.checkLogin = function (req, res) {
	    res.redirect('/');
};

exports.registerPage = function (req, res) {
	    res.render('register');
};

exports.register = function (req, res, next) {
	    User.register(new User({username: req.body.username}), req.body.password, function (err) {
    if (err) {
		        return next(err);
    }
    res.redirect('/');
});
};

exports.logout = function (req, res) {
	    req.logout();
	    res.redirect('/');
};
