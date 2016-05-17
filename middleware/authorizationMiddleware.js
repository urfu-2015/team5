'use strict';

module.exports.checkAuthorization = function(req, res, next) {
    req.authExists = (req.user != undefined);
    next();
};

module.exports.loggedIn = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports.requireAuthorization = function (req, res, next) {
    if (!req.authExists) {
        res.status(401).json({
            message: 'Unauthorized'
        });
    } else {
        next();
    }
};