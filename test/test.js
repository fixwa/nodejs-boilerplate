User = require('../models/User');
chai = require('chai');

describe('Tests for User model.', function () {
    it('Validation should error when a User does not have a `email`.', function (done) {
        let u = new User();

        u.validate(function (err) {
            chai.expect(err.errors.email).to.exist;
            done();
        });
    });

    it('Validation should pass when a User does have a `email`.', function (done) {
        let u = new User({email: 'test@example.com'});

        u.validate(function (err) {
            chai.expect(err).to.be.null;
            done();
        });
    });
});