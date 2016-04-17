var expect = require('chai').expect;
var request = require('supertest');

describe('Auth', function () {
    it('should pass only if environment is testing', function () {
        expect(process.env.NODE_ENV).to.be.equal('testing');
    });
});