[![Build Status](https://travis-ci.org/phemmz/PostIt.svg?branch=develop)](https://travis-ci.org/phemmz/PostIt) [![Code Climate](https://codeclimate.com/github/phemmz/PostIt/badges/gpa.svg)](https://codeclimate.com/github/phemmz/PostIt) [![Coverage Status](https://coveralls.io/repos/github/phemmz/PostIt/badge.svg?branch=develop)](https://coveralls.io/github/phemmz/PostIt?branch=develop)

# PostIt
PostIt is a simple web application that allows friends and colleagues create groups for notifications.
You can use the application by going to https://phemmz-post-it.herokuapp.com/

## Development

This application was developed using [ExpressJS](http://expressjs.com). PostgreSQL was used for persisting data with [Sequelize](https://http://docs.sequelizejs.com) as [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping) and React-Redux for implementation of client side.

### Installation
1. Start up your terminal (or Command Prompt on Windows OS).
2. Ensure that you have `node` installed on your PC.
3. Clone the repository by entering the command `git clone https://github.com/phemmz/PostIt/new/master` in the terminal.
4. Navigate to the project root folder using `cd PostIt` on your terminal (or command prompt).
5. After cloning, install the application's dependencies with the command `npm install`.
6. Create a `.env` file in your root directory as described in `.env.sample` file.
7. Variable such as DATABASE_URL (which must be a postgresql URL) is defined in the .env file and it is essential to create this file before running the application.
```
DATABASE_URL='postgres://jean:buck@localhost:5432/databaseName'
```
8. After this, you can start the server with the command: `npm start`.

### API Documentation

Name   |     url       |     HTTP verb      |     description
------ | ------------- | -------------- | -------------------
##AUTHENTICATION |
SIGNUP     |  /api/user/signup     |     POST     |     Allows users to signup a new account on the PostIt app
SIGNIN     |    /api/user/signin   |    POST      |    Allows a registered user to signin to the PostIt app
##GROUP |
GETGROUP     |    /api/group   |    GET      |    Gets all the groups a user belongs to.
CREATEGROUP     |  /api/group/     |     POST     |     Allows a registered user to create a new group
##USERS |
ADDUSER     |  /api/group/:id/user     |     POST     |     Allows group owner to add registered users to his group
##MESSAGES |
GETMESSAGES    |    /api/group/:id/messages   |    GET      |    Retrieves all the messages in a particular group
SENDMESSAGE     |  /api/group/:id/message     |     POST     |     Allows group members to post messages to groups they belong to

