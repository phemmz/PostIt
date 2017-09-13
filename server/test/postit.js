import supertest from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';
import Model from '../data/models';

process.env.NODE_ENV = 'test';
const User = Model.User;
const Group = Model.Group;
const Message = Model.Message;
const View = Model.View;

const should = chai.should();
const server = supertest.agent(app);

chai.use(chaiHttp);
let token = '';

// Test the POST: /api/user/signup route
describe('POSTIT', () => {
  before((done) => {
    User.sync({ force: true })
      .then(() => {
        done();
      });
  });
  // Test the /POST api/group/:id/user
  describe('/POST/:id Add User', () => {
    it('it should not allow users that are not logged in to add new User to a group', (done) => {
      const addDetails = {
        username: 'phemzy',
      };
      chai.request(app)
        .post('/api/v1/group/1/user')
        .send(addDetails)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Please signin/signup');
          done();
        });
    });
  });
  describe('Signup', () => {
    it('it should not POST signup details without password', (done) => {
      const signupDetails = {
        username: 'phemzy',
        email: 'phemzy@gmail.com'
      };
      server
        .post('/api/v1/user/signup')
        .send(signupDetails)
        .expect(422)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('password');
          res.body.should.have.property('password').eql('Please fill in your password');
          done();
        });
    });
    it('it should not POST signup details if passwords do not match', (done) => {
      const signupDetails = {
        username: 'phemzy',
        email: 'phemzy@gmail.com',
        password: '123456',
        passwordConfirmation: 'abcdesa'
      };
      server
        .post('/api/v1/user/signup')
        .expect(422)
        .send(signupDetails)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('passwordConfirmation');
          res.body.should.have.property('passwordConfirmation').eql('Passwords must match!!');
          done();
        });
    });
    it('it should not POST signup details if password is less than 6 characters', (done) => {
      const signupDetails = {
        username: 'phemzy',
        email: 'phemzy@gmail.com',
        password: '1234',
        passwordConfirmation: '1234'
      };
      server
        .post('/api/v1/user/signup')
        .send(signupDetails)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('password');
          res.body.should.have.property('password').eql('Password length must not be less than 6 characters');
          done();
        });
    });
    it('it should not POST signup details without username', (done) => {
      const signupDetails = {
        email: 'phemzy@gmail.com',
        password: '123456',
        passwordConfirmation: '123456'
      };
      server
        .post('/api/v1/user/signup')
        .send(signupDetails)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('username');
          res.body.should.have.property('username').eql('Please fill in your username');
          done();
        });
    });
    it('it should not allow users that are not logged in to create broadcast group', (done) => {
      const groupDetails = {
        groupname: 'sport gist',
      };
      server
        .post('/api/v1/group')
        .send(groupDetails)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Please signin/signup');
          done();
        });
    });
    it('it should not POST signup details with a null or empty string username', (done) => {
      const signupDetails = {
        username: ' ',
        email: 'phemzy@gmail.com',
        password: '123456',
        passwordConfirmation: '123456'
      };
      server
        .post('/api/v1/user/signup')
        .send(signupDetails)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('username');
          res.body.should.have.property('username').eql('Please fill in your username');
          done();
        });
    });
    it('it should not POST signup details with an invalid email address', (done) => {
      const signupDetails = {
        username: 'phemzy',
        email: 'phemzy@gmail',
        password: '123456',
        passwordConfirmation: '123456'
      };
      server
        .post('/api/v1/user/signup')
        .send(signupDetails)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('email');
          res.body.should.have.property('email').eql('Email is invalid');
          done();
        });
    });
    it('it should not POST signup details without phoneNumber', (done) => {
      const signupDetails = {
        username: 'phemzy',
        email: 'phemzy@gmail.com',
        password: '123456',
        passwordConfirmation: '123456'
      };
      server
        .post('/api/v1/user/signup')
        .send(signupDetails)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('phoneNumber');
          res.body.should.have.property('phoneNumber').eql('Please fill in your phone number');
          done();
        });
    });
  });
});
  // Test the POST: /api/group route
