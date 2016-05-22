const should = require("should");
var superagent = require('superagent');
const app = require('./../../app');
var User = require('./../../models/user');
var request = require('supertest').agent(app);
var userName = 'berry1@example.com';
var realPassword = 'secret1';

var login = function (request, done) {
    var post = {
        username: userName,
        password: realPassword
    };
    request
        .post('/login')
        .send(post)
        .expect(302)
        .end(function (err, res) {
            should.not.exist(err);
            // confirm the redirec
            res.header['location'].should.equal('/');
            done();
        });
};


describe('Like Unauthorized', function () {
    describe(' picture', function () {
        it(
            'должен возвращает 401 на post /picture/1/like page т.к. не авторизован ',
            function (done) {
                request
                    .post('/picture/1/like')
                    .expect(401, done);
            }
        );
        it(
            'должен возвращает 401 на post /picture/1/like/1 page т.к. не авторизован ',
            function (done) {
                request
                    .get('/picture/1/like/1')
                    .expect(401, done);
            }
        );
        it(
            'должен возвращает 401 на delete /picture/1/like/1 page т.к. не авторизован ',
            function (done) {
                request
                    .delete('/picture/1/like/1')
                    .expect(401, done);
            }
        );
    });
    describe('quest', function () {
        it(
            'должен возвращает 401 на post /quest/1/like/ page т.к. не авторизован ',
            function (done) {
                request
                    .post('/quest/1/like/')
                    .expect(401, done);
            })
        ;
        it(
            'должен возвращает 401 на get /quest/1/like/1 page т.к. не авторизован ',
            function (done) {
                request
                    .get('/quest/1/like/1')
                    .expect(401, done);
            }
        );
        it(
            'должен возвращает 401 на delete /quest/1/like/1 page т.к. не авторизован ',
            function (done) {
                request
                    .delete('/quest/1/like/1')
                    .expect(401, done);
            });
    });
});

describe('Like', function () {

    beforeEach(function (done) {
        User.create({username: userName}, function (err, u) {
            u.setPassword(realPassword, function (err) {
                u.save();

            });
        });

        login(request, function () {
            done();
        });
    });

    it('должен возвращает 500 на post /picture/1/like page т.к. нет такой фотографии ', function (done) {
        request
            .post('/picture/1/like')
            .expect(500)
            .end(function (err, res) {
                //res.headers.location.should.have.equal("/");
                done(err);
            });
    });
//    // it('должен возвращает 302 на get /api/v1/like/ page т.к. не авторизован ', function (done) {
//    //    server
//    //        .get('/api/v1/like/56e5731f3a403ffc4ed501a8')
//    //        .expect(302)
//    //        .end(function (err, res) {
//    //            res.headers.location.should.have.equal("/login");
//    //            done(err);
//    //        });
//    // });
//    // it('должен возвращает 302 на del /api/v1/like/:id page т.к. не авторизован ', function (done) {
//    //    server
//    //        .delete('/api/v1/like/56e5731f3a403ffc4ed501a8')
//    //        .expect(302)
//    //        .end(function (err, res) {
//    //            res.headers.location.should.have.equal("/login");
//    //            done(err);
//    //        });
//    // });
//
});

function loginUser(done) {
    server
        .post('/login')
        .send({username: 'admin', password: 'admin'})
        .expect(302)
        .expect('Location', '/login')
        .end(onResponse);

    function onResponse(err, res) {
        if (err) return done(err);
        return done();
    }
}
