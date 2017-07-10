'use strict';

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
var Account = _models2.default.Account;
var Group = _models2.default.Group;
var Message = _models2.default.Messages;

var should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

// Test the POST: /api/user/signup route
describe('/POST User', function () {
  describe('Signup', function () {
    it('it should not POST signup details without password', function (done) {
      var signupDetails = {
        username: 'phemzy',
        email: 'phemzy@gmail.com'
      };
      _chai2.default.request(_app2.default).post('/api/user/signup').send(signupDetails).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('invalid');
        res.body.should.have.property('invalid').eql('Please fill in your details');
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
      _chai2.default.request(_app2.default).post('/api/user/signup').send(signupDetails).end(function (err, res) {
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
      _chai2.default.request(_app2.default).post('/api/user/signup').send(signupDetails).end(function (err, res) {
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
      _chai2.default.request(_app2.default).post('/api/user/signup').send(signupDetails).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('invalid');
        res.body.should.have.property('invalid').eql('Please fill in your details');
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
      _chai2.default.request(_app2.default).post('/api/user/signup').send(signupDetails).end(function (err, res) {
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
      _chai2.default.request(_app2.default).post('/api/user/signup').send(signupDetails).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('email');
        res.body.should.have.property('email').eql('Email is invalid');
        done();
      });
    });
  });
  // Test the POST: /api/group route
  describe('/POST Create Broadcast Group', function () {
    it('it should not allow users that are not logged in to create broadcast group', function (done) {
      var groupDetails = {
        groupname: 'sport gist'
      };
      _chai2.default.request(_app2.default).post('/api/group').send(groupDetails).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('confirmation').eql('fail');
        res.body.should.have.property('message').eql('Please sign in to create a group');
        done();
      });
    });
    it('it should not allow users that are not logged in to add new User to a group', function (done) {
      var addDetails = {
        username: 'phemzy',
        groupname: 'Random'
      };
      _chai2.default.request(_app2.default).post('/api/group/2/user').send(addDetails).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('confirmation').eql('fail');
        res.body.should.have.property('message').eql('Please log in to add a user to a group');
        done();
      });
    });
    it('it should not allow a user that is not logged in to POST messages to a group', function (done) {
      var msgDetails = {
        content: 'happy day',
        priority: 3,
        readcheck: true,
        groupId: 2
      };
      _chai2.default.request(_app2.default).post('/api/group/2/message').send(msgDetails).end(function (err, res) {
        res.body.should.be.a('object');
        res.body.should.have.property('confirmation').eql('fail');
        res.body.should.have.property('message').eql('Please log in to send a message');
        done();
      });
    });
    it('it should not allow user that is not logged in to GET all messages that have been posted to the group they belong to', function (done) {
      var message = new Message({ content: 'We da best', readcheck: true, priority: 2, groupId: 2 });
      message.save(function (err, message) {
        _chai2.default.request(_app2.default).get('/api/group/2/messages').send(message).end(function (err, res) {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('fail');
          res.body.should.have.property('message').eql('You are not logged in');
          done();
        });
      });
    });
  });
  describe('Signup', function () {
    it('it should POST signup details ', function (done) {
      var signupDetails = {
        email: 'hello9@gmail.com',
        username: 'hello9',
        password: 'douchee',
        passwordConfirmation: 'douchee'
      };
      _chai2.default.request(_app2.default).post('/api/user/signup').send(signupDetails).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('confirmation').eql('success');
        res.body.should.have.property('result');
        res.body.result.should.have.property('username');
        res.body.result.should.have.property('createdAt');
        done();
      });
    });
    it('it should allow logged in users to create broadcast group', function (done) {
      var groupDetails = {
        groupname: 'sport gist'
      };
      _chai2.default.request(_app2.default).post('/api/group').send(groupDetails).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('confirmation').eql('success');
        res.body.should.have.property('message');
        res.body.should.have.property('result');
        done();
      });
    });
  });
  describe('/POST User', function () {
    it('it should signin a user', function (done) {
      var account = new Account({
        username: 'hello9',
        password: 'douchee'
      });
      account.save(function (err, account) {
        _chai2.default.request(_app2.default).post('/api/user/signin').send(account).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('success');
          res.body.should.have.property('message');
          done();
        });
      });
    });
  });
});

describe('/POST Create Broadcast Group', function () {
  it('it should not allow logged in users to create broadcast group with an empty string as group name', function (done) {
    var groupDetails = {
      groupname: ' '
    };
    _chai2.default.request(_app2.default).post('/api/group').send(groupDetails).end(function (err, res) {
      res.should.have.status(422);
      res.body.should.be.a('object');
      res.body.should.have.property('username').eql('Please fill in your groupname');
      done();
    });
  });
});
describe('/POST Create Broadcast Group', function () {});

// Test the /POST api/group/:id/user
describe('/POST/:id Add User', function () {
  it('it should not allow users that are not logged in to add new User to a group', function (done) {
    var addDetails = {
      username: 'phemzy',
      groupname: 'Random'
    };
    _chai2.default.request(_app2.default).post('/api/group/2/user').send(addDetails).end(function (err, res) {
      res.should.have.status(401);
      res.body.should.be.a('object');
      res.body.should.have.property('confirmation').eql('fail');
      res.body.should.have.property('message').eql('Please log in to add a user to a group');
      done();
    });
  });
  it.skip('it should not allow logged in users to add new User to a group without providing username', function (done) {
    var addDetails = {
      groupname: 'Random'
    };
    _chai2.default.request(_app2.default).post('/api/group/2/user').send(addDetails).end(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('Cant add user to group');
      done();
    });
  });
  it.skip('it should allow logged in users to add new User to a group', function (done) {
    var addDetails = {
      username: 'phemzy',
      groupname: 'Random'
    };
    _chai2.default.request(_app2.default).post('/api/group/2/user').send(addDetails).end(function (err, res) {
      res.body.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('User added successfully');
      res.body.should.have.property('result');
      res.body.result.should.have.property('username');
      res.body.result.should.have.property('createdAt');
      done();
    });
  });
});
// Test the /POST api/group/:id/message
describe('/POST/:id Post Message', function () {
  it.skip('it should not allow a logged in user to POST messages to a group without content', function (done) {
    var msgDetails = {
      readcheck: true,
      priority: 3
    };
    _chai2.default.request(_app2.default).post('/api/group/2/message').send(msgDetails).end(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('confirmation').eql('fail');
      res.body.should.have.property('invalid').eql('Please fill the required parameters');
      done();
    });
  });

  it.skip('it should  POST messages to a group', function (done) {
    var msgDetails = {
      content: 'Manchester united is the best team in the world',
      readcheck: true,
      priority: 3
    };
    _chai2.default.request(_app2.default).post('/api/group/2/message').send(msgDetails).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('confirmation').eql('success');
      res.body.should.have.property('result');
      res.body.result.should.have.property('createdAt');
      done();
    });
  });
});

// Test the /GET: /api/group/:id/messages route
describe('/GET/:id Messages', function () {
  it('it should GET all messages that have been posted to the group they belong to', function (done) {
    var message = new Message({ content: 'We da best', readcheck: true, priority: 2, groupId: 2 });
    message.save(function (err, message) {
      _chai2.default.request(_app2.default).get('/api/group/2/messages').send(message).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
    });
  });
  after(function (done) {
    Account.sync({ force: true }).then(function () {
      done();
    });
  });
});