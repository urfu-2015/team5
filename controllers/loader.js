var cloudinary = require('cloudinary');
var fs = require('fs-extra');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

exports.upload = function (path) {
    return cloudinary.uploader.upload(path, function() {
        fs.remove('./uploads', function (err) {
            if (err) {
                return console.error(err);
            }
        });
    });
};
