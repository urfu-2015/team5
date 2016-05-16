'use strict';

var cloudinary = require('cloudinary');
var fs = require('fs-extra');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

exports.uploadPhotoToCloudinary = function (path) {
    return cloudinary.uploader.upload(path, function () {
        fs.remove('./uploads', function (err) {
            if (err) {
                return console.error(err);
            }
        });
    });
};


exports.getPicturesUrl = function (paths, callback) {
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

/*exports.getMiniature = function(paths, callback) {
 var promises = [];
 var getMiniaturePicture = function (pictureUrl) {
 return function () {
 return cloudinary.url(pictureUrl, {
 width: 400,
 height: 300,
 crop: "fill"
 });
 }
 };
 paths.forEach(function (url) {
 promises.push(getMiniaturePicture(url));
 });
 Promise
 .all(promises)
 .then(function (urls) {
 callback(null, urls);
 }, function (error) {
 callback(error);
 });
 };*/

exports.getMiniature = function (paths) {
    var miniatures = paths.map(function (pictureUrl) {
        var newUrl = cloudinary.url(pictureUrl, {
            width: 400,
            height: 300,
            crop: "fill"
        });
        return newUrl;
    });
    return miniatures;
};