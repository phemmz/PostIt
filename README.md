[![Build Status](https://travis-ci.org/phemmz/PostIt.svg?branch=develop)](https://travis-ci.org/phemmz/PostIt) [![Code Climate](https://codeclimate.com/github/phemmz/PostIt/badges/gpa.svg)](https://codeclimate.com/github/phemmz/PostIt) [![Coverage Status](https://coveralls.io/repos/github/phemmz/PostIt/badge.svg?branch=develop)](https://coveralls.io/github/phemmz/PostIt?branch=develop)

# PostIt
PostIt is a simple web application that allows friends and colleagues create groups for notifications.
You can use the application by going to https://phemmz-post-it.herokuapp.com/

## Development

This application was developed using [ExpressJS](http://expressjs.com). [PostgreSQL](https://www.postgresql.org/) was used for persisting data with [Sequelize](https://http://docs.sequelizejs.com) as [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping) and [React-Redux](https://github.com/reactjs/react-redux) for implementation of client side.

### Installation
1. Start up your terminal (or Command Prompt on Windows OS).
2. Ensure that you have `node` and `postgresql` installed on your PC.
3. Clone the repository by entering the command `git clone https://github.com/phemmz/PostIt/new/master` in the terminal.
4. Navigate to the project root folder using `cd PostIt` on your terminal (or command prompt).
5. After cloning, install the application's dependencies with the command `npm install`.
6. Create a `.env` file in your root directory as described in `.env.sample` file.
7. Variable such as DATABASE_URL (which must be a postgresql URL) is defined in the .env file and it is essential to create this file before running the application.
```
DATABASE_URL='postgres://jean:buck@localhost:5432/databaseName'
```
8. After this, you can start the server with the command: `npm start`.

## Key Features
Based on project requirement, PostIt has the following features:

### Users
- Users can successfully create a new account by providing some signup details
- Registered Users can successfully login to the application
- A jsonwebtoken is generated on successful signup/login
- The jsonwebtoken is used to authenticate users
- Users can reset password to a new one
- Users can search for other registered users 
- Users can signup/signin using google+ authentication

### Groups
- New group can be created by a registered user
- Group created must be unique
- Other registered users can be added to the group

### Messages
- Messages can be posted to created groups
- Only users in created groups can post and receive messages posted
- Messages posted are based on priority levels. The levels takes the following format:
1. Normal: in-app notification is sent to all users in the group
2. Urgent: in-app notification and email notifications is sent to all users in the group
3. Critical: in-app, email and sms notification is sent to all users in the group

### API Documentation

Name   |     url       |   HTTP verb  | Payload  |   description
------ | ------------- | ------------ | ---------| -------------------
**AUTHENTICATION** 
signup     |  /api/user/signup     |     POST     | username, email, password, passwordConfirmation |  Allows users to signup a new account on the PostIt app
signin     |    /api/user/signin   |    POST      | username, password | Allows a registered user to signin to the PostIt app
allusers   | /api/user/            |    GET       | none | Gets all registered users for the application
**GROUP** 
getGroup     |    /api/group   |    GET      | none  |   Gets all the groups a user belongs to.
createGroup     |  /api/group/     |     POST     | groupname | Allows a registered user to create a new group
**USERS** 
addUserToGroup     |  /api/group/:id/user     |     POST     | username, groupId | Allows group owner to add registered users to his group
**MESSAGES**
getMessages    |    /api/group/:id/messages   |    GET      | none |   Retrieves all the messages in a particular group
sendMessage     |  /api/group/:id/message     |     POST     | content, priority, readcheck, groupId | Allows group members to post messages to groups they belong to

## How to use the Payloads

#### SIGNUP for new user: `api/user/signup`
To signup a new user, send the parameters as shown below:
```
{
  "username": "tuna",
  "email": "tuna@gmail.com",
  "password": "sumo123tu",
  "passwordConfirmation": "sumo123tu"
}
```

#### SIGNIN for registered user: `api/user/signin`
To signin, send the parameters in the below format:
```
{
  "username": "tuna",
  "password": "sumo123tu"
}
```

#### CREATE a new group: `api/group`
To create a new group, send the paramters in the below format:
```
{
  "groupname": "Tuna Family"
}
```
#### ADD a user to a group: `api/group/:groupId/user`
To add a user to a group:
```
{
  "username": "rocky"
}
```
NB: To add a user to a group, the user must be registered on the application

#### POST a message to a group: `api/group/:groupId/message`
To post a message to a group:
```
{
  "content": "Hello everybody",
  "readcheck": false,
  "priority": 1
}
```

## Limitations
- One of the limitations of this app is that users who signed up using google+ authentication can not sign in with the local signin strategy unless the user creates a new account with a different email address.
- Also, groups can not be deleted and users can not be removed from a group.
- Currently, Users can not update their profile information.

## Tests
*  The tests have been written using **[Mocha](https://www.npmjs.com/package/mocha)** and **[Chai](https://www.npmjs.com/package/chai)**.
*  Issue the following command on terminal.
  *  `npm run test`
*  If the tests are successful, they will complete without failures or errors.

## How To Contribute
- Fork this repository
- Clone the repository
- Create your feature branch locally with ``` git checkout -b your-feature-branch-name ```
- Commit your changes using ``` git commit -m 'Commit name' ```
- Push your changes to your remote branch with ``` git push -u origin your-feature-branch-name ```
- Open a pull request to the master branch, and describe how your feature works

## License
The MIT License

#### Author: Adetunji Femi
