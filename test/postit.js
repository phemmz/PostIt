// process.env.NODE_ENV = 'test';
// Import the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';

// Import the model
const Account = require('../server/data/models').Account;
const Group = require('../server/data/models').Group;
const Message = require('../server/data/models').Message;



// Import the model


const should = chai.should();

chai.use(chaiHttp);



// Test the POST: /api/user/signup route
  describe('/POST User', () => {
    before((done) => {
      Account.sync({ force: false })
      .then(() => {
        done();
      });
    });

    it('it should not POST signup details without email', (done) => {
      const signupDetails = {
        username: 'phemzy',
        password: 'phemzy',
      };
      chai.request(app).post('/api/user/signup').send(signupDetails).end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        done();
      });
    });

    it('it should POST signup details ', (done) => {
      const signupDetails = {
        username: "douch",
        email: "douch@gmail.com",
        password: "douchee"
      };
      chai.request(app)
       .post('/api/user/signup')
       .send(signupDetails)
       .end((err,res) => {        
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
  describe('/POST User', () => {  
    
    it.skip('it should signin a user', (done) => {
      let account = new Account({
        username: "phemz",
        email: "phemz@gmail.com",
        password: "phemzy",
      })
      account.save((err, account) => {
        chai.request(app)
        .get('/api/user/signin')
        .send(account)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('username');
         done();
        });
      }); 
    })
  });

   // Test the POST: /api/group route
  describe('/POST Create Broadcast Group', () => {
        
    it('it should not allow users create broadcast groups without providing groupname', (done) => {
      let groupDetails = {}
      chai.request(app)
      .post('/api/group')
      .send(groupDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
       done();
      });
    });
 
    it('it should allow users create broadcast groups by providing groupname', (done) => {
      let groupDetails = {
        groupname: "sport gist",
      }
      chai.request(app)
      .post('/api/group')
      .send(groupDetails)
      .end((err,res) => {
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
   describe('/POST/:id Add User', () => {    
     it('it should Add(POST) users to a group by the given group id', (done) => {
     let addDetails = {
       username: "phemzy",
       groupId: "2"
     }
     chai.request(app)
     .post('/api/group/' + addDetails.groupId + '/user')
     .send(addDetails)
     .end((err,res) => {
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
   describe('/POST/:id Post Message', () => {
    
     it('it should not POST messages to a group without a message', (done) => {
       let msgDetails = {}
       chai.request(app)
       .post('/api/group/' + msgDetails.groupId + '/message')
       .send(msgDetails)
       .end((err,res) => {
         res.should.have.status(400);
         res.body.should.be.a('object');
         res.body.should.have.property('errors');
        done();
       });
      });

     it('it should  POST messages to a group', (done) => {
       let msgDetails = {
         content: "Manchester united is the best team in the world",
         readcheck: true,
         priority: 3,
         groupId: "2"
       }

       chai.request(app)
       .post('/api/group/' + msgDetails.groupId + '/message')
       .send(msgDetails)
       .end((err,res) => {
         res.should.have.status(200);
         res.body.should.be.a('object');
         res.body.should.have.property('id');
         res.body.should.have.property('content')
         .eql("Manchester united is the best team in the world");
         res.body.should.have.property('createdAt');
        done();
       });
      });
     });

   // Test the /GET: /api/group/:id/messages route
   describe('/GET/:id Messages', () => {
     it('it should GET all messages that have been posted to the group he/she belongs', () => {
       let message = new Message({ content: 'We da best', readcheck: true, priority: 2, groupId: 2 });
       message.save((err, message) => {
         chai.request(app)
         .get('/api/group/'+ message.groupId + 'messages')
         .send(message)
         .end((err, res) => {
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
