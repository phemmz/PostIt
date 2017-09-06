import express from 'express';
import UserController from './../controllers/accountController';
import GroupController from './../controllers/groupController';
import MessageController from './../controllers/messageController';
import SignupValidations from '../controllers/middlewares/signupMiddleware';
import SigninValidations from '../controllers/middlewares/signinMiddleware';
import UpdatePasswordValidations from '../controllers/middlewares/updatePasswordMiddleware';
import CreateGroupValidations from '../controllers/middlewares/createGroupMiddleware';
import AddUserValidations from '../controllers/middlewares/addUserMiddleware';
import checkUserInGroup from '../controllers/middlewares/checkUserInGroup';
import SendMessageValidations from '../controllers/middlewares/sendMessageMiddleware';
import authenticate from '../controllers/middlewares/authenticate';
import ResetValidations from '../controllers/middlewares/resetMiddleware';

/**
 * Creates a new express router
 */
const router = express.Router();
/**
 * Router for getting all the registered users in the application
 */
router.get('/api/v1/user', authenticate, UserController.getAllUsers);
/**
 * Router for identifying a particular user either by username, phone number or email
 */
router.get('/api/v1/user/:identifier', UserController.getOne);
/**
 * Router for signup
 * Takes a middleware that validates user input
 */
router.post('/api/v1/user/signup', SignupValidations.validateUserInput, UserController.signup);
/**
 * Router for signin
 * Takes a middleware that validates user input
 */
router.post('/api/v1/user/signin', SigninValidations.validateUserInput, UserController.signin);
/**
 * Post router for creating a group
 * Takes authenticate and validateUserInput middlewares
 * authenticate verifies the jwtoken and
 * sets the user details to currentUser if authentication is valid
 */
router.post('/api/v1/group', authenticate, CreateGroupValidations.validateUserInput, GroupController.createGroup);
/**
 * Router to get all the group(s) a user belongs to
 * Takes authenticate middleware to verify the token
 */
router.get('/api/v1/group', authenticate, GroupController.getGroup);
/**
 * Router to post message to a particular group
 * Takes authenticate, validateUserInput and isGroupMember middlewares
 * authenticate verifies token
 * validateUserInput validates user input
 * isGroupMember checks if the user belongs to the group
 */
router.post('/api/v1/group/:groupId/message', authenticate, SendMessageValidations.validateUserInput, checkUserInGroup.isGroupMember, MessageController.sendMessage);
/**
 * Router to get all messages in a particular group
 * Takes the authenticate and isGroupMember middlewares
 */
router.get('/api/v1/group/:groupId/messages', authenticate, checkUserInGroup.isGroupMember, MessageController.getMessages);
/**
 * Router to add a user to a particular group
 * Takes the authenticate, validateUserInput and isGroupMember middlewares
 */
router.post('/api/v1/group/:groupId/user', authenticate, AddUserValidations.validateUserInput, checkUserInGroup.isGroupMember, GroupController.addUserToGroup);
/**
 * Router for resetting password
 * Takes a middleware that validates user input
 */
router.post('/api/v1/reset', ResetValidations.validateUserInput, UserController.resetPassword);
/**
 * Router for updating password field
 * Takes a middleware that validates user input
 */
router.put('/api/v1/user/signup', UpdatePasswordValidations.validateUserInput, UserController.updatePassword);
/**
 * Google callback url.
 */
router.post('/api/v1/auth/google', UserController.googleSignup);
router.post('/api/v1/group/:groupId/readStatus', authenticate, MessageController.readStatus);
router.get('/api/v1/group/:groupId/readStatus', authenticate, MessageController.readList);
router.get('/api/v1/search/:searchKey', authenticate, MessageController.searchUsers);

export default router;
