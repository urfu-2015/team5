var Like = require('./../models/like');

exports.addLike = function (req, res) {
    var like = {
        user: req.user._id,
        picture: req.body.picture
    };
    var like_obj = new Like(like);
    like_obj
        .save()
        .then(
            (data) => {
                res.json(data.toJSON())
            }, (err) => {
                console.error(err);
                res.status(500).json(err.message);
            }
        );
};

exports.delLike = function (req, res) {
    Like.findOne({_id: req.params.like_id})
        .remove() .then(
        (data) => {
            res.json(data.toJSON())
        },
        (err) => {
            console.error(err);
            res.status(500).json({error: err.message});
        }
    );
};

exports.getLike = function (req, res) {
    Like.findOne({id: req.params.like_id})
        .then(
            (data) => {
                res.json(data.toJSON())
            },
            (err) => {
                console.error(err);
                res.status(500).json({error: err.message});
            }
        );
};
