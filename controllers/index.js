'use strict';

exports.index = function (req, res, next) {
    res.render('index/index', {
        title: 'Фото-Квест',
        authExists: req.authExists,
        isDev: req.isDev
    });
};
