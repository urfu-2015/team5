'use strict';

exports.index = function (req, res, next) {
    res.render('index/index', {
        title: 'Фото-Квест',
        user: req.user
    });
};
