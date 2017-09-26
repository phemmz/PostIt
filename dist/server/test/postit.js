'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _models = require('../data/models');

var _models2 = _interopRequireDefault(_models);

var _dummyData = require('./__mockData__/dummyData');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_ENV = 'test';
var User = _models2.default.User;
var Group = _models2.default.Group;
var Message = _models2.default.Message;
var View = _models2.default.View;

var should = _chai2.default.should();
var server = _supertest2.default.agent(_app2.default);

_chai2.default.use(_chaiHttp2.default);
var token = '';

// Test the POST: /api/user/signup route
describe('POSTIT', function () {
  before(function (done) {
    User.sync({ force: true }).then(function () {
      done();
    });
  });
  // Test the /POST api/group/:id/user
  describe('/POST/:id Add User', function () {
    it('it should not allow users that are not logged in to add new User to a group', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/group/1/user').send(_dummyData.addDetails).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('Please signin/signup');
        done();
      });
    });
  });
  describe('Signup', function () {
    it('it should not POST signup details without password', function (done) {
      var signupDetails = {
        username: _dummyData.userDetails[0].username,
        email: _dummyData.userDetails[0].email
      };
      server.post('/api/v1/user/signup').send(signupDetails).expect(422).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('password').eql('Please fill in your password');
        done();
      });
    });
    it('it should not POST signup details if passwords do not match', function (done) {
      server.post('/api/v1/user/signup').expect(422).send(_extends({}, _dummyData.userDetails[0], { passwordConfirmation: 'abcdesa' })).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('passwordConfirmation').eql('Passwords must match!!');
        done();
      });
    });
    it('it should not POST signup details if password is less than 6 characters', function (done) {
      server.post('/api/v1/user/signup').send(_extends({}, _dummyData.userDetails[0], { password: '1234', passwordConfirmation: '1234' })).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('password').eql('Password length must not be less than 6 characters');
        done();
      });
    });
    it('it should not POST signup details without username', function (done) {
      server.post('/api/v1/user/signup').send(_extends({}, _dummyData.userDetails[0], { username: '' })).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('username').eql('Please fill in your username');
        done();
      });
    });
    it('it should not allow users that are not logged in to create broadcast group', function (done) {
      server.post('/api/v1/group').send(_extends({}, _dummyData.groupDetails[0])).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('Please signin/signup');
        done();
      });
    });
    it('it should not POST signup details with a null or empty string username', function (done) {
      server.post('/api/v1/user/signup').send(_extends({}, _dummyData.userDetails[0], { username: ' ' })).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('username').eql('Please fill in your username');
        done();
      });
    });
    it('it should not POST signup details with an invalid email address', function (done) {
      server.post('/api/v1/user/signup').send(_extends({}, _dummyData.userDetails[0], { email: 'phemzy@gmail' })).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('email').eql('Email is invalid');
        done();
      });
    });
    it('it should not POST signup details without phoneNumber', function (done) {
      server.post('/api/v1/user/signup').send(_extends({}, _dummyData.userDetails[0], { phoneNumber: '' })).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('phoneNumber').eql('Please fill in your phone number');
        done();
      });
    });
  });
});
// Test the POST: /api/group route
describe('Group', function () {
  before(function (done) {
    Group.sync({ force: true }).then(function () {
      done();
    });
  });
  describe('Create Broadcast Group', function () {
    it('it should not allow user that is not logged in to add new User to a group', function (done) {
      server.post('/api/v1/group/1/user').send(_extends({}, _dummyData.addDetails)).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.should.have.property('error').eql('Please signin/signup');
        done();
      });
    });
    it('it should not allow a user that is not logged in to POST messages to a group', function (done) {
      // eslint-disable-line
      server.post('/api/v1/group/1/message').send(_extends({}, _dummyData.msgDetails)).end(function (err, res) {
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('Please signin/signup');
        done();
      });
    });
  });
  describe('Authentication', function () {
    it('it should POST signup details ', function (done) {
      server.post('/api/v1/user/signup').send(_dummyData.userDetails[1]).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('confirmation').eql('success');
        done();
      });
    });
    it('it should POST signup details ', function (done) {
      server.post('/api/v1/user/signup').send(_dummyData.userDetails[2]).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('confirmation').eql('success');
        done();
      });
    });
    it('it should signin a user', function (done) {
      server.post('/api/v1/user/signin').set('Connection', 'keep alive').set('Content-Type', 'application/json').type('form').send(_dummyData.userDetails[2]).end(function (err, res) {
        token = res.body.token;
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('confirmation').eql('success');
        res.body.should.have.property('message');
        done();
      });
    });
    it('it should not allow logged in users to create broadcast group with an empty string as group name', function (done) {
      // eslint-disable-line
      server.post('/api/v1/group').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).type('form').send(_extends({}, _dummyData.groupDetails[0], { groupname: ' ' })).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('username').eql('Please fill in your groupname');
        done();
      });
    });
    it('it should allow logged in users to create broadcast group', function (done) {
      server.post('/api/v1/group').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).type('form').send(_extends({}, _dummyData.groupDetails[1])).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('confirmation').eql('success');
        res.body.should.have.property('message');
        done();
      });
    });
    it('it should allow logged in users to get all broadcast groups he belongs to', function (done) {
      server.get('/api/v1/group').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('results');
        done();
      });
    });
    it('it should not allow logged in users to add a user that already belongs to a group', function (done) {
      // eslint-disable-line
      server.post('/api/v1/group/1/user').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).type('form').send(_dummyData.userDetails[2]).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('User already exists');
        res.body.should.have.property('confirmation').eql('fail');
        done();
      });
    });
    it('it should not allow logged in users to add new User to a group without providing username', function (done) {
      // eslint-disable-line
      server.post('/api/v1/group/1/user').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).send(_extends({}, _dummyData.userDetails[0], { username: '' })).end(function (err, res) {
        res.body.should.be.a('object');
        done();
      });
    });
    it('it should not allow logged in users to add User that does not exist', function (done) {
      server.post('/api/v1/group/1/user').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).send(_extends({}, _dummyData.userDetails[0], { username: 'phemz4' })).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('confirmation').eql('fail');
        res.body.should.have.property('message').eql('User does not exist');
        done();
      });
    });
  });
  // Test the /POST api/group/:id/message
  describe('/POST/:id Post Message', function () {
    before(function (done) {
      Message.sync({ force: true }).then(function () {
        done();
      });
    });
    it('it should not allow a logged in user to POST messages to a group without content', function (done) {
      // eslint-disable-line
      server.post('/api/v1/group/2/message').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).send(_extends({}, _dummyData.msgDetails, { content: '' })).end(function (err, res) {
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('invalid');
        done();
      });
    });

    it('it should  POST messages to a group', function (done) {
      server.post('/api/v1/group/1/message').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).send(_dummyData.msgDetails).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('confirmation').eql('success');
        res.body.should.have.property('message').eql('Message sent');
        done();
      });
    });
  });
  // Test the /GET: /api/group/:id/messages route
  describe('/GET/:id Messages', function () {
    it('it should GET all messages that have been posted to the group they belong to', function (done) {
      server.get('/api/v1/group/1/messages').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
    });
    it('it should not allow user to post message to group that does not exist', function (done) {
      server.get('/api/v1/group/3/messages').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('confirmation').eql('fail');
        res.body.should.have.property('message').eql('Group does not exist');
        done();
      });
    });
  });
  describe('/POST Password reset', function () {
    it('it should not send verification email to an unregistered user', function (done) {
      server.post('/api/v1/reset').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).send(_extends({}, _dummyData.userDetails[0], { username: 'boy2' })).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('confirmation').eql('fail');
        res.body.should.have.property('message').eql('User not found');
        done();
      });
    });
    it('it should not send verification email if no username is provided', function (done) {
      server.post('/api/v1/reset').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).send(_extends({}, _dummyData.userDetails, { username: '' })).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        done();
      });
    });
    it('it should send verification email to a registered user', function (done) {
      server.post('/api/v1/reset').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).send(_dummyData.userDetails[1]).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('confirmation').eql('success');
        res.body.should.have.property('message').eql('You will receive an email with instructions on how to reset your password in a few minutes.'); // eslint-disable-line
        done();
      });
    });
    it('it should not update password of a user that is not registered', function (done) {
      server.put('/api/v1/user/signup').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).send(_extends({}, _dummyData.userDetails[0], { username: 'phemmz21' })).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('confirmation').eql('fail');
        res.body.should.have.property('message').eql('User not found');
        done();
      });
    });
    it('it should not update password if no password is entered', function (done) {
      server.put('/api/v1/user/signup').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).send(_extends({}, _dummyData.userDetails[0], { password: '' })).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('password').eql('Please fill in your password');
        done();
      });
    });
    it('it should not update password if no passwordConfirmation is entered', function (done) {
      server.put('/api/v1/user/signup').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).send(_extends({}, _dummyData.userDetails[0], { passwordConfirmation: '' })).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('passwordConfirmation').eql('Please fill in your password');
        done();
      });
    });
    it('it should not update password if password and passwordConfirmation do not match', function (done) {
      // eslint-disable-line
      server.put('/api/v1/user/signup').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).send(_extends({}, _dummyData.userDetails[0], { passwordConfirmation: '12345678' })).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('passwordConfirmation').eql('Passwords must match!!');
        done();
      });
    });
    it('it should update password of a registered user', function (done) {
      server.put('/api/v1/user/signup').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).send(_extends({}, _dummyData.userDetails[1])).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('confirmation').eql('success');
        res.body.should.have.property('message').eql('Password updated successfully');
        done();
      });
    });
  });
  describe('/POST Google+ authentication', function () {
    it('it should signup a new user using google details', function (done) {
      server.post('/api/v1/auth/google').set('Connection', 'keep alive').set('Content-Type', 'application/json').send(_extends({}, _dummyData.userDetails[3])).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('confirmation').eql('success');
        res.body.should.have.property('message').eql('phemmz8 successfully created');
        done();
      });
    });
    it('it should signin an existing user using google details', function (done) {
      server.post('/api/v1/auth/google').set('Connection', 'keep alive').set('Content-Type', 'application/json').send(_extends({}, _dummyData.userDetails[2])).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('confirmation').eql('success');
        res.body.should.have.property('message').eql('hello000 logged in');
        done();
      });
    });
  });
  describe('Read Status', function () {
    before(function (done) {
      View.sync({ force: true }).then(function () {
        done();
      });
    });
    it('it should add user has part of those who have read a message', function (done) {
      server.post('/api/v1/group/1/readStatus').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('confirmation').eql('success');
        done();
      });
    });
    it('it should get users that have read a message', function (done) {
      server.get('/api/v1/group/1/readStatus').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('confirmation').eql('success');
        res.body.should.have.property('uniqueList');
        done();
      });
    });
    it('it should throw an error if an invalid groupId is passed', function (done) {
      server.get('/api/v1/group/1a/readStatus').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.have.property('message').eql('Invalid groupId supplied');
        done();
      });
    });
  });
  describe('Search Users', function () {
    it('it should search for users based on the search key passed', function (done) {
      server.get('/api/v1/search/h/0/5').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('confirmation').eql('success');
        res.body.should.have.property('metaData');
        res.body.should.have.property('searchedUsers');
        done();
      });
    });
  });
  describe('Group Members', function () {
    it('it should not get members of a group if user is not authenticated', function (done) {
      server.get('/api/v1/members/1/0/5').set('Connection', 'keep alive').set('Content-Type', 'application/json').end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('Please signin/signup');
        done();
      });
    });
    it('it should get all the members of a group', function (done) {
      server.get('/api/v1/members/1/0/5').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('confirmation').eql('success');
        res.body.should.have.property('members');
        res.body.should.have.property('metaData');
        res.body.should.have.property('paginatedMembers');
        done();
      });
    });
    it('it should not get members of a group if string is passed as groupId', function (done) {
      server.get('/api/v1/members/asjansj/0/5').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.have.property('message').eql('Invalid groupId supplied');
        done();
      });
    });
  });
});