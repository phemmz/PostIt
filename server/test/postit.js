import supertest from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';
import Model from '../data/models';
import { addDetails,
 userDetails, groupDetails,
  msgDetails } from './__mockData__/dummyData';

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
  describe('Add User', () => {
    it(
  'should not allow users that are not logged in to add new User to a group',
    (done) => {
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
    it('should not POST signup details without password', (done) => {
      server
        .post('/api/v1/user/signup')
        .send({ ...userDetails[0], password: '' })
        .expect(422)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('password')
          .eql('Please fill in your password');
          done();
        });
    });
    it('should not POST signup details if passwords do not match',
    (done) => {
      server
        .post('/api/v1/user/signup')
        .expect(422)
        .send({ ...userDetails[0], passwordConfirmation: 'abcdesa' })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('passwordConfirmation')
          .eql('Passwords must match!!');
          done();
        });
    });
    it(
      'should not POST signup details if password is less than 6 characters',
      (done) => {
        server
          .post('/api/v1/user/signup')
          .send(
          { ...userDetails[0], password: '1234', passwordConfirmation: '1234' })
          .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.have.property('password')
            .eql('Password length must not be less than 6 characters');
            done();
          });
      });
    it('should not POST signup details without username', (done) => {
      server
        .post('/api/v1/user/signup')
        .send({ ...userDetails[0], username: '' })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('username')
          .eql('Please fill in your username');
          done();
        });
    });
    it(
  'should not allow users that are not logged in to create broadcast group',
      (done) => {
        server
          .post('/api/v1/group')
          .send({ ...groupDetails[0] })
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.should.have.property('error').eql('Please signin/signup');
            done();
          });
      });
    it('should not POST signup details with a null or empty string username',
      (done) => {
        server
          .post('/api/v1/user/signup')
          .send({ ...userDetails[0], username: ' ' })
          .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.have.property('username')
            .eql('Please fill in your username');
            done();
          });
      });
    it('should not POST signup details with an invalid email address',
      (done) => {
        server
          .post('/api/v1/user/signup')
          .send({ ...userDetails[0], email: 'phemzy@gmail' })
          .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.have.property('email')
            .eql('Email is invalid');
            done();
          });
      });
    it('it should not POST signup details without phoneNumber', (done) => {
      server
        .post('/api/v1/user/signup')
        .send({ ...userDetails[0], phoneNumber: '' })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('phoneNumber')
          .eql('Please fill in your phone number');
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
    it(
    'it should not allow user that is not logged in to add new User to a group',
      (done) => {
        server
          .post('/api/v1/group/1/user')
          .send({ ...addDetails })
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('Please signin/signup');
            done();
          });
      });
    it('it should not allow a user that is not logged in to POST messages to a group', (done) => {  // eslint-disable-line
      server
        .post('/api/v1/group/1/message')
        .send({ ...msgDetails })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Please signin/signup');
          done();
        });
    });
  });
  describe('Authentication', () => {
    it('it should POST signup details ', (done) => {
      server
      .post('/api/v1/user/signup')
      .send(userDetails[1])
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('confirmation').eql('success');
        done();
      });
    });
    it('it should POST signup details ', (done) => {
      server
        .post('/api/v1/user/signup')
        .send(userDetails[2])
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('confirmation').eql('success');
          done();
        });
    });
    it('it should signin a user', (done) => {
      server
        .post('/api/v1/user/signin')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(userDetails[2])
        .end((err, res) => {
          token = res.body.token;
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('success');
          res.body.should.have.property('message');
          done();
        });
    });
    it('it should not allow logged in users to create broadcast group with an empty string as group name', (done) => {  // eslint-disable-line
      server
        .post('/api/v1/group')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .type('form')
        .send({ ...groupDetails[0], groupname: ' ' })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('username')
          .eql('Please fill in your groupname');
          done();
        });
    });
    it('it should allow logged in users to create broadcast group', (done) => {
      server
        .post('/api/v1/group')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .type('form')
        .send({ ...groupDetails[1] })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('success');
          res.body.should.have.property('message');
          done();
        });
    });
    it(
  'it should allow logged in users to get all broadcast groups he belongs to',
    (done) => {
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
    it('it should not allow logged in users to add a user that already belongs to a group', (done) => {  // eslint-disable-line
      server
      .post('/api/v1/group/1/user')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .type('form')
      .send(userDetails[2])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('User already exists');
        res.body.should.have.property('confirmation').eql('fail');
        done();
      });
    });
    it('it should not allow logged in users to add new User to a group without providing username', (done) => {  // eslint-disable-line
      server
      .post('/api/v1/group/1/user')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send({ ...userDetails[0], username: '' })
      .end((err, res) => {
        res.body.should.be.a('object');
        done();
      });
    });
    it('it should not allow logged in users to add User that does not exist',
      (done) => {
        server
        .post('/api/v1/group/1/user')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({ ...userDetails[0], username: 'phemz4' })
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
    it('it should not allow a logged in user to POST messages to a group without content', (done) => {  // eslint-disable-line
      server
      .post('/api/v1/group/2/message')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send({ ...msgDetails, content: '' })
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('invalid');
        done();
      });
    });

    it('it should  POST messages to a group', (done) => {
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
    it(
'it should GET all messages that have been posted to the group they belong to',
    (done) => {
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
    it('it should not allow user to post message to group that does not exist',
      (done) => {
        server
          .get('/api/v1/group/3/messages')
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .set('authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('confirmation').eql('fail');
            res.body.should.have.property('message')
            .eql('Group does not exist');
            done();
          });
      });
  });
  describe('/POST Password reset', () => {
    it('it should not send verification email to an unregistered user',
      (done) => {
        server
          .post('/api/v1/reset')
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .set('authorization', `Bearer ${token}`)
          .send({ ...userDetails[0], username: 'boy2' })
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('confirmation').eql('fail');
            res.body.should.have.property('message').eql('User not found');
            done();
          });
      });
    it('it should not send verification email if no username is provided',
      (done) => {
        server
          .post('/api/v1/reset')
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .set('authorization', `Bearer ${token}`)
          .send({ ...userDetails, username: '' })
          .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            done();
          });
      });
    it('it should send verification email to a registered user', (done) => {
      server
        .post('/api/v1/reset')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send(userDetails[1])
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('success');
          res.body.should.have.property('message')
          .eql('You will receive an email with instructions on how to reset your password in a few minutes.');  // eslint-disable-line
          done();
        });
    });
    it('it should not update password of a user that is not registered',
      (done) => {
        server
          .put('/api/v1/user/signup')
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .set('authorization', `Bearer ${token}`)
          .send({ ...userDetails[0], username: 'phemmz21' })
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('confirmation').eql('fail');
            res.body.should.have.property('message').eql('User not found');
            done();
          });
      });
    it('it should not update password if no password is entered', (done) => {
      server
        .put('/api/v1/user/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({ ...userDetails[0], password: '' })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('password')
          .eql('Please fill in your password');
          done();
        });
    });
    it('it should not update password if no passwordConfirmation is entered',
      (done) => {
        server
          .put('/api/v1/user/signup')
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .set('authorization', `Bearer ${token}`)
          .send({ ...userDetails[0], passwordConfirmation: '' })
          .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.have.property('passwordConfirmation')
            .eql('Please fill in your password');
            done();
          });
      });
    it('it should not update password if password and passwordConfirmation do not match', (done) => {  // eslint-disable-line
      server
        .put('/api/v1/user/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({ ...userDetails[0], passwordConfirmation: '12345678' })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('passwordConfirmation')
          .eql('Passwords must match!!');
          done();
        });
    });
    it('it should update password of a registered user', (done) => {
      server
        .put('/api/v1/user/signup')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({ ...userDetails[1] })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('success');
          res.body.should.have.property('message')
          .eql('Password updated successfully');
          done();
        });
    });
  });
  describe('/POST Google+ authentication', () => {
    it('it should signup a new user using google details', (done) => {
      server
        .post('/api/v1/auth/google')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send({ ...userDetails[3] })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('success');
          res.body.should.have.property('message')
          .eql('phemmz8 successfully created');
          done();
        });
    });
    it('it should signin an existing user using google details', (done) => {
      server
        .post('/api/v1/auth/google')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send({ ...userDetails[2] })
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
    it('it should add user has part of those who have read a message',
      (done) => {
        server
          .post('/api/v1/group/1/readStatus')
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
      server
        .get('/api/v1/group/1/readStatus')
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
      server
        .get('/api/v1/group/1a/readStatus')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.have.property('message')
          .eql('Invalid groupId supplied');
          done();
        });
    });
  });
  describe('Search Users', () => {
    it('it should search for users based on the search key passed', (done) => {
      server
        .get('/api/v1/search/h/0/5')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('success');
          res.body.should.have.property('metaData');
          res.body.should.have.property('searchedUsers');
          done();
        });
    });
  });
  describe('Group Members', () => {
    it('it should not get members of a group if user is not authenticated',
      (done) => {
        server
          .get('/api/v1/members/1/0/5')
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
      server
        .get('/api/v1/members/1/0/5')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('success');
          res.body.should.have.property('members');
          res.body.should.have.property('metaData');
          res.body.should.have.property('paginatedMembers');
          done();
        });
    });
    it('it should not get members of a group if string is passed as groupId',
      (done) => {
        server
          .get('/api/v1/members/asjansj/0/5')
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .set('authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.have.property('message')
            .eql('Invalid groupId supplied');
            done();
          });
      });
  });
});
