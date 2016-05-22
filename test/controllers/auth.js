//var expect = require('chai').expect;
var should = require('should');
var request = require('supertest');
var app = require('../../app');
var User = require('../../models/user');


var userName = 'berry1@example.com';
var realPassword = 'secret1';

describe('Auth', function () {

    describe('login', function () {
        beforeEach(function (done) {
            User.create({username: userName}, function (err, u) {
                u.setPassword(realPassword, function (err) {
                    u.save();
                    done();
                });
            });
        });
        describe('POST /login', function () {
            it('should redirect to "/" if authentication success', function (done) {
                // post is what we will be sending to the /auth/local
                var post = {
                    username: userName,
                    password: realPassword
                };
                request(app)
                    .post('/login')
                    .send(post)
                    .expect(302)
                    .end(function (err, res) {
                        should.not.exist(err);
                        // confirm the redirect
                        res.header['location'].should.equal('/');
                        done();
                    });
            });
            it('should redirect to "/login" if authentication fails', function (done) {
                var post = {
                    email: 'berry@example.com',
                    password: 'fakepassword'
                };
                request(app)
                    .post('/login')
                    .send(post)
                    .expect(302)
                    .end(function (err, res) {
                        should.not.exist(err);
                        // confirm the redirect
                        res.header['location'].should.equal('/login');
                        done();
                    });
            });
        });
    });

    before(function (done) {
        User.remove({}, done);
    });

    it('should create user', function (done) {
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

    it('should not duplicate user', function (done) {
        request(app)
            .post('/register')
            .send({
                'username': 'Vasya',
                'email': 'va@sya.ru',
                'password': '132131321'
            })
            .expect(500)
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


