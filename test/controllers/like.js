const expect = require('chai').expect;
const should = require("should");
const request = require("supertest");
const server = request.agent("http://localhost:3000");
const app = require('./../../app.js');
var User = require('./../../models/user');

describe('Like', function () {
    var user = {username: 'admin', password: 'admin'};
    before(function (done) {
        new User(user).save().then();
        loginUser(done)
    });
    it('должен возвращает 302 на post /api/v1/like/ page т.к. не авторизован ', function (done) {
        server
            .post('/api/v1/like/')
            .expect(302)
            .end(function (err, res) {
                res.headers.location.should.have.equal("/login");
                done(err);
            });
    });
    it('должен возвращает 302 на get /api/v1/like/ page т.к. не авторизован ', function (done) {
        server
            .get('/api/v1/like/56e5731f3a403ffc4ed501a8')
            .expect(302)
            .end(function (err, res) {
                res.headers.location.should.have.equal("/login");
                done(err);
            });
    });
    it('должен возвращает 302 на del /api/v1/like/:id page т.к. не авторизован ', function (done) {
        server
            .delete('/api/v1/like/56e5731f3a403ffc4ed501a8')
            .expect(302)
            .end(function (err, res) {
                res.headers.location.should.have.equal("/login");
                done(err);
            });
    });

    after(function () {
        User.findOne(user).remove().then();
    })
});

function loginUser(done) {
    server
        .post('/login')
        .send({username: 'admin', password: 'admin'})
        .expect(302)
        .expect('Location', '/')
        .end(onResponse);

    function onResponse(err, res) {
        console.log(res);
        if (err) return done(err);
        return done();
    }
}

