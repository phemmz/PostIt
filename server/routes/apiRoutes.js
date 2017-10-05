import express from 'express';
import UserController from './../controllers/userController';
import GroupController from './../controllers/groupController';
import MessageController from './../controllers/messageController';
import GroupValidations from '../controllers/middlewares/GroupValidations';
import UserValidations from '../controllers/middlewares/UserValidations';

/**
 * Creates a new express router
 */
const router = express.Router();
/**
 * Router for getting all the registered users in the application
 */
router.get('/api/v1/user', UserValidations.authenticate,
  UserController.getAllUsers);
/**
 * Router for identifying a particular user either by username,
 * phone number or email
 */
router.get('/api/v1/user/:identifier', UserController.getOne);
/**
 * Router for signup
 * Takes a middleware that validates user input
 */
router.post('/api/v1/user/signup', UserController.signup);
/**
 * Router for signin
 * Takes a middleware that validates user input
 */
router.post('/api/v1/user/signin', UserController.signin);
/**
 * Post router for creating a group
 * Takes authenticate and validateUserInput middlewares
 * authenticate verifies the jwtoken and
 * sets the user details to currentUser if authentication is valid
 */
router.post('/api/v1/group', UserValidations.authenticate,
  GroupController.createGroup);
/**
 * Router to get all the group(s) a user belongs to
 * Takes authenticate middleware to verify the token
 */
router.get('/api/v1/group', UserValidations.authenticate,
  GroupController.getGroup);
/**
 * Router to post message to a particular group
 * Takes authenticate, validateUserInput and isGroupMember middlewares
 * authenticate verifies token
 * validateUserInput validates user input
 * isGroupMember checks if the user belongs to the group
 */
router.post('/api/v1/group/:groupId/message', UserValidations.authenticate,
  GroupValidations.isGroupMember, MessageController.sendMessage);
/**
 * Router to get all messages in a particular group
 * Takes the authenticate and isGroupMember middlewares
 */
router.get('/api/v1/group/:groupId/messages', UserValidations.authenticate,
  GroupValidations.isGroupMember, MessageController.getMessages);
/**
 * Router to add a user to a particular group
 * Takes the authenticate, validateUserInput and isGroupMember middlewares
 */
router.post('/api/v1/group/:groupId/user', UserValidations.authenticate,
  GroupValidations.isGroupMember, GroupController.addUserToGroup);
/**
 * Router for resetting password
 * Takes a middleware that validates user input
 */
router.post('/api/v1/reset', UserController.resetPassword);
/**
 * Router for updating password field
 * Takes a middleware that validates user input
 */
router.put('/api/v1/user/signup', UserController.updatePassword);
/**
 * Google callback url.
 */
router.post('/api/v1/auth/google', UserController.googleSignup);
router.post('/api/v1/group/:groupId/readStatus', UserValidations.authenticate,
  GroupValidations.isGroupMember, MessageController.readStatus);
router.get('/api/v1/group/:groupId/readStatus', UserValidations.authenticate,
  GroupValidations.isGroupMember, MessageController.readList);
router.get('/api/v1/search/:searchKey/:offset/:perPage',
  UserValidations.authenticate, UserController.searchUsers);
router.get('/api/v1/members/:groupId/:offset/:perPage',
  UserValidations.authenticate, GroupValidations.isGroupMember,
  GroupController.groupMembers);
export default router;