describe('Group', () => {
  before((done) => {
    Group.sync({ force: true })
      .then(() => {
        done();
      });
  });
  describe('Create Broadcast Group', () => {
    it('it should not allow user that is not logged in to add new User to a group', (done) => {
      const addDetails = {
        username: 'femo'
      };
      server
        .post('/api/v1/group/1/user')
        .send(addDetails)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('Please signin/signup');
          done();
        });
    });
    it('it should not allow a user that is not logged in to POST messages to a group', (done) => {
      const msgDetails = {
        content: 'happy day',
        priority: 2,
        readcheck: true
      };
      server
        .post('/api/v1/group/1/message')
        .send(msgDetails)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Please signin/signup');
          done();
        });
    });
  });
  describe('Authentication', () => {
    it('it should POST signup details ', (done) => {
      const signupDetails = {
        email: 'phemmzy2014@gmail.com',
        username: 'phemz1',
        phoneNumber: '08062935949',
        password: 'douchee',
        passwordConfirmation: 'douchee'
      };
      server
      .post('/api/v1/user/signup')
      .send(signupDetails)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('confirmation').eql('success');
        done();
      });
    });
    it('it should POST signup details ', (done) => {
      const signupDetails = {
        email: 'hello000@gmail.com',
        username: 'hello000',
        phoneNumber: '09012344912',
        password: 'douchee',
        passwordConfirmation: 'douchee'
      };
      server
        .post('/api/v1/user/signup')
        .send(signupDetails)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('confirmation').eql('success');
          done();
        });
    });
    it('it should signin a user', (done) => {
      const account = {
        username: 'hello000',
        password: 'douchee'
      };
      server
        .post('/api/v1/user/signin')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(account)
        .end((err, res) => {
          token = res.body.token;
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('success');
          res.body.should.have.property('message');
          done();
        });
    });
    it('it should not allow logged in users to create broadcast group with an empty string as group name', (done) => {
      const groupDetails = {
        groupname: ' '
      };
      server
        .post('/api/v1/group')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .type('form')
        .send(groupDetails)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('username').eql('Please fill in your groupname');
          done();
        });
    });
    it('it should allow logged in users to create broadcast group', (done) => {
      const groupDetails = {
        groupname: 'june fellows',
      };
      server
        .post('/api/v1/group')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .type('form')
        .send(groupDetails)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('success');
          res.body.should.have.property('message');
          done();
        });
    });
    it('it should allow logged in users to get all broadcast groups he belongs to', (done) => {
      server
        .get('/api/v1/group')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('results');
          done();
        });
    });
    it('it should not allow logged in users to add a user that already belongs to a group', (done) => {
      const addDetails = {
        username: 'hello000',
      };
      server
      .post('/api/v1/group/1/user')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .type('form')
      .send(addDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('User already exists');
        res.body.should.have.property('confirmation').eql('fail');
        done();
      });
    });
    it('it should not allow logged in users to add new User to a group without providing username', (done) => {
      const addDetails = {
        username: ''
      };
      server
      .post('/api/v1/group/1/user')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send(addDetails)
      .end((err, res) => {
        res.body.should.be.a('object');
        done();
      });
    });
    it('it should not allow logged in users to add User that does not exist', (done) => {
      const addDetails = {
        username: 'phemz4'
      };
      server
      .post('/api/v1/group/1/user')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send(addDetails)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('confirmation').eql('fail');
        res.body.should.have.property('message').eql('User does not exist');
        done();
      });
    });
  });
  // Test the /POST api/group/:id/message
  describe('/POST/:id Post Message', () => {
    before((done) => {
      Message.sync({ force: true })
        .then(() => {
          done();
        });
    });
    it('it should not allow a logged in user to POST messages to a group without content', (done) => {
      const msgDetails = {
        readcheck: true,
        priority: 3
      };
      server
      .post('/api/v1/group/2/message')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send(msgDetails)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('invalid');
        done();
      });
    });

    it('it should  POST messages to a group', (done) => {
      const msgDetails = {
        content: 'Manchester united is the best team in the world',
        readcheck: true,
        priority: 1
      };
      server
      .post('/api/v1/group/1/message')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send(msgDetails)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('confirmation').eql('success');
        res.body.should.have.property('message').eql('Message sent');
        done();
      });
    });
  });
  // Test the /GET: /api/group/:id/messages route
  describe('/GET/:id Messages', () => {
    it('it should GET all messages that have been posted to the group they belong to', (done) => {
      server
        .get('/api/v1/group/1/messages')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should not allow user to post message to group that does not exist', (done) => {
      server
        .get('/api/v1/group/3/messages')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('fail');
          res.body.should.have.property('message').eql('Group does not exist');
          done();
        });
    });
  });
  describe('/POST Password reset', () => {
    it('it should not send verification email to an unregistered user', (done) => {
      const username = {
        username: 'boy2'
      };
      server
        .post('/api/v1/reset')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send(username)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('fail');
          res.body.should.have.property('message').eql('User not found');
          done();
        });
    });
    it('it should not send verification email if no username is provided', (done) => {
      const username = '';
      server
        .post('/api/v1/reset')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send(username)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should send verification email to a registered user', (done) => {
      const username = {
        username: 'phemz1'
      };
      server
        .post('/api/v1/reset')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send(username)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('success');
          res.body.should.have.property('message').eql('You will receive an email with instructions on how to reset your password in a few minutes.');
          done();
        });
    });
    it('it should not update password of a user that is not registered', (done) => {
      const newUser = {
        username: 'phemmz21',
        password: '123456',
        passwordConfirmation: '123456'
      };
      server
        .put('/api/v1/user/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('fail');
          res.body.should.have.property('message').eql('User not found');
          done();
        });
    });
    it('it should not update password if no password is entered', (done) => {
      const newUser = {
        username: 'phemz1',
        passwordConfirmation: '123456'
      };
      server
        .put('/api/v1/user/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('password').eql('Please fill in your password');
          done();
        });
    });
    it('it should not update password if no passwordConfirmation is entered', (done) => {
      const newUser = {
        username: 'phemz1',
        password: '123456'
      };
      server
        .put('/api/v1/user/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('passwordConfirmation').eql('Please fill in your password');
          done();
        });
    });
    it('it should not update password if password and passwordConfirmation do not match', (done) => {
      const newUser = {
        username: 'phemz1',
        password: '123456',
        passwordConfirmation: '12345678'
      };
      server
        .put('/api/v1/user/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('passwordConfirmation').eql('Passwords must match!!');
          done();
        });
    });
    it('it should update password of a registered user', (done) => {
      const newUser = {
        username: 'phemz1',
        password: '123456',
        passwordConfirmation: '123456'
      };
      server
        .put('/api/v1/user/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('success');
          res.body.should.have.property('message').eql('Password updated successfully');
          done();
        });
    });
  });
  describe('/POST Google+ authentication', () => {
    it('it should signup a new user using google details', (done) => {
      const googleDetails = {
        username: 'phemmz8',
        email: 'phemmz8@gmail.com',
        password: '123456',
        phoneNumber: '107417116674271276210'
      };
      server
        .post('/api/v1/auth/google')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send(googleDetails)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('success');
          res.body.should.have.property('message').eql('phemmz8 successfully created');
          done();
        });
    });
    it('it should signin an existing user using google details', (done) => {
      const googleDetails = {
        username: 'hello000',
        email: 'hello000@gmail.com',
        password: 'douchee'
      };
      server
        .post('/api/v1/auth/google')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send(googleDetails)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('success');
          res.body.should.have.property('message').eql('hello000 logged in');
          done();
        });
    });
  });
  describe('Read Status', () => {
    before((done) => {
      View.sync({ force: true })
        .then(() => {
          done();
        });
    });
    it('it should add user has part of those who have read a message', (done) => {
      const groupId = 1;
      server
        .post(`/api/v1/group/${groupId}/readStatus`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('success');
          done();
        });
    });
    it('it should get users that have read a message', (done) => {
      const groupId = 1;
      server
        .get(`/api/v1/group/${groupId}/readStatus`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('success');
          res.body.should.have.property('uniqueList');
          done();
        });
    });
    it('it should throw an error if an invalid groupId is passed', (done) => {
      const groupId = '1a';
      server
        .get(`/api/v1/group/${groupId}/readStatus`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('fail');
          res.body.should.have.property('message').eql('Invalid group id');
          done();
        });
    });
  });
  describe('Search Users', () => {
    it('it should search for users based on the search key passed', (done) => {
      const searchKey = 'h';
      const offset = 0;
      const perPage = 5;
      server
        .get(`/api/v1/search/${searchKey}/${offset}/${perPage}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('success');
          res.body.should.have.property('meta');
          res.body.should.have.property('comments');
          done();
        });
    });
  });
  describe('Group Members', () => {
    it('it should not get members of a group if user is not authenticated', (done) => {
      const groupId = 1;
      const offset = 0;
      const perPage = 5;
      server
        .get(`/api/v1/members/${groupId}/${offset}/${perPage}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Please signin/signup');
          done();
        });
    });
    it('it should get all the members of a group', (done) => {
      const groupId = 1;
      const offset = 0;
      const perPage = 5;
      server
        .get(`/api/v1/members/${groupId}/${offset}/${perPage}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('success');
          res.body.should.have.property('members');
          res.body.should.have.property('meta');
          res.body.should.have.property('comments');
          done();
        });
    });
    it('it should not get members of a group if string is passed as groupId', (done) => {
      const groupId = 'asjansj';
      const offset = 0;
      const perPage = 5;
      server
        .get(`/api/v1/members/${groupId}/${offset}/${perPage}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('fail');
          res.body.should.have.property('message').eql('Failed to get group members');
          done();
        });
    });
  });
});
