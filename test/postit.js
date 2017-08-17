import supertest from 'supertest';
import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';
import Model from '../server/data/models';

process.env.NODE_ENV = 'test';
const User = Model.User;
const Group = Model.Group;
const Message = Model.Messages;

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
        .post('/api/group/1/user')
        .send(addDetails)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Please signin/signup');
          done();
        });
    });
  });
  describe('Authentication', () => {
    it('it should not POST signup details without password', (done) => {
      const signupDetails = {
        username: 'phemzy',
        email: 'phemzy@gmail.com'
      };
      server
        .post('/api/user/signup')
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
  });
  describe('Signup', () => {
    it('it should not POST signup details if passwords do not match', (done) => {
      const signupDetails = {
        username: 'phemzy',
        email: 'phemzy@gmail.com',
        password: '123456',
        passwordConfirmation: 'abcdesa'
      };
      server
        .post('/api/user/signup')
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
  });
  describe('Signup', () => {
    it('it should not POST signup details if password is less than 6 characters', (done) => {
      const signupDetails = {
        username: 'phemzy',
        email: 'phemzy@gmail.com',
        password: '1234',
        passwordConfirmation: '1234'
      };
      server
        .post('/api/user/signup')
        .send(signupDetails)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('password');
          res.body.should.have.property('password').eql('Password length must not be less than 6 characters');
          done();
        });
    });
  });
  describe('Signup', () => {
    it('it should not POST signup details without username', (done) => {
      const signupDetails = {
        email: 'phemzy@gmail.com',
        password: '123456',
        passwordConfirmation: '123456'
      };
      server
        .post('/api/user/signup')
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
        .post('/api/group')
        .send(groupDetails)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Please signin/signup');
          done();
        });
    });
  });
  describe('Signup', () => {
    it('it should not POST signup details with a null or empty string username', (done) => {
      const signupDetails = {
        username: ' ',
        email: 'phemzy@gmail.com',
        password: '123456',
        passwordConfirmation: '123456'
      };
      server
        .post('/api/user/signup')
        .send(signupDetails)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('username');
          res.body.should.have.property('username').eql('Please fill in your username');
          done();
        });
    });
  });
  describe('Signup', () => {
    it('it should not POST signup details with an invalid email address', (done) => {
      const signupDetails = {
        username: 'phemzy',
        email: 'phemzy@gmail',
        password: '123456',
        passwordConfirmation: '123456'
      };
      server
        .post('/api/user/signup')
        .send(signupDetails)
        .end((err, res) => {
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
        .post('/api/group/1/user')
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
        .post('/api/group/1/message')
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
        email: 'phemz1@gmail.com',
        username: 'phemz1',
        password: 'douchee',
        passwordConfirmation: 'douchee'
      };
      server
      .post('/api/user/signup')
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
        password: 'douchee',
        passwordConfirmation: 'douchee'
      };
      server
        .post('/api/user/signup')
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
        .post('/api/user/signin')
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
        .post('/api/group')
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
        .post('/api/group')
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
    it('it should not allow logged in users to add a user that already belongs to a group', (done) => {
      const addDetails = {
        username: 'phemz1',
      };
      server
      .post('/api/group/1/user')
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
      .post('/api/group/1/user')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send(addDetails)
      .end((err, res) => {
        res.body.should.be.a('object');
        done();
      });
    });
  });
  // Test the /POST api/group/:id/message
  describe('/POST/:id Post Message', () => {
    it('it should not allow a logged in user to POST messages to a group without content', (done) => {
      const msgDetails = {
        readcheck: true,
        priority: 3
      };
      server
      .post('/api/group/2/message')
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
      .post('/api/group/1/message')
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
        .get('/api/group/1/messages')
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
        .get('/api/group/3/messages')
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
});
