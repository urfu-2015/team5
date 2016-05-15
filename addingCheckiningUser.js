/**
 * Created by Max on 14.05.2016.
 */
"use strict";

const mongoose = require('mongoose');
const config = require('config');
const Checkin = require("./models/checkin.js");
const User = require("./models/user.js");


//Before using this script you should register user with username "hh" (withoiut quotemrks)

mongoose
    .connect(config.get('dbURL'))
    .then(() => {
        return User.find({username: "hh"}, function (err, users) {
            if (err) {
                console.error(err);
            }
        })
    })
    .then((users) => {
        //console.log(user);
        return Checkin.find(function (err, checkins) {
            var user = users[0];
            var checkin = checkins[0];
            if (err) {
                console.error(err);
            }
            user.checkins = checkin;
            console.log(checkin);
            checkin['user'] = user._id;
            checkin.save()
            .then(() => user.save());
            console.log(checkin);
            console.log(user);
        });
    })
    .then(() => mongoose.connection.close(),
        (err) => {
            console.log(err.message);
            mongoose.connection.close();
        }
    );
