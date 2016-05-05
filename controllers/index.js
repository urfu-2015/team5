'use strict';

exports.index = function (req, res, next) {
    console.log(req.render_data);
    res.render('index/index', {
        title: 'Фото-Квест',
        authExists: req.authExists
    });
};
