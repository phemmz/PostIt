'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_ENV = 'test';

// Import the model
var Account = require('../server/data/models').Account;
var Group = require('../server/data/models').Group;
<<<<<<< HEAD
var Message = require('../server/data/models').Message;
=======
var Message = require('../server/data/models').Messages;
>>>>>>> develop

var should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

// Test the POST: /api/user/signup route
describe('/POST User', function () {
  before(function (done) {
    Account.sync({ force: true }).then(function () {
      done();
    });
  });

<<<<<<< HEAD
  it.skip('it should not POST signup details without email', function (done) {
=======
  it('it should not POST signup details without password', function (done) {
>>>>>>> develop
    var signupDetails = {
      username: 'phemzy',
      password: 'phemzy'
    };
    _chai2.default.request(_app2.default).post('/api/user/signup').send(signupDetails).end(function (err, res) {
      res.body.should.be.a('object');
      done();
    });
  });

  it.skip('it should POST signup details ', function (done) {
    var signupDetails = {
      username: 'douch2',
      email: 'douch2@gmail.com',
      password: 'douchee'
    };
    _chai2.default.request(_app2.default).post('/api/user/signup').send(signupDetails).end(function (err, res) {
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('id');
      res.body.should.have.property('username').eql('douch2');
      res.body.should.have.property('email').eql('douch2@gmail.com');
      res.body.should.have.property('createdAt');
      done();
    });
  });
});

// Test the POST: /api/user/signin route
describe('/POST User', function () {
  it.skip('it should signin a user', function (done) {
    var account = new Account({
      username: 'phemz',
<<<<<<< HEAD
=======
      email: 'phemz@gmail.com',
>>>>>>> develop
      password: 'phemzy'
    });
    account.save(function (err, accountIn) {
      _chai2.default.request(_app2.default).post('/api/user/signin').send(accountIn).end(function (err, res) {
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
    });
  });
});

// Test the POST: /api/group route
describe('/POST Create Broadcast Group', function () {
  it.skip('it should allow users create broadcast groups by providing groupname', function (done) {
    var groupDetails = {
      groupname: 'sport gist'
    };
    _chai2.default.request(_app2.default).post('/api/group').send(groupDetails).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('confirmation').eql('success');
      done();
    });
  });
});

// Test the /POST api/group/:id/user
describe('/POST/:id Add User', function () {
  it('it should Add(POST) users to a group by the given group id', function (done) {
    var addDetails = {
      username: 'phemzy',
<<<<<<< HEAD
      groupId: '1'
=======
      groupId: '2'
>>>>>>> develop
    };
    _chai2.default.request(_app2.default).post('/api/group/' + addDetails.groupId + '/user').send(addDetails).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('User added successfully');
      done();
    });
  });
});

// Test the /POST api/group/:id/message
describe('/POST/:id Post Message', function () {
<<<<<<< HEAD

  it.skip('it should not POST messages to a group without a message', function (done) {
=======
  it('it should not POST messages to a group without a message', function (done) {
>>>>>>> develop
    var msgDetails = {
      groupId: 2,
      priority: 3,
      readcheck: true
    };
    _chai2.default.request(_app2.default).post('/api/group/' + msgDetails.groupId + '/messages').send(msgDetails).end(function (err, res) {
      res.body.should.be.a('object');
      done();
    });
  });

  it.skip('it should  POST messages to a group', function (done) {
    var msgDetails = {
      content: 'Manchester united is the best team in the world',
      readcheck: true,
      priority: 3,
      groupId: '2'
    };
    _chai2.default.request(_app2.default).post('/api/group/' + msgDetails.groupId + '/message').send(msgDetails).end(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('confirmation').eql('success');
      res.body.should.have.property('result');
      done();
    });
  });
});

// Test the /GET: /api/group/:id/messages route
describe('/GET/:id Messages', function () {
  it.skip('it should GET all messages that have been posted to the group he/she belongs', function () {
    var message = new Message({ content: 'We da best', readcheck: true, priority: 2, groupId: 2 });
    message.save(function (err, message) {
      _chai2.default.request(_app2.default).get('/api/group/' + message.groupId + 'messages').send(message).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('content');
        res.body.should.have.property('id');
        res.body.should.have.property('createdAt');
        res.body.should.have.property('updatedAt');
        res.body.should.have.property('groupId').eql('message.groupId');
        done();
      });
    });
  });
});