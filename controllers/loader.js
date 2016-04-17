/**
 * Created by Max on 17.04.2016.
 */
var cloudinary = require('cloudinary');
var config = require('config');
var fs = require('fs-extra');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || config.get('cloudName'),
    api_key: process.env.API_KEY || config.get('apiKey'),
    api_secret: process.env.API_SECRET || config.get('apiSecret')
});

exports.upload = function (req, res) {
    cloudinary.uploader.upload(req.file.path, function(result) {
        var data = cloudinary.image(result.url, { alt: "quest img" });
        fs.remove('./uploads', function (err) {
            if (err) {
                return console.error(err)
            }
        });
        res.send(data);
    });
};
