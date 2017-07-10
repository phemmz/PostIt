import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';
import Model from '../server/data/models';

process.env.NODE_ENV = 'test';
const Account = Model.Account;
const Group = Model.Group;
const Message = Model.Messages;

const should = chai.should();

chai.use(chaiHttp);

// Test the POST: /api/user/signup route
describe('/POST User', () => {
  describe('Signup', () => {
    it('it should not POST signup details without password', (done) => {
      const signupDetails = {
        username: 'phemzy',
        email: 'phemzy@gmail.com'
      };
      chai.request(app)
        .post('/api/user/signup')
        .send(signupDetails)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('invalid');
          res.body.should.have.property('invalid').eql('Please fill in your details');
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
      chai.request(app)
        .post('/api/user/signup')
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
      chai.request(app)
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
      chai.request(app)
        .post('/api/user/signup')
        .send(signupDetails)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('invalid');
          res.body.should.have.property('invalid').eql('Please fill in your details');
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
      chai.request(app)
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
      chai.request(app)
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
  // Test the POST: /api/group route
  describe('/POST Create Broadcast Group', () => {
    it('it should not allow users that are not logged in to create broadcast group', (done) => {
      const groupDetails = {
        groupname: 'sport gist',
      };
      chai.request(app)
        .post('/api/group')
        .send(groupDetails)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('fail');
          res.body.should.have.property('message').eql('Please sign in to create a group');
          done();
        });
    });
    it('it should not allow users that are not logged in to add new User to a group', (done) => {
      const addDetails = {
        username: 'phemzy',
        groupname: 'Random'
      };
      chai.request(app)
        .post('/api/group/2/user')
        .send(addDetails)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('fail');
          res.body.should.have.property('message').eql('Please log in to add a user to a group');
          done();
        });
    });
    it('it should not allow a user that is not logged in to POST messages to a group', (done) => {
      const msgDetails = {
        content: 'happy day',
        priority: 3,
        readcheck: true,
        groupId: 2
      };
      chai.request(app)
        .post('/api/group/2/message')
        .send(msgDetails)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('fail');
          res.body.should.have.property('message').eql('Please log in to send a message');
          done();
        });
    });
    it('it should not allow user that is not logged in to GET all messages that have been posted to the group they belong to', (done) => {
      const message = new Message({ content: 'We da best', readcheck: true, priority: 2, groupId: 2 });
      message.save((err, message) => {
        chai.request(app)
          .get('/api/group/2/messages')
          .send(message)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('confirmation').eql('fail');
            res.body.should.have.property('message').eql('You are not logged in');
            done();
          });
      });
    });
  });
  describe('Signup', () => {
    it('it should POST signup details ', (done) => {
      const signupDetails = {
        email: 'hello9@gmail.com',
        username: 'hello9',
        password: 'douchee',
        passwordConfirmation: 'douchee'
      };
      chai.request(app)
        .post('/api/user/signup')
        .send(signupDetails)
        .end((err, res) => {
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
    it('it should allow logged in users to create broadcast group', (done) => {
      const groupDetails = {
        groupname: 'sport gist',
      };
      chai.request(app)
        .post('/api/group')
        .send(groupDetails)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmation').eql('success');
          res.body.should.have.property('message');
          res.body.should.have.property('result');
          done();
        });
    });
  });
  describe('/POST User', () => {
    it('it should signin a user', (done) => {
      const account = new Account({
        username: 'hello9',
        password: 'douchee'
      });
      account.save((err, account) => {
        chai.request(app)
          .post('/api/user/signin')
          .send(account)
          .end((err, res) => {
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

describe('/POST Create Broadcast Group', () => {
  it('it should not allow logged in users to create broadcast group with an empty string as group name', (done) => {
    const groupDetails = {
      groupname: ' ',
    };
    chai.request(app)
      .post('/api/group')
      .send(groupDetails)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('username').eql('Please fill in your groupname');
        done();
      });
  });
});
describe('/POST Create Broadcast Group', () => {
  
});

// Test the /POST api/group/:id/user
describe('/POST/:id Add User', () => {
  it('it should not allow users that are not logged in to add new User to a group', (done) => {
    const addDetails = {
      username: 'phemzy',
      groupname: 'Random'
    };
    chai.request(app)
      .post('/api/group/2/user')
      .send(addDetails)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('confirmation').eql('fail');
        res.body.should.have.property('message').eql('Please log in to add a user to a group');
        done();
      });
  });
  it.skip('it should not allow logged in users to add new User to a group without providing username', (done) => {
    const addDetails = {
      groupname: 'Random'
    };
    chai.request(app)
      .post('/api/group/2/user')
      .send(addDetails)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Cant add user to group');
        done();
      });
  });
  it.skip('it should allow logged in users to add new User to a group', (done) => {
    const addDetails = {
      username: 'phemzy',
      groupname: 'Random'
    };
    chai.request(app)
      .post('/api/group/2/user')
      .send(addDetails)
      .end((err, res) => {
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
describe('/POST/:id Post Message', () => {
  it.skip('it should not allow a logged in user to POST messages to a group without content', (done) => {
    const msgDetails = {
      readcheck: true,
      priority: 3
    };
    chai.request(app)
      .post('/api/group/2/message')
      .send(msgDetails)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('confirmation').eql('fail');
        res.body.should.have.property('invalid').eql('Please fill the required parameters');
        done();
      });
  });

  it.skip('it should  POST messages to a group', (done) => {
    const msgDetails = {
      content: 'Manchester united is the best team in the world',
      readcheck: true,
      priority: 3
    };
    chai.request(app)
      .post('/api/group/2/message')
      .send(msgDetails)
      .end((err, res) => {
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
describe('/GET/:id Messages', () => {
  it('it should GET all messages that have been posted to the group they belong to', (done) => {
    const message = new Message({ content: 'We da best', readcheck: true, priority: 2, groupId: 2 });
    message.save((err, message) => {
      chai.request(app)
        .get('/api/group/2/messages')
        .send(message)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
  after((done) => {
    Account.sync({ force: true })
      .then(() => {
        done();
      });
  });
});
