/**
 * Created by Max on 13.03.2016.
 */
'use strict';

const faker = require('faker');
const User = require("./models/user.js");
const Quest = require("./models/quest.js");
const Picture = require("./models/picture.js");
const Comment = require("./models/comment.js");
const Checkin = require("./models/checkin.js");
const Like = require("./models/like.js");
const mongoose = require('mongoose');
const config = require('config');

var generateUsers = count => {
    var users = [];
    for (var i = 0; i < count; i++)
    {
        users.push(
            new User({
                email: faker.internet.email(),
                password: faker.internet.password(),
                username: faker.internet.userName(),
                level: getRandomInt(0, 2)
            })
        );
    }
    return users;
};

var questGenerator = count => {
    let quests = [];
    for (let i = 0; i < count; i++)
    {
        quests.push(
            new Quest({
                name: faker.address.streetName(),
                description: faker.lorem.sentences(15),
                user: users[getRandomInt(0, users.length)]._id,
                cover: getRandomInt(0, 2) ? faker.image.imageUrl() : undefined
            })
        );
    }
    return quests;
};

var pictureGenerator = count => {
    let pictures = [];
    for (let i = 0; i < quests.length; i++) {
        for (let j = 0; j < count; j++) {
            pictures.push(
                new Picture({
                    name: faker.lorem.words(),
                    location: faker.address.streetName(),
                    description: faker.lorem.sentence(),
                    url: faker.image.imageUrl(),
                    quest: quests[i]._id
                })
            );
        }
    }
    return pictures;
};

var commentGenerator = count => {
    let comments = [];
    for (let i = 0; i < count; i++)
    {
        comments.push(new Comment({
            user: users[getRandomInt(0, users.length)]._id,
            content: faker.lorem.sentence(),
            picture: pictures[getRandomInt(0, pictures.length)]._id,
            quest: quests[getRandomInt(0, quests.length)]._id
        }));
    }
    return comments;
};

var checkinGenerator = count => {
    let checkins = [];
    for (let i = 0; i < count; i++)
    {
        checkins.push(new Checkin({
            user: users[getRandomInt(0, users.length)]._id,
            picture: pictures[getRandomInt(0, pictures.length)]._id
        }));
    }
    return checkins;
};

var likeGenerator = count => {
    let likes = [];
    let half = count / 2;
    for (let i = 0; i < count / 2; i++)
    {
        likes.push(new Like({
            user: users[getRandomInt(0, users.length)]._id,
            picture: pictures[getRandomInt(0, pictures.length)]._id
        }));
    }
    for (let i = 0; i < count - half; i++)
    {
        likes.push(new Like({
            user: users[getRandomInt(0, users.length)]._id,
            quest: quests[getRandomInt(0, quests.length)]._id
        }));
    }
    return likes;
};

var users = generateUsers(5);
var quests = questGenerator(3);
var pictures = pictureGenerator(2);
var comments = commentGenerator(3);
var checkins = checkinGenerator(10);
var likes = likeGenerator(10);

var saveAll = entities => {
    return Promise.all(
        entities.map(entity => {
            return entity.save();
        })
    );
};

var registerUsers = users => {
    return Promise.all(
        users.map(user => {
            return new Promise((done) => {
                return User.register(user, 'qwerty',
                    function (err) {
                        if (err) {
                            console.log(err);
                        }
                        done();
                    }
                );
            });
        }
    ));
};


mongoose
    .connect(config.get('dbURL'))
    .then(() => {
        console.log('say something');
        mongoose.connection.db.dropDatabase()
    })
    .then(() => {
        console.log('say something 2');
        return registerUsers(users)
    })
    .then(() => saveAll(quests))
    .then(() => saveAll(pictures))
    .then(() => saveAll(comments))
    .then(() => saveAll(checkins))
    .then(() => saveAll(likes))
    .then(() => mongoose.connection.close(),
        (err) => {
            console.log(err.message);
            mongoose.connection.close();
        }
    );

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
}
