'use strict';

var index = require('./controllers/index');
var auth = require('./controllers/auth');
var quest = require('./controllers/quests');

module.exports = function (app) {
	app.get('/', index.index);
	app.get('/quests', quest.list);
};
