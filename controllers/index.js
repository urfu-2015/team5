'use strict';

exports.index = function (req, res, next) {
    res.render('index', {
        title: 'Фото-Квест',
        user: req.user
    });

};
