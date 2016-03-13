var expect = require('chai').expect;
var request = require('supertest');

describe('Index', function () {
	it('should return 200 on index page', function (done) {
		var app = require('./../../app.js');
		request(app)
		.get('/')
		.expect('Content-Type', /html/)
		.expect(200)
		.end(function(err, res){
			done(err);
		});
	});
});