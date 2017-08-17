'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _mocha = require('mocha');

var _mocha2 = _interopRequireDefault(_mocha);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _models = require('../server/data/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_ENV = 'test';
var User = _models2.default.User;
var Group = _models2.default.Group;
var Message = _models2.default.Messages;

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
      var addDetails = {
        username: 'phemzy'
      };
      _chai2.default.request(_app2.default).post('/api/group/1/user').send(addDetails).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('Please signin/signup');
        done();
      });
    });
  });
  describe('Authentication', function () {
    it('it should not POST signup details without password', function (done) {
      var signupDetails = {
        username: 'phemzy',
        email: 'phemzy@gmail.com'
      };
      server.post('/api/user/signup').send(signupDetails).expect(422).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('password');
        res.body.should.have.property('password').eql('Please fill in your password');
        done();
      });
    });
  });
  describe('Signup', function () {
    it('it should not POST signup details if passwords do not match', function (done) {
      var signupDetails = {
        username: 'phemzy',
        email: 'phemzy@gmail.com',
        password: '123456',
        passwordConfirmation: 'abcdesa'
      };
      server.post('/api/user/signup').expect(422).send(signupDetails).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('passwordConfirmation');
        res.body.should.have.property('passwordConfirmation').eql('Passwords must match!!');
        done();
      });
    });
  });
  describe('Signup', function () {
    it('it should not POST signup details if password is less than 6 characters', function (done) {
      var signupDetails = {
        username: 'phemzy',
        email: 'phemzy@gmail.com',
        password: '1234',
        passwordConfirmation: '1234'
      };
      server.post('/api/user/signup').send(signupDetails).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('password');
        res.body.should.have.property('password').eql('Password length must not be less than 6 characters');
        done();
      });
    });
  });
  describe('Signup', function () {
    it('it should not POST signup details without username', function (done) {
      var signupDetails = {
        email: 'phemzy@gmail.com',
        password: '123456',
        passwordConfirmation: '123456'
      };
      server.post('/api/user/signup').send(signupDetails).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('username');
        res.body.should.have.property('username').eql('Please fill in your username');
        done();
      });
    });
    it('it should not allow users that are not logged in to create broadcast group', function (done) {
      var groupDetails = {
        groupname: 'sport gist'
      };
      server.post('/api/group').send(groupDetails).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('Please signin/signup');
        done();
      });
    });
  });
  describe('Signup', function () {
    it('it should not POST signup details with a null or empty string username', function (done) {
      var signupDetails = {
        username: ' ',
        email: 'phemzy@gmail.com',
        password: '123456',
        passwordConfirmation: '123456'
      };
      server.post('/api/user/signup').send(signupDetails).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('username');
        res.body.should.have.property('username').eql('Please fill in your username');
        done();
      });
    });
  });
  describe('Signup', function () {
    it('it should not POST signup details with an invalid email address', function (done) {
      var signupDetails = {
        username: 'phemzy',
        email: 'phemzy@gmail',
        password: '123456',
        passwordConfirmation: '123456'
      };
      server.post('/api/user/signup').send(signupDetails).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('email');
        res.body.should.have.property('email').eql('Email is invalid');
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
      var addDetails = {
        username: 'femo'
      };
      server.post('/api/group/1/user').send(addDetails).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.should.have.property('error').eql('Please signin/signup');
        done();
      });
    });
    it('it should not allow a user that is not logged in to POST messages to a group', function (done) {
      var msgDetails = {
        content: 'happy day',
        priority: 2,
        readcheck: true
      };
      server.post('/api/group/1/message').send(msgDetails).end(function (err, res) {
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('Please signin/signup');
        done();
      });
    });
  });
  describe('Authentication', function () {
    it('it should POST signup details ', function (done) {
      var signupDetails = {
        email: 'phemz1@gmail.com',
        username: 'phemz1',
        password: 'douchee',
        passwordConfirmation: 'douchee'
      };
      server.post('/api/user/signup').send(signupDetails).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('confirmation').eql('success');
        done();
      });
    });
    it('it should POST signup details ', function (done) {
      var signupDetails = {
        email: 'hello000@gmail.com',
        username: 'hello000',
        password: 'douchee',
        passwordConfirmation: 'douchee'
      };
      server.post('/api/user/signup').send(signupDetails).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('confirmation').eql('success');
        done();
      });
    });
    it('it should signin a user', function (done) {
      var account = {
        username: 'hello000',
        password: 'douchee'
      };
      server.post('/api/user/signin').set('Connection', 'keep alive').set('Content-Type', 'application/json').type('form').send(account).end(function (err, res) {
        token = res.body.token;
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('confirmation').eql('success');
        res.body.should.have.property('message');
        done();
      });
    });
    it('it should not allow logged in users to create broadcast group with an empty string as group name', function (done) {
      var groupDetails = {
        groupname: ' '
      };
      server.post('/api/group').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).type('form').send(groupDetails).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('username').eql('Please fill in your groupname');
        done();
      });
    });

    it('it should allow logged in users to create broadcast group', function (done) {
      var groupDetails = {
        groupname: 'june fellows'
      };
      server.post('/api/group').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).type('form').send(groupDetails).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('confirmation').eql('success');
        res.body.should.have.property('message');
        done();
      });
    });
    it('it should not allow logged in users to add a user that already belongs to a group', function (done) {
      var addDetails = {
        username: 'phemz1'
      };
      server.post('/api/group/1/user').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).type('form').send(addDetails).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('User already exists');
        res.body.should.have.property('confirmation').eql('fail');
        done();
      });
    });
    it('it should not allow logged in users to add new User to a group without providing username', function (done) {
      var addDetails = {
        username: ''
      };
      server.post('/api/group/1/user').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).send(addDetails).end(function (err, res) {
        res.body.should.be.a('object');
        done();
      });
    });
  });
  // Test the /POST api/group/:id/message
  describe('/POST/:id Post Message', function () {
    it('it should not allow a logged in user to POST messages to a group without content', function (done) {
      var msgDetails = {
        readcheck: true,
        priority: 3
      };
      server.post('/api/group/2/message').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).send(msgDetails).end(function (err, res) {
        res.body.should.be.a('object');
        res.body.should.have.property('invalid');
        done();
      });
    });

    it('it should  POST messages to a group', function (done) {
      var msgDetails = {
        content: 'Manchester united is the best team in the world',
        readcheck: true,
        priority: 1
      };
      server.post('/api/group/1/message').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).send(msgDetails).end(function (err, res) {
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
      server.get('/api/group/1/messages').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
    });
    it('it should not allow user to post message to group that does not exist', function (done) {
      server.get('/api/group/3/messages').set('Connection', 'keep alive').set('Content-Type', 'application/json').set('authorization', 'Bearer ' + token).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('confirmation').eql('fail');
        res.body.should.have.property('message').eql('Group does not exist');
        done();
      });
    });
  });
});