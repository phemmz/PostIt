'use strict';

var _message = require('../server/data/models/message.js');

var _message2 = _interopRequireDefault(_message);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app.js');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_ENV = 'test';
//Import the model


//Import the dev-dependencies


var should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

//Test the POST: /api/user/signup route
describe('/POST User', function () {
	it('it should not POST signup details without email', function (done) {
		var signupDetails = {
			username: "phemzy",
			password: "phemzy"
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
			username: "phemzy",
			email: "phemzy@gmail.com",
			password: "phemzy"
		};
		_chai2.default.request(_app2.default).post('/api/user/signup').send(signupDetails).end(function (err, res) {
			res.should.have.status(201);
			res.body.should.be.a('object');
			res.body.should.have.property('id');
			res.body.should.have.property('username').eql('phemzy');
			res.body.should.have.property('email').eql('phemzy@gmail.com');
			res.body.should.have.property('password').eql('phemzy');
			res.body.should.have.property('createdAt');
			done();
		});
	});
});

//Test the POST: /api/user/signin route
describe('/POST User', function () {
	it('it should not POST signin details without username', function (done) {
		var signupDetails = {
			password: "phemzy"
		};
		_chai2.default.request(_app2.default).post('/api/user/signin').send(signupDetails).end(function (err, res) {
			res.should.have.status(400);
			res.body.should.be.a('object');
			res.body.should.have.property('errors');
			done();
		});
	});
});

//Test the POST: /api/group route
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
			res.should.have.status(201);
			res.body.should.be.a('object');
			res.body.should.have.property('id');
			res.body.should.have.property('groupname').eql('sport gist');
			res.body.should.have.property('createdAt');
			done();
		});
	});
});

//Test the /POST api/group/:id/user
describe('/POST/:id Add User', function () {
	it('it should Add(POST) users to a group by the given group id', function (done) {
		var addDetails = {
			username: "phemzy",
			groupId: "2"
		};
		_chai2.default.request(_app2.default).post('/api/group/' + addDetails.groupId + '/user').send(addDetails).end(function (err, res) {
			res.should.have.status(201);
			res.body.should.be.a('object');
			res.body.should.have.property('id');
			res.body.should.have.property('username').eql('phemzy');
			res.body.should.have.property('createdAt');
			done();
		});
	});
});
//Test the /POST api/group/:id/message
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
			groupId: "2"
		};
		_chai2.default.request(_app2.default).post('/api/group/' + msgDetails.groupId + '/message').send(msgDetails).end(function (err, res) {
			res.should.have.status(201);
			res.body.should.be.a('object');
			res.body.should.have.property('id');
			res.body.should.have.property('content').eql("Manchester united is the best team in the world");
			res.body.should.have.property('createdAt');
			done();
		});
	});
});
//Test the /GET: /api/group/:id/messages route
describe('/GET/:id Messages', function () {
	it('it should GET all messages that have been posted to the group he/she belongs', function () {
		var message = new _message2.default({ content: 'We da best', groupId: 2 });
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