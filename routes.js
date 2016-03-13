'use strict';

var passport = require('passport');
var index = require('./controllers/index');
var auth = require('./controllers/auth');
var quests = require('./controllers/quests');

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
	app.get('/', index.index);
	app.get('/quests', quests.list);
	app.get('/quests/:name', quests.content);
};
