'use strict';

var passport = require('passport');
var index = require('./controllers/index');
var auth = require('./controllers/auth');
var quest = require('./controllers/quests');

module.exports = function (app) {
	app.post('/login', passport.authenticate('local'), auth.checkLogin);
	app.get('/login', auth.loginPage);
	app.post('/register', auth.register);
	app.get('/register', auth.registerPage);
	app.get('/logout', auth.logout);
	app.get('/quests', quest.list);
	app.get('/', index.index);
};
