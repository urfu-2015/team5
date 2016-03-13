'use strict';

var hbs = require('hbs');

module.exports = function () {
    hbs.registerHelper('eachThird', function (index) {
        if (index % 3 === 2) {
            return new hbs.SafeString(
                '</div>' +
                '<div class="row featurette">'
            );
        }
    });

    hbs.registerHelper('ifCond', function (first, second, options) {
        if (first === second) {
            options.fn(this);
        }
        return options.inverse(this);
    })
};