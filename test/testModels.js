'use strict';

const mongoose = require('mongoose');
const expect = require('chai').expect;
const config = require('config');
let User = require('./../models/user.js');
let Quest = require('./../models/quest.js');
let Picture = require('./../models/picture.js');
let Comment = require('./../models/comment.js');
let Like = require('./../models/like.js');
let Checkin = require('./../models/checkin.js');

describe('user', () => {
    it('should find added users', done => {
        let user1 = new User({
            email: 'test1@test.com',
            password: '12345',
            username: 'name1',
            level: 1
        });
        mongoose.connect(process.env.PROD_MONGODB || config.get('dbURL'), err => {
            user1.save()
            .then(() => {
                return User.findOne({ username: 'name1' }, (err, user) => {
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
            })
            .then(() => {
                mongoose.connection.close();
                done();
            })
        });
    });
});

describe('quest', () => {
    it('should find added quests and add relationship', done => {
        let user1 = new User({
            email: 'test1@test.com',
            password: '12345',
            username: 'name1',
            level: 1
        });
        mongoose.connect(process.env.PROD_MONGODB || config.get('dbURL'), err => {
            user1.save()
                .then(user => {
                    let quest1 = new Quest({
                        name: 'quest',
                        description: 'description',
                        user: user._id
                    });
                    return Promise.all([user, quest1.save()]);
                })
                .then(result => {
                    expect(result[1].name).to.equal('quest');
                    expect(result[1].user).to.equal(result[0]._id);
                    return result;
                })
                .then(result => {
                    return Promise.all([
                        result[0].remove(),
                        result[1].remove()
                    ]);
                })
                .then(() => {
                    mongoose.connection.close();
                    done();
                })
                .catch(err => {
                    console.log(err);
                    mongoose.connection.close();
                    done(err);
                });
        });
    });
});

describe('picture', () => {
    it('should find added pictures into quests and add relationship', done => {
        let user1 = new User({
            email: 'test1@test.com',
            password: '12345',
            username: 'name1',
            level: 1
        });
        let quest1 = new Quest({
            name: 'quest',
            description: 'description',
            user: user1._id
        });
        mongoose.connect(process.env.PROD_MONGODB || config.get('dbURL'), err => {
            user1.save()
                .then(() => {
                    return quest1.save();
                })
                .then(quest => {
                    let picture1 = new Picture({
                        name: 'picture',
                        location: 'location',
                        description: 'description',
                        url: 'url',
                        quest: quest1._id
                    });
                    return Promise.all([quest, picture1.save()]);
                })
                .then(result => {
                    expect(result[1].name).to.equal('picture');
                    expect(result[1].quest).to.equal(result[0]._id);
                    return result;
                })
                .then(result => {
                    user1.remove();
                    return Promise.all([
                        result[0].remove(),
                        result[1].remove()
                    ]);
                })
                .then(() => {
                    mongoose.connection.close();
                    done();
                })
                .catch(err => {
                    console.log(err);
                    mongoose.connection.close();
                    done(err);
                });
        });
    });
});

describe('comment', () => {
    it('should add relationship (quest, user <--> comment)', done => {
        let user1 = new User({
            email: 'test1@test.com',
            password: '12345',
            username: 'name1',
            level: 1
        });
        let quest1 = new Quest({
            name: 'quest',
            description: 'description',
            user: user1._id
        });
        mongoose.connect(process.env.PROD_MONGODB || config.get('dbURL'), err => {
            user1.save()
                .then(() => {
                    return quest1.save();
                })
                .then(quest => {
                    let comment1 = new Comment({
                        user: user1._id,
                        content: 'content',
                        quest: quest._id
                    });
                    return Promise.all([quest, comment1.save()]);
                })
                .then(result => {
                    expect(result[1].quest).to.equal(result[0]._id);
                    return result;
                })
                .then(result => {
                    user1.remove();
                    return Promise.all([
                        result[0].remove(),
                        result[1].remove()
                    ]);
                })
                .then(() => {
                    mongoose.connection.close();
                    done();
                })
                .catch(err => {
                    console.log(err);
                    mongoose.connection.close();
                    done(err);
                });
        });
    });
});

describe('like', () => {
    it('should add relationship (quest, user <--> like)', done => {
        let user1 = new User({
            email: 'test1@test.com',
            password: '12345',
            username: 'name1',
            level: 1
        });
        let quest1 = new Quest({
            name: 'quest',
            description: 'description',
            user: user1._id
        });
        mongoose.connect(process.env.PROD_MONGODB || config.get('dbURL'), err => {
            user1.save()
                .then(() => {
                    return quest1.save();
                })
                .then(quest => {
                    let like1 = new Like({
                        user: user1._id,
                        quest: quest._id
                    });
                    return Promise.all([quest, like1.save()]);
                })
                .then(result => {
                    expect(result[1].quest).to.equal(result[0]._id);
                    return result;
                })
                .then(result => {
                    return Promise.all([
                        user1.remove(),
                        result[0].remove(),
                        result[1].remove()
                    ]);
                })
                .then(() => {
                    mongoose.connection.close();
                    done();
                })
                .catch(err => {
                    console.log(err);
                    mongoose.connection.close();
                    done(err);
                });
        });
    });
});

describe('checkin', () => {
    it('should add relationship (picture, user <--> checkin)', done => {
        let user1 = new User({
            email: 'test1@test.com',
            password: '12345',
            username: 'name1',
            level: 1
        });
        let quest1 = new Quest({
            name: 'quest',
            description: 'description',
            user: user1._id
        });
        let picture1 = new Picture({
            name: 'name',
            location: 'location',
            description: 'description',
            url: 'url',
            quest: quest1._id
        });
        let checkin1 = new Checkin({
            user: user1._id,
            picture: picture1._id
        });
        mongoose.connect(process.env.PROD_MONGODB || config.get('dbURL'), err => {
            user1.save()
                .then(() => {
                    return quest1.save();
                })
                .then(() => {
                    return picture1.save();
                })
                .then(() => {
                    return Promise.all([user1, picture1, checkin1.save(), quest1]);
                })
                .then(result => {
                    expect(result[2].user).to.equal(result[0]._id);
                    expect(result[2].picture).to.equal(result[1]._id);
                    return result;
                })
                .then(result => {
                    return Promise.all([
                        result[0].remove(),
                        result[1].remove(),
                        result[2].remove(),
                        result[3].remove()
                    ]);
                })
                .then(() => {
                    mongoose.connection.close();
                    done();
                })
                .catch(err => {
                    console.log(err);
                    mongoose.connection.close();
                    done(err);
                });
        });
    });
});
