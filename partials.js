'use strict';

var fs = require('fs');
var path = require('path');
var walk = require('walk-sync');

var registerPartial = function (directory, fileName, hbsInstance) {
    var filePath = path.join(directory, fileName);
    var isValidTemplate = /\.(html|hbs)$/.test(fileName);
    if (isValidTemplate) {
        var ext = path.extname(fileName);
        var content = fs.readFileSync(filePath, 'utf-8');
        var templateName = fileName
        .slice(0, -(ext.length)).replace(/[ -]/g, '_').replace('\\', '/');
        hbsInstance.registerPartial(templateName, content);
    }
};

var registerPartials = function (dirPath, hbsInstance) {
    walk(dirPath).forEach(function (fileName) {
        if (!fileName.endsWith('/')) {
            registerPartial(dirPath, fileName, hbsInstance);
        }
    });
};

exports.registerPartials = registerPartials;
