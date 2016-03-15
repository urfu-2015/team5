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
                description: faker.lorem.sentence(),
                user: users[getRandomInt(0, users.length)]._id
            })
        );
    }
    return quests;
};

var pictureGenerator = count => {
    let pictures = [];
    for (let i = 0; i < count; i++)
    {
        pictures.push(
            new Picture({
                name: faker.lorem.words(),
                location: faker.address.streetName(),
                description: faker.lorem.sentence(),
                url: faker.image.imageUrl(),
                quest: quests[getRandomInt(0, quests.length)]._id
            })
        );
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

var generatePromises = entities => {
    return entities.map(entity => {
        return entity.save();
    });
};

var users = generateUsers(10);
var quests = questGenerator(2);
var pictures = pictureGenerator(15);
var comments = commentGenerator(3);
var checkins = checkinGenerator(2);
var likes = likeGenerator(10);

mongoose.connect(config.get('dbURL'))
.catch((error) => {
    console.log(error);
    mongoose.connection.close();
})
.then(() => {
    return Promise.all([
        Quest.remove({}),
        Picture.remove({}),
        Comment.remove({}),
        User.remove({}),
        Checkin.remove({}),
        Like.remove({})
    ]);
})
.then(() => {
    return Promise.all(generatePromises(users))
})
.then(() => {
    return Promise.all(generatePromises(quests));
})
.then(() => {
    return Promise.all(generatePromises(pictures));
})
.then(() => {
    return Promise.all(generatePromises(comments));
})
.then(() => {
    return Promise.all(generatePromises(checkins));
})
.then(() => {
    return Promise.all(generatePromises(likes));
})
.then(
    () => {
        console.log('DONE');
        mongoose.connection.close()
        .done();
    },
    (reason) => {
        console.log(reason);
        mongoose.connection.close()
        .done()
    }
);

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
}
