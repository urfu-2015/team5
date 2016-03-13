'use strict';

var index = require('./controllers/index');
var auth = require('./controllers/auth');

module.exports = function (app) {
	app.get('/', index.index);
};
