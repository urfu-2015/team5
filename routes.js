'use strict';

var index = require('./controllers/index');
var auth = require('./controllers/auth');
var quests = require('./controllers/quests');

module.exports = function (app) {
	app.post('/login', auth.login);
	app.get('/login', auth.loginPage);
	app.post('/register', auth.register);
	app.get('/register', auth.registerPage);
	app.get('/', index.index);
	app.get('/quests', quests.list);
	app.get('/quests/:name', quests.content);
};
