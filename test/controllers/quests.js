var app = require('./../../app.js');
var expect = require('chai').expect;
var request = require('supertest');

describe('Quests', function () {
	it('should return 200 on quests list', function (done) {
		request(app)
		.get('/quests')
		.expect('Content-Type', /html/)
		.expect(200)
		.end(function(err, res){
			done(err);
		});
	});
});