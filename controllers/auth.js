'use strict';

var passport = require('passport');
var User = require('./../models/user');

exports.loginPage = function (req, res) {
	res.render('login');
};

exports.login = passport.authenticate('local', function(req, res) {
	console.log(req);
	console.log(res);
	res.redirect('/');
});

exports.registerPage = function (req, res) {
	res.render('register');
};

exports.register = function(req, res, next) {
	console.log('registering user');
	console.log(req.body.username);
	User.register(new User({username: req.body.username}), req.body.password, function (err) {
    if (err) {
		console.log('error while user register!', err);
		return next(err);
    }
    console.log('user registered!');
    res.redirect('/');
  });
};
