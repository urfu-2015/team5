'use strict';

const mongoose = require('mongoose');
const expect = require('chai').expect;
const config = require('config');
const User = require('./../models/user.js');
const Quest = require('./../models/quest.js');
const Picture = require('./../models/picture.js');
const Comment = require('./../models/comment.js');
const Like = require('./../models/like.js');
const Checkin = require('./../models/checkin.js');
let connect;

describe('models', () => {
    beforeEach(done => {
        connect = mongoose.connection;
        connect.readyState != 1 ? mongoose
            .connect(config.get('dbURL')) : '';
        return done();
    });

    afterEach(done => {
        connect.close();
        done();
    });

    it('should find added users', () => {
        let user1 = createUser();
        return user1
            .save()
            .then(() => {
                return User.findOne({ username: 'user' }, (err, user) => {
                    return user;
                });
            })
            .then(user => {
                expect(user.email).to.equal('test1@test.com');
                expect(user.password).to.equal('12345');
                expect(user.level).to.equal(1);
                return user;
            })
            .then(user => {
                return user.remove();
            });
    });

    it('should add relationship (user <--> quest)', () => {
        let user1 = createUser();
        let quest1 = createQuest(user1);
        return user1
            .save()
            .then(() => {
                return quest1.save();
            })
            .then(() => {
                return User.findOne({ username: 'user' }, (err, user) => user);
            })
            .then(user => {
                return Promise.all([
                    user,
                    Quest.findOne({ name: 'quest' }, (err, quest) => quest)
                ]);
            })
            .then(result => {
                expect(result[1].user).to.deep.equal(result[0]._id);
                expect(result[0].quests[0]).to.deep.equal(result[1]._id);
                return result;
            })
            .then(result => {
                return Promise.all([
                    result[0].remove(),
                    result[1].remove()
                ]);
            });
    });

    it('should add relationship (quest <--> picture)', () => {
        let user1 = createUser();
        return user1
            .save()
            .then(() => {
                return createQuest(user1).save();
            })
            .then(quest => {
                return createPicture(quest).save();
            })
            .then(() => {
                return Promise.all([
                    Quest.findOne({ name: 'quest' }, (err, quest) => quest),
                    Picture.findOne({ name: 'picture' }, (err, picture) => picture)
                ]);
            })
            .then(result => {
                expect(result[1].quest).to.deep.equal(result[0]._id);
                expect(result[0].pictures[0]).to.deep.equal(result[1]._id);
                return result;
            })
            .then(result => {
                return Promise.all([
                    result[0].remove(),
                    result[1].remove(),
                    user1.remove()
                ]);
            });
    });

    it('should add relationship (quest, user <--> comment)', () => {
        let user1 = createUser();
        return user1
            .save()
            .then(() => {
                return createQuest(user1).save();
            })
            .then(quest => {
                return createComment(user1, quest).save();
            })
            .then(comment => {
                return Promise.all([
                    User.findOne({ username: 'user' }, (err, user) => user),
                    Quest.findOne({ name: 'quest' }, (err, quest) => quest),
                    Comment.findOne({ content: 'content' }, (err, comment) => comment)
                ]);
            })
            .then(result => {
                expect(result[2].quest).to.deep.equal(result[1]._id);
                expect(result[2].user).to.deep.equal(result[0]._id);
                expect(result[0].comments[0]).to.deep.equal(result[2]._id);
                expect(result[1].comments[0]).to.deep.equal(result[2]._id);
                return result;
            })
            .then(result => {
                return Promise.all([
                    result[0].remove(),
                    result[1].remove(),
                    result[2].remove()
                ]);
            });
    });

    it('should add relationship (quest, user <--> like)', () => {
        let user1 = createUser();
        return user1
            .save()
            .then(() => {
                return createQuest(user1).save();
            })
            .then(quest => {
                return createLike(user1, quest).save();
            })
            .then(() => {
                return Quest.findOne({ name: 'quest' }, (err, quest) => quest);
            })
            .then(quest => {
                return Promise.all([
                    User.findOne({ username: 'user' }, (err, user) => user),
                    quest
                ]);
            })
            .then(result => {
                return Promise.all([
                    result[0],
                    result[1],
                    Like.findOne({ quest: result[1]._id }, (err, like) => like)
                ]);
            })
            .then(result => {
                expect(result[2].quest).to.deep.equal(result[1]._id);
                expect(result[2].user).to.deep.equal(result[0]._id);
                expect(result[0].likes[0]).to.deep.equal(result[2]._id);
                expect(result[1].likes[0]).to.deep.equal(result[2]._id);
                return result;
            })
            .then(result => {
                return Promise.all([
                    result[0].remove(),
                    result[1].remove(),
                    result[2].remove()
                ]);
            });
    });

    it('should add relationship (picture, user <--> checkin)', () => {
        let user1 = createUser();
        return user1
            .save()
            .then(() => {
                return createQuest(user1).save();
            })
            .then(quest => {
                return createPicture(quest).save();
            })
            .then(picture => {
                return createCheckin(user1, picture).save();
            })
            .then(() => {
                return User.findOne({ username: user1.username }, (err, user) => user);
            })
            .then(user => {
                return Promise.all([
                    user,
                    Picture.findOne({ name: 'picture' }, (err, picture) => picture)
                ]);
            })
            .then(result => {
                return Promise.all([
                    result[0],
                    result[1],
                    Checkin.findOne({ user: result[0]._id }, (err, checkin) => checkin)
                ]);
            })
            .then(result => {
                expect(result[2].picture).to.deep.equal(result[1]._id);
                expect(result[2].user).to.deep.equal(result[0]._id);
                expect(result[0].checkins[0]).to.deep.equal(result[2]._id);
                expect(result[1].checkins[0]).to.deep.equal(result[2]._id);
                return result;
            })
            .then(result => {
                return Promise.all([
                    result[0],
                    result[1],
                    result[2],
                    Quest.findOne({ name: 'quest' }, (err, quest) => quest)
                ]);
            })
            .then(result => {
                return Promise.all([
                    result[0].remove(),
                    result[1].remove(),
                    result[2].remove(),
                    result[3].remove()
                ]);
            });
    });
});

function createUser() {
    return new User({
        email: 'test1@test.com',
        password: '12345',
        username: 'user',
        level: 1
    });
}

function createQuest(user) {
    return new Quest({
        name: 'quest',
        description: 'description',
        user: user._id
    });
}

function createPicture(quest) {
    return new Picture({
        name: 'picture',
        location: 'location',
        description: 'description',
        url: 'url',
        quest: quest._id
    });
}

function createComment(user, quest) {
    return new Comment({
        user: user._id,
        content: 'content',
        quest: quest._id
    });
}

function createLike(user, quest) {
    return new Like({
        user: user._id,
        quest: quest._id
    });
}

function createCheckin(user, picture) {
    return new Checkin({
        user: user._id,
        picture: picture._id
    });
}
