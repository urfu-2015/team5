'use strict';

var index = require('./controllers/index');
var auth = require('./controllers/auth');

module.exports = function (app) {
	app.post('/login', auth.login);
	app.get('/login', auth.loginPage);
	app.post('/register', auth.register);
	app.get('/register', auth.registerPage);
	app.get('/', index.index);
};
