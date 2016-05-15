'use strict';

var cloudinary = require('cloudinary');
var fs = require('fs-extra');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

exports.uploadPhotoToCloudinary = function (path) {
    return cloudinary.uploader.upload(path, function() {
        fs.remove('./uploads', function (err) {
            if (err) {
                return console.error(err);
            }
        });
    });
};


exports.getPicturesUrl = function(paths, callback) {
    var promises = [];
    paths.forEach(function (item) {
        promises.push(exports.uploadPhotoToCloudinary(item));
    });
    Promise
        .all(promises)
        .then(function (results) {
            var urls = [];
            results.forEach(function (item) {
                urls.push(item.url);
            });
            callback(null, urls);
        }, function (error) {
            callback(error);
        });
};
