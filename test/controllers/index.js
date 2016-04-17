var app = require('./../../app.js');
var expect = require('chai').expect;
var request = require('supertest');

describe('Index', function () {
    it('should return 200 on index page', function (done) {
        request(app)
            .get('/quests')
            .expect('Content-Type', /html/)
            .expect(200)
            .end(function (err, res) {
                done(err);
            });
    });
});
