'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app.js');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import the model
var Account = require('../server/data/models').Account; // process.env.NODE_ENV = 'test';
// Import the dev-dependencies

var Group = require('../server/data/models').Group;
var Message = require('../server/data/models').Message;

// Import the model


var should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

// Test the POST: /api/user/signup route
describe('/POST User', function () {
  before(function (done) {
    Account.sync({ force: false }).then(function () {
      done();
    });
  });

  it('it should not POST signup details without email', function (done) {
    var signupDetails = {
      username: 'phemzy',
      password: 'phemzy'
    };
    _chai2.default.request(_app2.default).post('/api/user/signup').send(signupDetails).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('errors');
      done();
    });
  });

  it('it should POST signup details ', function (done) {
    var signupDetails = {
      username: "douch",
      email: "douch@gmail.com",
      password: "douchee"
    };
    _chai2.default.request(_app2.default).post('/api/user/signup').send(signupDetails).end(function (err, res) {
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('id');
      res.body.should.have.property('username').eql('douch');
      res.body.should.have.property('email').eql('douch@gmail.com');
      res.body.should.have.property('createdAt');
      done();
    });
  });
});

// Test the POST: /api/user/signin route
describe('/POST User', function () {

  it.skip('it should signin a user', function (done) {
    var account = new Account({
      username: "phemz",
      email: "phemz@gmail.com",
      password: "phemzy"
    });
    account.save(function (err, account) {
      _chai2.default.request(_app2.default).get('/api/user/signin').send(account).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('username');
        done();
      });
    });
  });
});

// Test the POST: /api/group route
describe('/POST Create Broadcast Group', function () {

  it('it should not allow users create broadcast groups without providing groupname', function (done) {
    var groupDetails = {};
    _chai2.default.request(_app2.default).post('/api/group').send(groupDetails).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('errors');
      done();
    });
  });

  it('it should allow users create broadcast groups by providing groupname', function (done) {
    var groupDetails = {
      groupname: "sport gist"
    };
    _chai2.default.request(_app2.default).post('/api/group').send(groupDetails).end(function (err, res) {
      console.log(res);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('id');
      res.body.should.have.property('groupname').eql('sport gist');
      res.body.should.have.property('createdAt');
      done();
    });
  });
});

// Test the /POST api/group/:id/user
describe('/POST/:id Add User', function () {
  it('it should Add(POST) users to a group by the given group id', function (done) {
    var addDetails = {
      username: "phemzy",
      groupId: "2"
    };
    _chai2.default.request(_app2.default).post('/api/group/' + addDetails.groupId + '/user').send(addDetails).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('id');
      res.body.should.have.property('username').eql('phemzy');
      res.body.should.have.property('createdAt');
      done();
    });
  });
});

// Test the /POST api/group/:id/message
describe('/POST/:id Post Message', function () {

  it('it should not POST messages to a group without a message', function (done) {
    var msgDetails = {};
    _chai2.default.request(_app2.default).post('/api/group/' + msgDetails.groupId + '/message').send(msgDetails).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('errors');
      done();
    });
  });

  it('it should  POST messages to a group', function (done) {
    var msgDetails = {
      content: "Manchester united is the best team in the world",
      readcheck: true,
      priority: 3,
      groupId: "2"
    };

    _chai2.default.request(_app2.default).post('/api/group/' + msgDetails.groupId + '/message').send(msgDetails).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('id');
      res.body.should.have.property('content').eql("Manchester united is the best team in the world");
      res.body.should.have.property('createdAt');
      done();
    });
  });
});

// Test the /GET: /api/group/:id/messages route
describe('/GET/:id Messages', function () {
  it('it should GET all messages that have been posted to the group he/she belongs', function () {
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