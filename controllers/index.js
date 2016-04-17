'use strict';

exports.index = function (req, res, next) {
    res.render('index/index', {
        title: 'Фото-Квест',
        data: req.render_data
    });
};
