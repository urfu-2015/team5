var expect = require('chai').expect;
var request = require('supertest');
var app = require('../../app');
var User = require('../../models/user');

describe('Auth', function () {

    before(function (done) {
        User.remove({}, done);
    });

    it('should pass only if environment is testing', function (done) {
        request(app)
            .post('/register')
            .send({
                'username': 'Vasya',
                'email': 'va@sya.ru',
                'password': '132131321'
            })
            .expect(302)
            .expect('Location', '/')
            .end(function (err, res) {
                done(err);
            });
    });

    it('should log in on valid user', function (done) {
        request(app)
            .post('/login')
            .send({
                'username': 'Vasya',
                'password': '132131321'
            })
            .expect(302)
            .expect('Location', '/')
            .end(function (err, res) {
                done(err);
            });
    });

    it('should not log in on invalid user', function (done) {
        request(app)
            .post('/login')
            .send({
                'username': 'Petya',
                'password': '132131321'
            })
            .expect(302)
            .expect('Location', '/login')
            .end(function (err, res) {
                done(err);
            });
    });

    it('should not log in on invalid password', function (done) {
        request(app)
            .post('/login')
            .send({
                'username': 'Vasya',
                'password': 'l333333t'
            })
            .expect(302)
            .expect('Location', '/login')
            .end(function (err, res) {
                done(err);
            });
    });

});
